type Hints = {
    format: string | null,
    isNull: string | null,
    tooShort: string | null,
    tooLong: string | null,
    notExact: string | null,
};

const LOGIN_HINTS: Hints = {
    format: 'Логин должен начинаться с латинской буквы и содержать латинские буквы, цифры и подчеркивание',
    isNull: 'Необходимо указать логин',
    tooShort: null,
    tooLong: null,
    notExact: null,
};

const PASSWORD_HINTS: Hints = {
    format: 'Пароль не должен содержать пробелов',
    isNull: 'Необходимо указать пароль',
    tooShort: 'Пароль должен иметь не менее 3 символов',
    tooLong: null,
    notExact: null,
};

const EMAIL_HINTS: Hints = {
    format: 'Почтовый адрес должен состоять из латинских букв, цифр и знаков: +-_.\' и быть в домене второго уровня',
    isNull: 'Необходимо указать почтовый адрес',
    tooShort: null,
    tooLong: null,
    notExact: null,
};

const NAME_HINTS: Hints = {
    format: 'Имена должны состоять из русских или латинских букв',
    isNull: 'Необходимо указать имя',
    tooShort: null,
    tooLong: null,
    notExact: null,
};

const PHONE_HINTS: Hints = {
    format: 'Ну вы сами знаете, как выглядит телефон 🙄',
    isNull: 'Необходимо указать телефон',
    tooShort: null,
    tooLong: null,
    notExact: null,
};

export type ValidateBundle = Record<string, string | null>;

export default class Validate {
    private static isValid(value: string, required: boolean, validationRegExp: RegExp, hints: Hints,
        minLength: number | null = null, 
        maxLength: number | null = null, 
        exactLength:  number | null = null)
        : [boolean, string | null] {

        if (!value) {
            if (required) {
                return [false, hints.isNull];
            } else {
                return [true, null];
            }
        } else if (minLength && value.length < minLength) {
            return [false, hints.tooShort];
        } else if (maxLength && value.length > maxLength) {
            return [false, hints.tooLong];
        } else if (exactLength && value.length !== exactLength) {
            return [false, hints.notExact];
        } else if (!validationRegExp.test(value)) {
            return [false, hints.format];
        } else {
            return [true, null];
        };
    }

    static isLogin(value: string, required: boolean = false): [boolean, string | null] {
        return this.isValid(value, required, /^[a-zA-Z]\w*$/, LOGIN_HINTS);
    }

    static isPassword(value: string, required: boolean = false): [boolean, string | null] {
        return this.isValid(value, required, /^\S+$/, PASSWORD_HINTS, 3);
    }

    static isEmail(value: string, required: boolean = false): [boolean, string | null] {
        return this.isValid(value, required, /^[a-zA-Z0-9][a-zA-Z0-9\+\-\_\.\']*@[a-z0-9][a-z0-9\-\.]*\.[a-zA-Z]$/, EMAIL_HINTS);
    }

    static isName(value: string, required: boolean = false): [boolean, string | null] {
        return this.isValid(value, required, /^[a-zA-Zа-яА-Я][a-zA-Zа-яА-Я ]*$/, NAME_HINTS);
    }

    static isPhone(value: string, required: boolean = false): [boolean, string | null] {
        return this.isValid(value, required, /^[\+]?[0-9]{0,3}[ ]?[(]?[0-9]{3}[)]?[- ]?[0-9]{3}[- ]?[0-9]{4,6}$/im, PHONE_HINTS);
    }

    static validate(key: string, value: string): [boolean, string | null] {
        switch(key) {
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
