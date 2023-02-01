import { createLogger, transports, addColors } from "winston";

const { Console, File } = transports;

addColors({
    error: "redBG",
    warn: "yellow",
    info: "green"
});

export const logger = createLogger({
    level: "info",
    transports: [
        new Console({
            level: "info",
        }),
        new File({
            filename: "./log/warn.log",
            level: "warn",
        }),
        new File({
            filename: "./log/error.log",
            level: "error",
        })
    ],
});