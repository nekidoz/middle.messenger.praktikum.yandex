/* eslint max-classes-per-file: 0 */

import Logger, { Level } from '../utils/logger';
import BaseApi from './baseApi';
import BaseApiRequest from './baseApiRequest';
import BaseApiResponse from './baseApiResponse';

export class SignupRequest extends BaseApiRequest {
    first_name: string;

    second_name: string | undefined;

    login: string;

    email: string;

    password: string;

    phone: string | undefined;

    public setFirstName(firstName: string): SignupRequest {
        this.first_name = firstName;
        return this;
    }

    public setSecondName(secondName: string): SignupRequest {
        this.second_name = secondName;
        return this;
    }

    public setLogin(login: string): SignupRequest {
        this.login = login;
        return this;
    }

    public setEmail(email: string): SignupRequest {
        this.email = email;
        return this;
    }

    public setPassword(password: string): SignupRequest {
        this.password = password;
        return this;
    }

    public setPhone(phone: string): SignupRequest {
        this.phone = phone;
        return this;
    }
}

export class SignupResponse extends BaseApiResponse {

}

export default class SignupApi extends BaseApi {
    // eslint-disable-next-line no-use-before-define
    private static __instance :SignupApi;

    private logger: Logger;

    constructor() {
        // Singleton
        if (SignupApi.__instance) {
            SignupApi.__instance.logger.log('SignupApi: returning singleton');
            // eslint-disable-next-line no-constructor-return
            return SignupApi.__instance;
        }

        super('https://ya-praktikum.tech/api/v2/auth');
        SignupApi.__instance = this;
        this.logger = new Logger(Level.debug);
        this.logger.log('SignupApi: creating singleton');
    }

    public request(credentials: SignupRequest) {
        // const result = new LoginResponse().setSuccess(false); // prepare for worse
        this.logger.log('LoginApi.request()', credentials, JSON.stringify(credentials));
        return this.httpApi.post('/signup', { data: JSON.stringify(credentials) });
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
