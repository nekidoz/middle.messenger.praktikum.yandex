enum Level {
    debug,
    info,
    warning,
    error,
    critical
};

export default class Logger {
    constructor(level: Level = Level.debug) {
        this._level = level;
    }

    private _level: Level;

    set level(level: Level) {
        this._level = level;
    }

    log(...params: unknown[]) {
        if (this._level <= Level.debug) {
            console.log(...params);
        }
    }

    warning(...params: unknown[]) {
        if (this._level <= Level.warning) {
            console.warn(...params);
        }
    }

    error(...params: unknown[]) {
        if (this._level <= Level.error) {
            console.error(...params);
        }
    }
}

export { Level };
