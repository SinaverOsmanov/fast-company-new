export function generateAuthError(message) {
    switch (message) {
        case "EMAIL_EXISTS":
            return { email: "Пользовательно с таким email существует" };

        case "INVALID_PASSWORD":
            return { password: "Пароль указан неверно" };

        case "EMAIL_NOT_FOUND":
            return { email: "Данный email не зарегистрирован" };

        default:
            return "Слишком много попыток";
    }
}
