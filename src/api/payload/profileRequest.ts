import BaseApiRequest from './baseApiRequest';

export default class ProfileRequest extends BaseApiRequest {
    first_name: string;

    second_name: string | undefined;

    display_name: string | undefined;

    login: string;

    email: string;

    password: string;

    phone: string | undefined;

    public setFirstName(firstName: string): ProfileRequest {
        this.first_name = firstName;
        return this;
    }

    public setSecondName(secondName: string): ProfileRequest {
        this.second_name = secondName;
        return this;
    }

    public setDisplayName(displayName: string): ProfileRequest {
        this.display_name = displayName;
        return this;
    }

    public setLogin(login: string): ProfileRequest {
        this.login = login;
        return this;
    }

    public setEmail(email: string): ProfileRequest {
        this.email = email;
        return this;
    }

    public setPassword(password: string): ProfileRequest {
        this.password = password;
        return this;
    }

    public setPhone(phone: string): ProfileRequest {
        this.phone = phone;
        return this;
    }
}
