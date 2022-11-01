import { config, createLogger, format, Logger as LoggerModel, transports } from 'winston';
import 'winston-daily-rotate-file';
import { Request } from 'express';
import { ApiResponseArg, Level } from '../../interface/logger.inferface';

const { printf, timestamp, combine } = format;

export class Logger {
    private winston: LoggerModel;

    private myFormat = printf(({ level, message, timestamp, service }) => {
        const _message = JSON.stringify({
            level,
            message,
        });
        return `${timestamp} - [${service}] [${level.toUpperCase()}]: ${_message}`;
    });

    constructor(service = 'App Service') {
        this.winston = createLogger({
            level: process.env.LOG_LVL || 'debug',
            levels: config.npm.levels,
            defaultMeta: { service },
            format: combine(timestamp(), this.myFormat),
        });
    }

    private createTransport(lvl: Level) {
        const transportFile = new transports.DailyRotateFile({
            filename: `%DATE%-${lvl}.log`,
            dirname: './.log',
            datePattern: 'YYYY-MM-DD',
            maxFiles: '30d',
        });
        const transportConsole = new transports.Console();

        this.winston.add(transportFile);

        if (process.env.NODE_ENV !== 'production') {
            this.winston.add(transportConsole);
        }

        return transportFile;
    }


    log(lvl: Level, message: any, meta?: any) {
        const transport = this.createTransport(lvl);

        if (message instanceof Object) {
            message = JSON.stringify(message);
        }
        this.winston.log(lvl || 'info', message, meta);

        this.winston.remove(transport);
    }

    apiResponse(
        request: Request<unknown, unknown, unknown, unknown, unknown>,
        arg: ApiResponseArg
    ) {
        const _arg: ApiResponseArg = {
            code: arg.code || 200,
            userId: arg.userId || null,
            rest: arg.rest,
            message: arg.message || null,
        };

        const messageUser = _arg.userId ? `[user:${_arg.userId}]` : '';
        let message = `[RES][${_arg.code}]`;

        message += _arg.message ? _arg.message : `${messageUser}`;
        message += ' ' + this.httpInfo(request);

        this.winston.log('http', message);

        this.winston.log('debug', {
            message,
            userId: _arg.userId,
            ..._arg.rest,
        });
    }

    httpInfo(request: Request<unknown, unknown, unknown, unknown, unknown>): string {
        return `${request.originalUrl} - ${request.method} - ${request.ip}`;
    }
}
