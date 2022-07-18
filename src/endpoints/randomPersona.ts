import { Request, Response } from 'express';
import { pickRandomAge, pickRandomItem } from '../utils/pickRandomItem.js';
import { dataToJSON } from '../utils/dataToJSON.js';
import { formatName } from '../utils/formatName.js';
import { isGenderValid, isQuantityValid } from '../utils/dataValidation.js';

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

  // pick random personas
  const randomPersonas = [];
  for (let i = 0; i < quantity; i++) {
    const gender = requestedGender || pickRandomItem(['male', 'female']);
    const age = pickRandomAge(18, 88);
    const name = {
      first: pickRandomItem(firstNames.data[gender]),
      last: pickRandomItem(lastNames.data),
    };
    const fullName = name.first + ' ' + name.last;

    randomPersonas.push({
      name: name,
      gender: gender,
      age: age,
      occupation: pickRandomItem(occupations.data),
      avatar: `${avatarURL}/${gender}/${formatName(fullName)}.svg`,
    });
  }

  res.status(200).json({
    success: true,
    data: randomPersonas,
  });
}
