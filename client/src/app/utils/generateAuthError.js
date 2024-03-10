export function generateAuthError(message) {
    switch (message) {
        case "INVALID_PASSWORD":
            return "Пароль введен неверно";
        case "INVALID_EMAIL":
            return "Email введен неверно";
        case "EMAIL_EXISTS":
            return "Пользователь с таким Email уже существует";
        default:
            return "Слишком много попыток входа. Попробуйте позже";
    }
}
