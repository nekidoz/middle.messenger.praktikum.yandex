import { RejectResponse } from '../framework/httpTransport';
import Logger, { Level } from '../framework/logger';
import BaseApi from './baseApi';
import SessionRequest from './payload/sessionRequest';
import SessionResponse from './payload/sessionResponse';

export default class SessionApi extends BaseApi {
    // eslint-disable-next-line no-use-before-define
    private static __instance :SessionApi;

    private logger: Logger;

    constructor() {
        // Singleton
        if (SessionApi.__instance) {
            SessionApi.__instance.logger.log('SessionApi: returning singleton');
            // eslint-disable-next-line no-constructor-return
            return SessionApi.__instance;
        }

        super('https://ya-praktikum.tech/api/v2/auth');
        SessionApi.__instance = this;
        this.logger = new Logger(Level.debug);
        this.logger.log('SessionApi: creating singleton');
    }

    public create(credentials: SessionRequest): Promise<SessionResponse> {
        return new Promise((resolve, reject) => {
            this.logger.log('SessionApi.create()', credentials);
            this.httpApi.post('/signin', { data: credentials })
                .then(() => {
                    this.logger.log('Create session promise resolved');
                    resolve(new SessionResponse().setSuccess(true));
                })
                .catch((response: RejectResponse) => {
                    this.logger.log(`Error creating session (${response.status}): ${response.reason}.`);
                    reject(new SessionResponse().setSuccess(false).setReason(response.reason));
                });
        });
    }

    public delete(): Promise<SessionResponse> {
        return new Promise((resolve, reject) => {
            this.logger.log('SessionApi.delete()');
            this.httpApi.post('/logout')
                .then(() => {
                    this.logger.log('Delete session promise resolved');
                    resolve(new SessionResponse().setSuccess(true));
                })
                .catch((response: RejectResponse) => {
                    this.logger.log(`Error deleting session (${response.status}): ${response.reason}.`);
                    reject(new SessionResponse().setSuccess(false).setReason(response.reason));
                });
        });
    }
}
