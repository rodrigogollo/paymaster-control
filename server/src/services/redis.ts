import { createClient, type RedisClientType } from "redis";

let client: RedisClientType | null = null;

export async function initializeRedistClient() {
  if (!client) {
    client = createClient(); // default localhost:6379
    client.on('error', (e) => console.error(e))
    client.on('connect', () => {
      console.log('Redis Connected');
    })

    await client.connect();
  }
  return client;
}
