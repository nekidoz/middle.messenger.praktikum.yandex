import HTTPTransport from '../framework/httpTransport';
import BaseApiRequest from './baseApiRequest';
import BaseApiResponse from './baseApiResponse';

export default class BaseAPI {
    protected httpApi: HTTPTransport;

    constructor(baseUrl: string) {
        this.httpApi = new HTTPTransport(baseUrl);
    }

    // eslint-disable-next-line class-methods-use-this
    create(request: BaseApiRequest): Promise<BaseApiResponse> {
        throw new Error(`Not implemented: ${JSON.stringify(request)}`);
    }

    // eslint-disable-next-line class-methods-use-this
    request(request: BaseApiRequest): Promise<BaseApiResponse> {
        throw new Error(`Not implemented: ${JSON.stringify(request)}`);
    }

    // eslint-disable-next-line class-methods-use-this
    update(request: BaseApiRequest): Promise<BaseApiResponse> {
        throw new Error(`Not implemented: ${JSON.stringify(request)}`);
    }

    // eslint-disable-next-line class-methods-use-this
    delete(request: BaseApiRequest): Promise<BaseApiResponse> {
        throw new Error(`Not implemented: ${JSON.stringify(request)}`);
    }
}
