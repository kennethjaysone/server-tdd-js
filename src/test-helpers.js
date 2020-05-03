import { MongoClient } from "mongodb";

const DB_NAME = process.env.NODE_ENV === "test" ? "DB_TEST" : "DB_PROD";

export const setDatabaseData = async (collection, data) => {
  const client = await MongoClient.connect(
    `mongodb://localhost:27017/${DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  const db = client.db(DB_NAME);

  await db.collection(collection).insertMany(data);

  client.close();
};

export const getDatabaseData = async (collection) => {
  const client = await MongoClient.connect(
    `mongodb://localhost:27017/${DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );

  const db = client.db(DB_NAME);

  const result = await db.collection(collection).find().toArray();

  client.close();

  return result;
};

export const resetDatabase = async () => {
  const client = await MongoClient.connect(
    `mongodb://localhost:27017/${DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  const db = client.db(DB_NAME);
  await db.dropDatabase();
  client.close();
};
