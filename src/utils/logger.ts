enum Level {
    debug,
    info,
    warning,
    error,
    critical
};

export default class Logger {
    constructor(level: Level = Level.debug) {
        this.level = level;
    }

    private level: Level;

    log(...params: unknown[]) {
        if (this.level <= Level.debug) {
            console.log(...params);
        }
    }

    warning(...params: unknown[]) {
        if (this.level <= Level.warning) {
            console.warn(...params);
        }
    }

    error(...params: unknown[]) {
        if (this.level <= Level.error) {
            console.error(...params);
        }
    }
}

export { Level };
