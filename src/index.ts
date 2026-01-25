import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';
import multer from 'multer';
import path from 'path';
import fs from 'fs';

dotenv.config();

const app = express();
const prisma = new PrismaClient({
    log: ['error', 'warn'],
});
const PORT = process.env.PORT || 3001;

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

// Multer Storage Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(uploadsDir));

// Image Upload Endpoint
app.post('/api/upload', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ url: imageUrl });
});

// Telegram Auth Verification
function verifyTelegramAuth(authData: any) {
    const { hash, ...data } = authData;
    const token = process.env.BOT_TOKEN;

    if (!token) {
        console.error("BOT_TOKEN is not defined in .env");
        return false;
    }

    const secret = crypto.createHash('sha256').update(token).digest();
    const checkString = Object.keys(data)
        .sort()
        .filter(k => data[k])
        .map(k => `${k}=${data[k]}`)
        .join('\n');

    const hmac = crypto.createHmac('sha256', secret)
        .update(checkString)
        .digest('hex');

    return hmac === hash;
}

// Routes
app.get('/', (req, res) => {
    res.send('Rostan API is running');
});

// Auth
app.post('/auth/telegram', async (req, res) => {
    const authData = req.body;

    if (!authData || !authData.hash) {
        return res.status(400).json({ error: 'Missing auth data' });
    }

    if (!verifyTelegramAuth(authData)) {
        return res.status(403).json({ error: 'Invalid signature' });
    }

    try {
        const { id, first_name, last_name, username, photo_url } = authData;

        const user = await prisma.user.upsert({
            where: { telegramId: BigInt(id) },
            update: {
                firstName: first_name,
                lastName: last_name,
                username: username,
                photoUrl: photo_url,
            },
            create: {
                telegramId: BigInt(id),
                firstName: first_name,
                lastName: last_name,
                username: username,
                photoUrl: photo_url,
            },
        });

        res.json({
            status: 'ok',
            user: {
                ...user,
                telegramId: user.telegramId.toString() // BigInt to string for JSON
            }
        });
    } catch (err) {
        console.error('Database Error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Places
app.get('/api/places', async (req, res) => {
    try {
        const places = await prisma.place.findMany({
            include: {
                _count: {
                    select: { reviews: true }
                },
                reviews: {
                    include: {
                        user: true,
                        images: true
                    },
                    orderBy: { createdAt: 'desc' }
                }
            }
        });

        // Map to match frontend structure
        const formattedPlaces = places.map((p: any) => ({
            ...p,
            rating: p.reviews.length > 0 ? (p.reviews.reduce((acc: number, r: any) => acc + r.rating, 0) / p.reviews.length).toFixed(1) : 0,
            reviewsCount: p._count.reviews,
            reviews: p.reviews.map((r: any) => ({
                id: r.id,
                userId: r.userId,
                userName: r.user.firstName + (r.user.lastName ? ' ' + r.user.lastName : ''),
                userAvatar: r.user.photoUrl || '',
                rating: r.rating,
                date: new Date(r.createdAt).toLocaleDateString('ru-RU'),
                text: r.text,
                likes: r.likes,
                dislikes: r.dislikes,
                ownerResponse: r.ownerResponse,
                images: r.images.map((img: any) => img.url),
                placeId: r.placeId,
            }))
        }));

        res.json(formattedPlaces);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch places' });
    }
});

app.post('/api/places', async (req, res) => {
    try {
        const { name, category, address, city, description, image, latitude, longitude, userId } = req.body;
        const place = await prisma.place.create({
            data: {
                name,
                category,
                address,
                city,
                description,
                image,
                latitude: parseFloat(latitude),
                longitude: parseFloat(longitude),
                ownerId: userId
            },
            include: {
                _count: { select: { reviews: true } }
            }
        });
        res.json({
            ...place,
            rating: 0,
            reviewsCount: 0,
            reviews: []
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create place' });
    }
});

// Reviews
app.post('/api/reviews', async (req, res) => {
    try {
        const { text, rating, userId, placeId, images } = req.body;
        const review = await prisma.review.create({
            data: {
                text,
                rating,
                userId,
                placeId,
                images: {
                    create: images?.map((url: string) => ({ url })) || []
                }
            },
            include: {
                images: true,
                user: true,
                place: true
            }
        });

        const formattedReview = {
            id: review.id,
            userId: review.userId,
            userName: review.user.firstName + (review.user.lastName ? ' ' + review.user.lastName : ''),
            userAvatar: review.user.photoUrl || '',
            rating: review.rating,
            date: 'Только что',
            text: review.text,
            likes: review.likes,
            dislikes: review.dislikes,
            ownerResponse: review.ownerResponse,
            images: review.images.map((img: any) => img.url),
            placeId: review.placeId,
            placeName: review.place.name
        };

        res.json(formattedReview);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to add review' });
    }
});

// Favorites
app.post('/api/favorites', async (req, res) => {
    try {
        const { userId, placeId } = req.body;
        const favorite = await prisma.favorite.create({
            data: { userId, placeId }
        });
        res.json(favorite);
    } catch (err) {
        res.status(500).json({ error: 'Failed to favorite' });
    }
});

app.delete('/api/favorites', async (req, res) => {
    try {
        const { userId, placeId } = req.body;
        await prisma.favorite.delete({
            where: {
                userId_placeId: { userId, placeId }
            }
        });
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: 'Failed to unfavorite' });
    }
});

app.get('/api/users/:userId/favorites', async (req, res) => {
    try {
        const favorites = await prisma.favorite.findMany({
            where: { userId: req.params.userId },
            include: { place: true }
        });
        res.json(favorites.map((f: any) => f.place));
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch favorites' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
