import { createClient } from 'redis';

const url = process.env.REDIS_URL || 'redis://localhost:6379';

export const redis = await createClient({
  url,
  socket: {
    tls: url.startsWith('rediss://') || url.includes('6380'),
    rejectUnauthorized: false
  },
  password: process.env.REDIS_PASSWORD
})
  .on('error', (err) => console.error('❌ Redis client connection error', err))
  .connect();
