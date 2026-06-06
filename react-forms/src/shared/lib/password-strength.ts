export const getPasswordStrength = (password: string): number => {
    let score = 0;

    if (/[0-9]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
}