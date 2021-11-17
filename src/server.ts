import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import {
    pickRandomAge,
    pickRandomDate,
    pickRandomItem,
} from './utils/pickRandomItem.js';
import { dataToJSON } from './utils/dataToJSON.js';

// Server configuration
dotenv.config();
const app = express();
const port = Number(process.env.PORT) || 8080;
const hostname = process.env.HOSTNAME || 'localhost';

// Middleware
app.use(express.json());

// Routes
app.get('/randomPersona', (req: Request, res: Response) => {
    // read data
    const firstNames = dataToJSON('./src/data/firstName.json');
    const lastNames = dataToJSON('./src/data/lastName.json');
    const occupations = dataToJSON('./src/data/occupation.json');
    const avatars = dataToJSON('./src/data/avatar.json');

    // parameters
    let gender = pickRandomItem(['male', 'female']);
    if (req.query.gender) {
        gender = req.query.gender.toString();
    }
    const age = pickRandomAge(18, 88); // ages from 18 to 88

    try {
        // pick random persona
        const randomPersona = {
            name: {
                first: pickRandomItem(firstNames.data[gender]),
                last: pickRandomItem(lastNames.data),
            },
            gender: gender,
            age: age,
            dateOfBirth: pickRandomDate(age).toLocaleDateString('en-us'),
            occupation: pickRandomItem(occupations.data),
            avatar: pickRandomItem(avatars.data[gender]),
        };
        console.log(randomPersona);
        res.status(200).json(randomPersona);
    } catch {
        res.status(400).send('Bad parameter.');
    }
});

// Listening
app.listen(port, hostname, () => {
    console.log(`Server started at http://${hostname}:${port}`);
});
