import { Request, Response } from 'express';
import { pickRandomItem, pickRandomSeed } from '../utils/pickRandomItem.js';
import { isGenderValid, isNameValid } from '../utils/dataValidation.js';
import { formatName } from '../utils/formatName.js';

export function randomAvatar(
    req: Request,
    res: Response,
    avatarURL: string
): void {
    // parameters
    let seed = pickRandomSeed();
    if (req.query.name) {
        if (isNameValid(req.query.name)) {
            seed = req.query.name.toString();
        } else {
            res.status(400).send({
                success: false,
                message: 'Bad parameter.',
            });
            return;
        }
    }

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

    try {
        // pick random avatar
        const randomAvatar = {
            gender: gender,
            avatar: `${avatarURL}/${gender}/${formatName(seed)}.svg`,
        };

        console.log(randomAvatar);
        res.status(200).json({
            ...randomAvatar,
            success: true,
        });
    } catch {
        res.status(400).send('Bad parameter.');
    }
}
