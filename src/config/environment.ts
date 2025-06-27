import { config } from 'dotenv';
import { env } from 'process';

config();

export const environments = {
  port: Number(env.PORT || 3000),
  mongodb_uri: env.MONGODB_URI,
  paystack_secret_key: env.PAYSTACK_SECRET_KEY,
};
