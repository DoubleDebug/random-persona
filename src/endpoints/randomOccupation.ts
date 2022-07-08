import { Response } from 'express';
import { pickRandomItem } from '../utils/pickRandomItem.js';
import { dataToJSON } from '../utils/dataToJSON.js';

export function randomOccupation(res: Response, dataPath: string): void {
  // read data
  const occupations = dataToJSON(`${dataPath}/occupation.json`);

  // pick random occupation
  const randomOccupation = {
    occupation: pickRandomItem(occupations.data),
  };

  console.log(randomOccupation);
  res.status(200).json({
    success: true,
    data: randomOccupation,
  });
}
