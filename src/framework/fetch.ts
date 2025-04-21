const METHODS = {
    GET: 'GET',
    PUT: 'PUT',
    POST: 'POST',
    DELETE: 'DELETE',
};

/**
  * Функция реализовывать здесь необязательно, но может помочь не плодить логику у GET-метода
  * На входе: объект. Пример: {a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}
  * На выходе: строка. Пример: ?a=1&b=2&c=[object Object]&k=1,2,3
*/
function queryStringify(data) {
  let result = '?';
  Object.entries(data).forEach(([key, value]) => result += `${key}=${value}&`);
  return result.length > 1 ? result.slice(0, result.length - 1) : result;
}

class HTTPTransport {
  get = (url, options = {}) => {
    return this.request(url, {...options, method: METHODS.GET}, options.timeout);
  };

  put = (url, options = {}) => {
    return this.request(url, {...options, method: METHODS.PUT}, options.timeout);
  };

  post = (url, options = {}) => {
    return this.request(url, {...options, method: METHODS.POST}, options.timeout);
  };

  delete = (url, options = {}) => {
    return this.request(url, {...options, method: METHODS.DELETE}, options.timeout);
  };

  // options:
  // headers — obj
  // data — obj
  request = (url = 'http://localhost', options = { method: METHODS.GET }, timeout = 5000) => {
    const { method, data, headers = {} } = options;
    console.log(method, data, headers);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      // Преобразовываем data в query string для метода GET
      if (method === METHODS.GET && data) {
        url += queryStringify(data);
      }
      console.log(method, url);
      xhr.open(method, url);
      console.log('Opened');

      // Заголовки
      Object.entries(headers).forEach(([key, value]) => {
        console.log(`Header ${key}: ${value}`);
        xhr.setRequestHeader(key, value)
      });
      //    для всех методов, кроме GET, по умолчанию устанавливается тип данных JSON
      if (method !== METHODS.GET && (!headers || !headers['Content-Type'])) {
        console.log('Default header');
        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
      }  
      console.log('Headers done');

      // Таймаут
      xhr.timeout = timeout;

      xhr.onload = function() {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHODS.GET || !data) {
        console.log('Get or no data');
        xhr.send();
      } else {
        console.log('Not Get and data present');
        xhr.send(data);
      }
    }); 
  };
}

console.log(queryStringify({a: 1, b: 2, c: {d: 123}, k: [1, 2, 3]}));
console.log(new HTTPTransport().get());
