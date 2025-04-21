import Logger, { Level } from '../utils/logger';

const enum METHODS {
    GET = 'GET',
    PUT = 'PUT',
    POST = 'POST',
    DELETE = 'DELETE',
}

type StringDict = Record<string, string>;

type HttpRequestOptions = {
    timeout: number | undefined;
    method: METHODS,
    data: Object,
    headers: StringDict,
}

/**
  * Функция трансформирует объект в строку запроса HTML
  * @param  На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
  * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
*/
export function queryStringify(data: Object) {
    let result = '?';
    Object.entries(data).forEach(([key, value]) => { result += `${key}=${value}&`; });
    return result.length > 1 ? result.slice(0, result.length - 1) : result;
}

export default class HTTPTransport {
    logger: Logger;

    constructor() {
        this.logger = new Logger(Level.info);
    }

    get = (url: string, options: Partial<HttpRequestOptions> = {}) => this.request(url, { ...options, method: METHODS.GET }, options.timeout);

    put = (url: string, options: Partial<HttpRequestOptions> = {}) => this.request(url, { ...options, method: METHODS.PUT }, options.timeout);

    post = (url: string, options: Partial<HttpRequestOptions> = {}) => this.request(url, { ...options, method: METHODS.POST }, options.timeout);

    delete = (url: string, options: Partial<HttpRequestOptions> = {}) => this.request(url, { ...options, method: METHODS.DELETE }, options.timeout);

    // options:
    // headers — obj
    // data — obj
    request = (url = 'http://localhost', options: Partial<HttpRequestOptions> = { method: METHODS.GET }, timeout = 5000) => {
        const { method, data, headers = {} } = options;
        this.logger.log(method, data, headers);
        let targetUrl = url;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            // Преобразовываем data в query string для метода GET
            if (method === METHODS.GET && data) {
                targetUrl += queryStringify(data);
            }
            this.logger.log(method, targetUrl);
            xhr.open(method as string, targetUrl);
            this.logger.log('Opened');

            // Заголовки
            Object.entries(headers).forEach(([key, value]) => {
                this.logger.log(`Header ${key}: ${value}`);
                xhr.setRequestHeader(key, value);
            });
            //    для всех методов, кроме GET, по умолчанию устанавливается тип данных JSON
            if (method !== METHODS.GET && (!headers || !headers['Content-Type'])) {
                this.logger.log('Default header');
                xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            }
            this.logger.log('Headers done');

            // Таймаут
            xhr.timeout = timeout;

            xhr.onload = () => {
                resolve(xhr);
            };

            xhr.onabort = reject;
            xhr.onerror = reject;
            xhr.ontimeout = reject;

            if (method === METHODS.GET || !data) {
                this.logger.log('Get or no data');
                xhr.send();
            } else {
                this.logger.log('Not Get and data present');
                xhr.send(data as Document);
            }
        });
    };
}
