import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;
const options = {};

declare global {
  var _mongoClient: MongoClient | null;
  var _mongoClientPromise: Promise<MongoClient> | null;
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (!global._mongoClient) {
  client = new MongoClient(uri, options);
  global._mongoClient = client;
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise!;

export async function getMongoDb() {
  const client = await clientPromise;
  return client.db();
}

let authInstance: ReturnType<typeof betterAuth> | null = null;

export const getAuth = async () => {
  if (authInstance) return authInstance;

  const db = await getMongoDb();

  authInstance = betterAuth({
    database: mongodbAdapter(db),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    emailAndPassword: {
      enabled: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      autoSignIn: true,
    },
    plugins: [nextCookies()],
  });

  return authInstance;
};

export const auth = await getAuth();
