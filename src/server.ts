import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { randomPersona } from './endpoints/randomPersona.js';
import { randomName } from './endpoints/randomName.js';
import { randomOccupation } from './endpoints/randomOccupation.js';
import { randomAvatar } from './endpoints/randomAvatar.js';
import { readFileSync } from 'fs';

// Server configuration
dotenv.config();
const app = express();
const port = Number(process.env.PORT) || 3000;
const hostname = process.env.HOSTNAME || 'localhost';
const dataPath = process.env.DATA_PATH || './data';
const avatarURL = process.env.AVATAR_URL || 'https://avatars.dicebear.com/api';

// Middleware
app.use(express.json());
app.use(swaggerUi.serve);
app.use(cors());

// Routes
app.get('/random-persona', (req, res) =>
  randomPersona(req, res, dataPath, avatarURL)
);
app.get('/random-occupation', (_, res) => randomOccupation(res, dataPath));
app.get('/random-name', (req, res) => randomName(req, res, dataPath));
app.get('/random-avatar', (req, res) => randomAvatar(req, res, avatarURL));

// DOCS
const apiDocument = readFileSync('docs/OpenAPI.json', 'utf-8');
const apiDocumentJson = JSON.parse(apiDocument);
app.get('/', swaggerUi.setup(apiDocumentJson));

// Starting server
app.listen(port, hostname, () => {
  console.log(`Server started at http://${hostname}:${port}`);
});
