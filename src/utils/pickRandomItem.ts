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

export function pickRandomDate(age: number): Date {
    const year = new Date().getFullYear() - age;
    console.log('y', year);
    const rangeStart = new Date(year, 1);
    const rangeEnd = new Date(year + 1, 1);
    console.log(rangeStart, rangeEnd);
    return new Date(
        rangeStart.getTime() +
            Math.random() * (rangeEnd.getTime() - rangeStart.getTime())
    );
}
