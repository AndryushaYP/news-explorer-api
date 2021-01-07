require('dotenv').config();

const {
  NODE_ENV,
  JWT_SECRET,
  MONGO_URL,
  PORT = 3000,
} = process.env;

const devSecret = 'dev-secret';
const mongoUrl = 'mongodb://localhost:27017/diplomdb';
const SECRET = NODE_ENV === 'production' && JWT_SECRET ? JWT_SECRET : devSecret;
const MONGO = NODE_ENV === 'production' && MONGO_URL ? MONGO_URL : mongoUrl;

module.exports = {
  SECRET,
  MONGO,
  PORT,
};
