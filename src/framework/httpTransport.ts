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
    withCredentials: boolean,
    // eslint-disable-next-line no-undef
    responseType: XMLHttpRequestResponseType,
}

export type RejectResponse = {
    status: number,
    reason: string,
}

type HttpMethod = <T = unknown>(url: string, options?: Partial<HttpRequestOptions>) => Promise<T>;

/**
  * Функция трансформирует объект в строку запроса HTML
  * @param  На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
  * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
*/
export function queryStringify(data: Object) {
    let result = '?';
    Object.entries(data).forEach(([key, value]) => { result += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`; });
    return result.length > 1 ? result.slice(0, result.length - 1) : result;
}

export default class HTTPTransport {
    logger: Logger;

    baseUrl: string = '';

    constructor(baseUrl: string) {
        this.logger = new Logger(Level.info);
        this.baseUrl = baseUrl;
    }

    private createMethod(method: METHODS): HttpMethod {
        return (url, options = {}) => this.request(url, { ...options, method });
    }

    get = this.createMethod(METHODS.GET);

    put = this.createMethod(METHODS.PUT);

    post = this.createMethod(METHODS.POST);

    delete = this.createMethod(METHODS.DELETE);

    // options:
    // headers — obj
    // data — obj
    private request<T = unknown>(url: string, options: Partial<HttpRequestOptions> = { method: METHODS.GET }): Promise<T> {
        const { method, data, timeout = 5000, headers = {}, withCredentials = true, responseType = 'json' } = options;
        this.logger.log(method, data, headers);
        let targetUrl = `${this.baseUrl}${url}`;

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
            // //    для всех методов, кроме GET, по умолчанию устанавливается тип данных JSON
            // if (method !== METHODS.GET && (!headers || !headers['Content-Type'])) {
            //     this.logger.log('Default header');
            //     xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            // }
            this.logger.log('Headers done');

            // Обработчики
            xhr.onload = () => {
                const status = xhr.status || 0;
                if (status >= 200 && status < 300) {
                    resolve(xhr.response);
                } else {
                    const message = {
                        0: 'Abort',
                        100: 'Information',
                        200: 'OK',
                        300: 'Redirect failed',
                        400: 'Access error',
                        500: 'Internal server error',
                    }[Math.floor(status / 100) * 100];
                    reject({ status, reason: xhr.response?.reason || message });
                }
            };

            xhr.onabort = () => reject({ reason: 'abort' });
            xhr.onerror = () => reject({ reason: 'network error' });
            xhr.ontimeout = () => reject({ reason: 'timeout' });

            // Таймаут и прочие параметры запроса
            xhr.timeout = timeout;
            xhr.withCredentials = withCredentials;
            xhr.responseType = responseType;

            if (method === METHODS.GET || !data) {
                this.logger.log('HTTP send: get or no data');
                xhr.send();
            } else if (data instanceof FormData) {
                this.logger.log('HTTP send: form data');
                // НЕ УКАЗЫВАТЬ content-type, потому что браузер иначе сам не сгенерирует boundary hash (видео)
                xhr.send(data);
            } else {
                this.logger.log('HTTP send: not Get or data present');
                xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
                xhr.send(JSON.stringify(data));
            }
        });
    }
}
