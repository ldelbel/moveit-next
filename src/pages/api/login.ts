import { NowRequest, NowResponse } from '@vercel/node';
import { MongoClient, Db } from 'mongodb';
import url from 'url';

let cachedDb: Db = null;

async function connectToDatabase(uri: string) {
  if (cachedDb) {
    return cachedDb;
  }
  
  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const dbName = new URL(uri).pathname.substr(1);

  const db = client.db(dbName);

  cachedDb = db;
  return db;
}

export default async (request: NowRequest, response: NowResponse) => {
  const { login, avatar_url, name } = request.body.loggingUser;

  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection('users');

  let user = await collection.findOne({
    login: login
  })

  if (!user) {
    const res = await collection.insertOne({
      login: login,
      avatar: avatar_url,
      name: name,
      level: 1,
      currentExperience: 0,
      challengesCompleted: 0,
      totalExp: 0,
    })
    user = res.ops[0];
  }

  return response.status(201).json({ user });
}
