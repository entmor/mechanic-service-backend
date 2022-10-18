import { Redis } from 'ioredis';

export function searchRedisKeys(redisClient: Redis, match: string): Promise<string[]> {
    const data_response: string[] = [];
    const stream = redisClient.scanStream({
        match,
    });

    stream.on('data', (data) => data_response.push(...data));

    return new Promise((resolve, reject) => {
        stream.on('end', () => resolve(data_response));
    });
}
