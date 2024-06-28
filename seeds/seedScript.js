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
        const p = [
          collection.insertMany(bathArray.slice(0, bathArray.length / 2)),
          collection.insertMany(bathArray.slice(bathArray.length / 2, bathArray.length)),
        ];
        await Promise.all(p);

        uuids.push(bathArray[0].name);
        bathArray = [];
      }
    }

    await fs.promises.writeFile('uuids.json', JSON.stringify(uuids));
    await client.close();
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB();
