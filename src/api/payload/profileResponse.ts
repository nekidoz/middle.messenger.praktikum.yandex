import BaseApiResponse from './baseApiResponse';

export default class ProfileResponse extends BaseApiResponse {
    id: number;

    first_name: string;

    second_name: string;

    display_name: string;

    login: string;

    email: string;

    phone: string;

    avatar: string;

    public setSuccess(success: boolean): ProfileResponse {
        super.setSuccess(success);
        return this;
    }

    public setReason(reason: string): ProfileResponse {
        super.setReason(reason);
        return this;
    }

    public setId(id: number): ProfileResponse {
        this.id = id;
        return this;
    }

    public setFirstName(firstName: string): ProfileResponse {
        this.first_name = firstName;
        return this;
    }

    public setSecondName(secondName: string): ProfileResponse {
        this.second_name = secondName;
        return this;
    }

    public setDisplayName(displayName: string): ProfileResponse {
        this.display_name = displayName;
        return this;
    }

    public setLogin(login: string): ProfileResponse {
        this.login = login;
        return this;
    }

    public setEmail(email: string): ProfileResponse {
        this.email = email;
        return this;
    }

    public setPhone(phone: string): ProfileResponse {
        this.phone = phone;
        return this;
    }

    public setAvatar(avatar: string): ProfileResponse {
        this.avatar = avatar;
        return this;
    }
}
