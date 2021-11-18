import { Request, Response } from 'express';
import { pickRandomAge, pickRandomItem } from '../utils/pickRandomItem.js';
import { dataToJSON } from '../utils/dataToJSON.js';
import { formatName } from '../utils/formatName.js';
import { isGenderValid } from '../utils/dataValidation.js';

export function randomPersona(
    req: Request,
    res: Response,
    dataPath: string,
    avatarURL: string
): void {
    // read data
    const firstNames = dataToJSON(`${dataPath}/firstName.json`);
    const lastNames = dataToJSON(`${dataPath}/lastName.json`);
    const occupations = dataToJSON(`${dataPath}/occupation.json`);

    // parameters
    let gender = pickRandomItem(['male', 'female']);
    if (req.query.gender) {
        if (isGenderValid(req.query.gender)) {
            gender = req.query.gender.toString();
        } else {
            res.status(400).send({
                success: false,
                message: 'Bad parameter.',
            });
            return;
        }
    }
    const age = pickRandomAge(18, 88); // ages from 18 to 88
    const name = {
        first: pickRandomItem(firstNames.data[gender]),
        last: pickRandomItem(lastNames.data),
    };
    const fullName = name.first + ' ' + name.last;

    // pick random persona
    const randomPersona = {
        name: name,
        gender: gender,
        age: age,
        occupation: pickRandomItem(occupations.data),
        avatar: `${avatarURL}/${gender}/${formatName(fullName)}.svg`,
    };

    console.log(randomPersona);
    res.status(200).json({
        ...randomPersona,
        success: true,
    });
}
