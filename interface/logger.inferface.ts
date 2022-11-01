export type Level = 'warn' | 'info' | 'http' | 'debug' | 'error';

export interface ApiResponseArg {
    code?: number;
    userId?: string;
    message?: string;
    rest?: {
        [key: string]: any;
    };
}
