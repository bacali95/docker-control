import * as dotenv from 'dotenv';
dotenv.config();

const config = {
  nodeEnv: process.env.NODE_ENV,
  logLevel: process.env.LOG_LEVEL,
};

export default config;
