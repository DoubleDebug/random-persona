import express from 'express';
import dotenv from 'dotenv';
import { randomPersona } from './endpoints/randomPersona.js';
import { randomName } from './endpoints/randomName.js';
import { randomOccupation } from './endpoints/randomOccupation.js';
import { randomAvatar } from './endpoints/randomAvatar.js';

// Server configuration
dotenv.config();
const app = express();
const port = Number(process.env.PORT) || 8080;
const hostname = process.env.HOSTNAME || 'localhost';
const dataPath = process.env.DATA_PATH || './data';
const avatarURL = process.env.AVATAR_URL || 'https://avatars.dicebear.com/api';

// Middleware
app.use(express.json());

// Routes
app.get('/', (_, res) => {
    res.send('Welcome to the Random Persona API!');
});
app.get('/randomPersona', (req, res) =>
    randomPersona(req, res, dataPath, avatarURL)
);
app.get('/randomOccupation', (_, res) => randomOccupation(res, dataPath));
app.get('/randomName', (req, res) => randomName(req, res, dataPath));
app.get('/randomAvatar', (req, res) => randomAvatar(req, res, avatarURL));

// Starting server
app.listen(port, hostname, () => {
    console.log(`Server started at http://${hostname}:${port}`);
});
