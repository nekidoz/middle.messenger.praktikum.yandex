import BaseApiRequest from './baseApiRequest';

export default class SessionRequest extends BaseApiRequest {
    login: string;

    password: string;

    public setLogin(login: string): SessionRequest {
        this.login = login;
        return this;
    }

    public setPassword(password: string): SessionRequest {
        this.password = password;
        return this;
    }
}
