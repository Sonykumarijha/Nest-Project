import { Injectable, OnModuleInit } from '@nestjs/common';
import { createClient, RedisClientType } from 'redis';

@Injectable()
export class RedisService implements OnModuleInit {
  private client: RedisClientType;

  async onModuleInit() {
    this.client = createClient({
      url: 'redis://localhost:6379',
    });

    this.client.on('error', (err) => {
      console.error('Redis Error:', err);
    });

    await this.client.connect();

    console.log('Redis Connected Successfully**************');
  }

  async get(key: string) {
    return await this.client.get(key);
  }

  async set(
    key: string,
    value: string,
    ttl?: number,
  ) {
    if (ttl) {
      return await this.client.set(key, value, {
        EX: ttl,
      });
    }

    return await this.client.set(key, value);
  }

  async del(key: string) {
    return await this.client.del(key);
  }
}