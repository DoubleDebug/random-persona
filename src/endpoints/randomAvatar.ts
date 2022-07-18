import { Request, Response } from 'express';
import { pickRandomItem, pickRandomSeed } from '../utils/pickRandomItem.js';
import { isGenderValid, isQuantityValid } from '../utils/dataValidation.js';
import { formatName } from '../utils/formatName.js';

export function randomAvatar(
  req: Request,
  res: Response,
  avatarURL: string
): void {
  // parameters
  let requestedGender: string | null = null;
  if (req.query.gender) {
    if (isGenderValid(req.query.gender)) {
      requestedGender = req.query.gender.toString();
    } else {
      res.status(400).send({
        success: false,
        message: 'Bad parameter - gender.',
      });
      return;
    }
  }
  let quantity = 1;
  if (req.query.quantity) {
    if (isQuantityValid(req.query.quantity)) {
      quantity = Number(req.query.quantity);
    } else {
      res.status(400).send({
        success: false,
        message:
          'Bad parameter - quantity. The quantity must be a number between 1 and 1000.',
      });
      return;
    }
  }

  // pick random avatars
  const randomAvatars = [];
  for (let i = 0; i < quantity; i++) {
    const gender = requestedGender || pickRandomItem(['male', 'female']);
    const seed = pickRandomSeed();
    randomAvatars.push({
      gender: gender,
      avatar: `${avatarURL}/${gender}/${formatName(seed)}.svg`,
    });
  }

  res.status(200).json({
    success: true,
    data: randomAvatars,
  });
}
