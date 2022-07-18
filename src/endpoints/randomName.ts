import { Request, Response } from 'express';
import { pickRandomItem } from '../utils/pickRandomItem.js';
import { dataToJSON } from '../utils/dataToJSON.js';
import { isGenderValid, isQuantityValid } from '../utils/dataValidation.js';

export function randomName(
  req: Request,
  res: Response,
  dataPath: string
): void {
  // read data
  const firstNames = dataToJSON(`${dataPath}/firstName.json`);
  const lastNames = dataToJSON(`${dataPath}/lastName.json`);

  // parameters
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

  // pick random names
  const randomNames = [];
  for (let i = 0; i < quantity; i++) {
    let gender = requestedGender || pickRandomItem(['male', 'female']);
    randomNames.push({
      name: {
        first: pickRandomItem(firstNames.data[gender]),
        last: pickRandomItem(lastNames.data),
      },
      gender: gender,
    });
  }

  res.status(200).json({
    success: true,
    data: randomNames,
  });
}
