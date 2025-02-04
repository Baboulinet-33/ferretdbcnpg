const assert = require('assert');
const { parseArgs } = require('node:util');

const { MongoClient, ServerApiVersion } = require("mongodb");

const mongouri = process.env.MONGO_DB_URI

client = new MongoClient(mongouri);


async function run() {
  try {
    let res = await client.db('app').command({ ping: 1 });
    assert.equal(res.ok, 1, 'ping failed');
    res = await client.db('app').command({ dropDatabase: 1 });
    assert.equal(res.ok, 1, 'dropDatabase failed');
    
    let docs = [];
    for (let i = 1; i <= 4; i++) {
      docs.push({ _id: i, a: i });
    }

    res = await client.db('app').collection('foo').insertMany(docs);
    assert.equal(res.insertedCount, 4);

    const actual = await client.db('app').collection('foo').findOne({ a: 4 });
    assert.equal(actual.a, 4, 'Value should be 4');

    const cursor = await client.db('app').collection('foo').find();
    for await (const doc of cursor) {
        console.log(doc);
    }

  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run()
