export function isNumber(input: string): boolean {
    if (input.trim() === '') return false;
    return !isNaN(Number(input));
}