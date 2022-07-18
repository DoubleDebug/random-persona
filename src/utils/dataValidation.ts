export function isGenderValid(gender: any): boolean {
  if (!['male', 'female'].includes(gender.toString())) {
    return false;
  }

  return true;
}

export function isQuantityValid(quantity: any): boolean {
  const q = Number(quantity);
  if (Number.isNaN(q) || q < 1 || q > 1000) {
    return false;
  }

  return true;
}
