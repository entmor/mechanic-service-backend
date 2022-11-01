import { Queue, QueueOptions, QueueScheduler, Worker, Processor, WorkerOptions } from 'bullmq';
import IORedis, { Redis } from 'ioredis';

export interface InitQueueInterface {
    name: string;
    opts?: QueueOptions;
    createQueueScheduler?: boolean;
}

interface WorkersInterace {
    [key: string]: any;
}

interface QueuesInteface {
    [key: string]: any;
}

export class MessageQueue {
    private redisClient: Redis;
    private queues: QueuesInteface = [];
    private workers: WorkersInterace = [];

    private reConnectingClient = false;

    constructor() {
        this.initMessageQueue();
    }

    setQueue<Data = any, Return = any, Name extends string = string>(
        queue: InitQueueInterface
    ): Queue<Data, Return, Name> {
        this.queues[queue.name] = new Queue(queue.name, {
            ...queue.opts,
            connection: this.redisClient,
        });

        if (queue.createQueueScheduler) {
            this.setScheduler(queue.name);
        }

        return this.queues[queue.name];
    }

    getQueue(name: string): Queue | boolean {
        return this.queues[name] ? this.queues[name] : false;
    }

    setScheduler(name: string) {
        new QueueScheduler(name, {
            connection: this.redisClient,
        });
    }

    setWorker(name: string, processor?: string | Processor, options?: WorkerOptions): Worker {
        this.workers[name] = new Worker(name, processor, {
            ...options,
            connection: this.redisClient,
        });

        return this.workers[name];
    }

    private initMessageQueue(): void {
        this.redisClient = new IORedis({
            host: process.env.REDIS_HOST,
            port: +process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD,
            maxRetriesPerRequest: null,
            enableReadyCheck: false,
        });

        this.redisClient.on('ready', () => {
            console.log('client ready');
            if (this.reConnectingClient) {
                // this is actually the fix, we just set a flag to not kick run unless we are restarting
                console.log('rerun queue run');
                this.reConnectingClient = false;
                // queue.run(queue.concurrency)
            }
        });

        this.redisClient.on('connect', () => {
            console.log('client connect');
        });

        this.redisClient.on('close', () => {
            console.log('client close');
        });

        this.redisClient.on('end', (error) => {
            console.log('client end', error);
        });

        this.redisClient.on('reconnecting', (error) => {
            console.log('client reconnecting', error);
            this.reConnectingClient = true;
        });

        this.redisClient.on('error', (error) => {
            console.log('client error', error.message);
        });
    }
}

export default new MessageQueue();
