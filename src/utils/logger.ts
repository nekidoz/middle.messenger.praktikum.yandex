export default class Logger {
    static log(...params: unknown[]) {
        console.log(...params);
    }

    static warning(...params: unknown[]) {
        console.warn(...params);
    }

    static error(...params: unknown[]) {
        console.error(...params);
    }
}
