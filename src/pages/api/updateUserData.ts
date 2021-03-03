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
  const { updateUser } = request.body;

  const db = await connectToDatabase(process.env.MONGODB_URI);
  const collection = db.collection('users');

  const filter = {
    login: updateUser.login
  }

  const update = {
    $set: {
      level:  updateUser.level,
      currentExperience:  updateUser.currentExperience,
      challengesCompleted:  updateUser.challengesCompleted,
      totalExp:  updateUser.totalExp,
    }
  }

  let user = collection.updateOne(filter, update);
  console.log(user);

  return response.status(201).json({ user });
}
