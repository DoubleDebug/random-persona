export function pickRandomItem<T>(items: Array<T>): T {
    let index = -1;
    while (index < 0 || index >= items.length)
        index = Math.round(Math.random() * items.length);
    return items[index];
}

export function pickRandomAge(rangeStart: number, rangeEnd: number): number {
    const range = Array.from(Array(rangeEnd - rangeStart + 1).keys()).map(
        (num) => num + rangeStart
    );
    return pickRandomItem(range);
}

export function pickRandomSeed(): string {
    let result = '';
    let characters = 'abcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < 10; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * characters.length)
        );
    }
    return result;
}
