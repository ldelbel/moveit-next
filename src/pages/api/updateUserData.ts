import { NowRequest, NowResponse } from '@vercel/node';
import { MongoClient, Db } from 'mongodb';

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
  const { userNewData } = request.body;

  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection('users');

  const filter = {
    login: userNewData.login
  }

  const update = {
    $set: {
      level:  userNewData.level,
      currentExperience:  userNewData.currentExperience,
      challengesCompleted:  userNewData.challengesCompleted,
      totalExp:  userNewData.totalExp,
    }
  }

  let user = collection.updateOne(filter, update);
  console.log(user);

  return response.status(201).json({ user });
}
