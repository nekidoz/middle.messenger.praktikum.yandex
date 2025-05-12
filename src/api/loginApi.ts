/* eslint max-classes-per-file: 0 */

import { RejectResponse } from '../framework/httpTransport';
import Logger, { Level } from '../utils/logger';
import BaseApi, { BaseApiRequest, BaseApiResponse } from './baseApi';

export class LoginRequest extends BaseApiRequest {
    login: string;

    password: string;

    public setLogin(login: string): LoginRequest {
        this.login = login;
        return this;
    }

    public setPassword(password: string): LoginRequest {
        this.password = password;
        return this;
    }
}

export class LoginResponse extends BaseApiResponse {

}

export default class LoginApi extends BaseApi {
    // eslint-disable-next-line no-use-before-define
    private static __instance :LoginApi;

    private logger: Logger;

    constructor() {
        // Singleton
        if (LoginApi.__instance) {
            LoginApi.__instance.logger.log('LoginApi: returning singleton');
            // eslint-disable-next-line no-constructor-return
            return LoginApi.__instance;
        }

        super('https://ya-praktikum.tech/api/v2/auth');
        LoginApi.__instance = this;
        this.logger = new Logger(Level.debug);
        this.logger.log('LoginApi: creating singleton');
    }

    public request(credentials: LoginRequest): Promise<LoginResponse> {
        return new Promise((resolve, reject) => {
            this.logger.log('LoginApi.request()', credentials);
            this.httpApi.post('/signin', { data: credentials })
                .then(() => {
                    this.logger.log('Login promise resolved');
                    resolve(new LoginResponse().setSuccess(true));
                })
                .catch((response: RejectResponse) => {
                    this.logger.log(`Error logging in (${response.status}): ${response.reason}.`);
                    reject(new LoginResponse().setSuccess(false).setReason(response.reason));
                });
        });
    }
}
