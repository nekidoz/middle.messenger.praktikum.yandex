export default class Logger {
    static log(...params: unknown[]) {
        console.log(...params);
    }

    static error(...params: unknown[]) {
        console.error(...params);
    }
}
