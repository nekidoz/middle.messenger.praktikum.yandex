/* eslint max-classes-per-file: 0 */

import Logger, { Level } from '../utils/logger';
import BaseApi from './baseApi';
import BaseApiRequest from './baseApiRequest';
import BaseApiResponse from './baseApiResponse';

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

    public request(credentials: LoginRequest) {
        // const result = new LoginResponse().setSuccess(false); // prepare for worse
        return this.httpApi.post('/signin', { data: JSON.stringify(credentials) });
        // .then((response: XMLHttpRequest) => {
        //     console.log('Login promise resolved');
        //     const { reason } = JSON.parse(response.response);
        //     result.setReason(reason);
        //     let responseStr: string;
        //     switch (response.status) {
        //         case 200:
        //             result.setSuccess(true);
        //             responseStr = 'Logged in OK';
        //             break;
        //         case 400:
        //             responseStr = 'Bad request';
        //             break;
        //         case 401:
        //             responseStr = 'Unauthorized';
        //             break;
        //         case 500:
        //             responseStr = 'Unexpected error';
        //             break;
        //         default:
        //             responseStr = 'Undefined response code';
        //             break;
        //     }
        //     console.log(`${responseStr} (${response.status}): ${response.response}.`, response);
        //     return result;
        // })
        // .catch((reply: XMLHttpRequest) => {
        //     console.log(`Error logging in (${reply.status}): ${reply.response}.`, reply);
        //     return result.setReason('Exception logging in');
        // })
        // .finally(() => {
        //     return result.setReason('Unknown (finally)');
        // });
    }
}
