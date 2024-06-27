const { randomUUID } = require('node:crypto');
const fs = require('node:fs');
const MongoClient = require('mongodb').MongoClient;

async function seedDB() {
  const client = new MongoClient('mongodb://localhost');

  try {
    await client.connect();
    console.log('SUCCESS CONNECT');

    const collection = client.db("nest").collection("examples");
    await collection.drop();

    const uuids = [];
    let bathArray = [];
    for (let i = 1; i <= 10_000_000; i++) {
      bathArray.push({ name: randomUUID() });

      if (i % 100_000 === 0) {
        await collection.insertMany(bathArray);
        uuids.push(bathArray[0].name);
        bathArray = [];
      }
    }

    await fs.promises.writeFile('uuids.json', JSON.stringify(uuids));
    await client.close()
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB();
