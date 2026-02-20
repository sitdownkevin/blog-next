import { MongoClient, Db, Collection, Document } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local",
  );
}

// Type assertion is safe here because we've checked MONGODB_URI exists
const MONGODB_URI_STRING = MONGODB_URI as string;

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
interface MongoClientCache {
  client: MongoClient | null;
  promise: Promise<MongoClient> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: MongoClientCache | undefined;
}

let cached = global._mongoClientPromise;

if (!cached) {
  cached = global._mongoClientPromise = { client: null, promise: null };
}

/**
 * Get MongoDB client with singleton pattern
 * Reuses connection in development and production
 */
export async function getMongoClient(): Promise<MongoClient> {
  if (cached!.client) {
    return cached!.client;
  }

  if (!cached!.promise) {
    const opts = {
      maxPoolSize: 10,
      minPoolSize: 2,
      maxIdleTimeMS: 60000,
    };

    cached!.promise = MongoClient.connect(MONGODB_URI_STRING, opts).then(
      (client) => {
        cached!.client = client;
        return client;
      },
    );
  }

  try {
    cached!.client = await cached!.promise;
  } catch (e) {
    cached!.promise = null;
    throw e;
  }

  return cached!.client;
}

/**
 * Get database instance
 * @param name - Database name (optional, uses default from connection string)
 */
export async function getDatabase(name?: string): Promise<Db> {
  const client = await getMongoClient();
  return client.db(name);
}

/**
 * Get collection instance
 * @param collectionName - Collection name
 * @param dbName - Database name (optional)
 */
export async function getCollection<T extends Document = Document>(
  collectionName: string,
  dbName?: string,
): Promise<Collection<T>> {
  const db = await getDatabase(dbName);
  return db.collection<T>(collectionName);
}

/**
 * Close MongoDB connection (use sparingly, mainly for cleanup in tests)
 */
export async function closeMongoConnection(): Promise<void> {
  if (cached?.client) {
    await cached.client.close();
    cached.client = null;
    cached.promise = null;
  }
}
