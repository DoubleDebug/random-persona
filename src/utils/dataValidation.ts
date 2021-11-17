export function isNameValid(name: any): boolean {
    if (!name.length || name.length > 100) {
        return false;
    }

    return true;
}

export function isGenderValid(gender: any): boolean {
    if (!['male', 'female'].includes(gender.toString())) {
        return false;
    }

    return true;
}
