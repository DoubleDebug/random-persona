import { Request, Response } from 'express';
import { pickRandomItem } from '../utils/pickRandomItem.js';
import { dataToJSON } from '../utils/dataToJSON.js';
import { isQuantityValid } from '../utils/dataValidation.js';

export function randomOccupation(
  req: Request,
  res: Response,
  dataPath: string
): void {
  // read data
  const occupations = dataToJSON(`${dataPath}/occupation.json`);

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

  // pick random occupations
  const randomOccupations = [];
  for (let i = 0; i < quantity; i++) {
    randomOccupations.push({
      occupation: pickRandomItem(occupations.data),
    });
  }

  res.status(200).json({
    success: true,
    data: randomOccupations,
  });
}
