const autocannon = require('autocannon');
const MongoClient = require('mongodb').MongoClient;
const client = new MongoClient('mongodb://localhost');

(async () => {
  await client.connect();
  const collection = client.db("nest").collection("examples");
  const randomUUIDS = await collection.aggregate([{ $sample: { size: 2 } }])
    .map((item) => item.name)
    .toArray();

  const withoutIndex = await autocannon({
    url: `http://localhost:3000/example?search=${randomUUIDS[0]}`,
    connections: 10,
    duration: 5,
  });

  const indexName = await collection.createIndex({ name: 1 }, { unique: true });
  const withIndex = await autocannon({
    url: `http://localhost:3000/example?search=${randomUUIDS[1]}`,
    connections: 10,
    duration: 5,
  });
  await collection.dropIndex(indexName);

  console.log('============');
  console.log('WITHOUT INDEX: ', withoutIndex);
  console.log('============');
  console.log('WITH INDEX: ', withIndex);

  await client.close();
})();