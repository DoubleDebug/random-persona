import { Request, Response } from 'express';
import { pickRandomItem } from '../utils/pickRandomItem.js';
import { dataToJSON } from '../utils/dataToJSON.js';
import { isGenderValid } from '../utils/dataValidation.js';

export function randomName(
    req: Request,
    res: Response,
    dataPath: string
): void {
    // read data
    const firstNames = dataToJSON(`${dataPath}/firstName.json`);
    const lastNames = dataToJSON(`${dataPath}/lastName.json`);

    // parameters
    let gender = pickRandomItem(['male', 'female']);
    if (req.query.gender) {
        if (isGenderValid(req.query.name)) {
            gender = req.query.gender.toString();
        } else {
            res.status(400).send('Bad parameter.');
            return;
        }
    }

    // pick random name
    const randomName = {
        name: {
            first: pickRandomItem(firstNames.data[gender]),
            last: pickRandomItem(lastNames.data),
        },
        gender: gender,
    };

    console.log(randomName);
    res.status(200).json(randomName);
}
