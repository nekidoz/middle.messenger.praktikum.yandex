type Hints = {
    format: string | null,
    isNull: string | null,
    tooShort: string | null,
    tooLong: string | null,
    notExact: string | null,
};

const LOGIN_HINTS: Hints = {
    format: 'Логин должен начинаться с латинской буквы и может содержать латинские буквы, цифры, дефис и подчеркивание',
    isNull: 'Необходимо указать логин',
    tooShort: 'Логин слишком короткий, минимум - 3 символа',
    tooLong: 'Логин слишком длинный, максимум - 20 символов',
    notExact: null,
};

const PASSWORD_HINTS: Hints = {
    format: 'Пароль не должен содержать пробелов, должна быть хотя бы одна заглавная буква и цифра',
    isNull: 'Необходимо указать пароль',
    tooShort: 'Пароль слишком короткий, минимум - 8 символов',
    tooLong: 'Пароль слишком длинный, максимум - 40 символов',
    notExact: null,
};

const EMAIL_HINTS: Hints = {
    format: 'Почтовый адрес должен состоять из латинских букв, цифр и знаков: +-_.\' и быть в домене второго (и ниже) уровня',
    isNull: 'Необходимо указать почтовый адрес',
    tooShort: null,
    tooLong: null,
    notExact: null,
};

const NAME_HINTS: Hints = {
    format: 'Имена должны состоять из русских или латинских букв и начинаться с большой буквы. Можно использовать дефис',
    isNull: 'Необходимо указать имя',
    tooShort: null,
    tooLong: null,
    notExact: null,
};

const PHONE_HINTS: Hints = {
    format: 'Телефон должен состоять из 10-15 цифр без пробелов и может начинаться с плюса',
    isNull: 'Необходимо указать телефон',
    tooShort: null,
    tooLong: null,
    notExact: null,
};

export type ValidateBundle = Record<string, string | null>;

export default class Validate {
    private static isValid(
        value: string,
        required: boolean,
        validationRegExp: RegExp,
        hints: Hints,
        minLength: number | null = null,
        maxLength: number | null = null,
        exactLength: number | null = null,
    ): [boolean, string | null] {
        if (!value) {
            if (required) {
                return [false, hints.isNull];
            }
            return [true, null];
        }
        if (minLength && value.length < minLength) {
            return [false, hints.tooShort];
        }
        if (maxLength && value.length > maxLength) {
            return [false, hints.tooLong];
        }
        if (exactLength && value.length !== exactLength) {
            return [false, hints.notExact];
        }
        if (!validationRegExp.test(value)) {
            return [false, hints.format];
        }
        return [true, null];
    }

    static isLogin(value: string, required: boolean = false): [boolean, string | null] {
        return this.isValid(value, required, /^[a-zA-Z][a-zA-Z0-9\-_]*$/, LOGIN_HINTS, 3, 20);
    }

    static isPassword(value: string, required: boolean = false): [boolean, string | null] {
        const [success, message] = this.isValid(value, required, /^\S+$/, PASSWORD_HINTS, 8, 40);
        if (success) {
            // Additional checks
            if (value && (!/[0-9]/.test(value) || !/[A-ZА-ЯЁ]/.test(value))) {
                return [false, PASSWORD_HINTS.format];
            }
            return [true, null];
        }
        return [success, message];
    }

    static isEmail(value: string, required: boolean = false): [boolean, string | null] {
        return this.isValid(value, required, /^[a-z0-9][a-z0-9+\-_.']*@[a-z0-9][a-z0-9\-.]*\.[a-z]+$/i, EMAIL_HINTS);
    }

    static isName(value: string, required: boolean = false): [boolean, string | null] {
        return this.isValid(value, required, /^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ-]*$/, NAME_HINTS);
    }

    static isPhone(value: string, required: boolean = false): [boolean, string | null] {
        // Simplified as per ToR
        // return this.isValid(value, required, /^[\+]?[0-9]{0,3}[ ]?[(]?[0-9]{3}[)]?[- ]?[0-9]{3}[- ]?[0-9]{4,6}$/im, PHONE_HINTS);
        return this.isValid(value, required, /^[+]?[0-9]{10,15}$/, PHONE_HINTS);
    }

    static validate(key: string, value: string): [boolean, string | null] {
        switch (key) {
            case 'login':
                return Validate.isLogin(value, true);
            case 'password':
            case 'repeat_password':
                return Validate.isPassword(value, true);
            case 'oldPassword':
            case 'newPassword':
            case 'repeatNewPassword':
                return Validate.isPassword(value, false);
            case 'email':
                return Validate.isEmail(value, true);
            case 'first_name':
            case 'display_name':
                return Validate.isName(value, true);
            case 'second_name':
                return Validate.isName(value, false);
            case 'phone':
                return Validate.isPhone(value, false);
            case 'avatar':
                return [true, null];
            default:
                return [false, `Validating ${key} not implemented.`];
        }
    }
}
