import { MongoClient } from "mongodb";

const mongouri = process.env.MONGO_DB_URI

let client = new MongoClient(mongouri);

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function run() {
  try {
    let res = await client.db('app').command({ ping: 1 });
    res = await client.db('app').command({ dropDatabase: 1 });
    
    let docs = [];
    for (let i = 1; i <= 4; i++) {
      docs.push({ _id: i, a: i });
    }

    res = await client.db('app').collection('foo').insertMany(docs);

    const actual = await client.db('app').collection('foo').findOne({ a: 4 });

    const cursor = await client.db('app').collection('foo').find();
    for await (const doc of cursor) {
        console.log(doc);
    }


    await sleep (10)

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run()

