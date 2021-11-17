import * as fs from 'fs';

export function dataToJSON(fileLocation: string) {
    const rawData = fs.readFileSync(fileLocation);
    return JSON.parse(rawData.toString());
}
