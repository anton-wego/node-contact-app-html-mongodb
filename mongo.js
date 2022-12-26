const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
// const uri "mongodb+srv://youduan:anton12345@cluster0.rncjt10.mongodb.net/?retryWrites=true&w=majority"
const uri = "mongodb://127.0.0.1:27017"
const dbName = 'youduan'
const ObjectID = require('mongodb').ObjectID;
// example from website
// const client = new MongoClient(uri);
// async function run() {
//   try {
//     const database = client.db(dbName);
//     const movies = database.collection('mahasiswa');
//     // Query for a movie that has the title 'Back to the Future'
//     const query = { name: 'anton' };
//     const records = await movies.findOne(query);
//     console.log(records);
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


// example from youtube

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err, client) => {
  if (err) {
    return console.log('connection failed')
  }

  // use db
  const db = client.db(dbName);

  // insert one data to collection mahasiswa
  // db.collection('mahasiswa').insertOne(
  //   {
  //     name: 'indah',
  //     email: 'gatau@gamil.com'
  //   },
  //   (err, result) => {
  //     if (err) {
  //       return console.log('Insert data is failed')
  //     }

  //     console.log(result)
  //   }
  // )

  // insert many data to collection mahasiswa
  // db.collection('mahasiswa').insertMany(
  //   [
  //     {
  //       name: 'indah3',
  //       email: 'gatau3@gamil.com'
  //     },
  //     {
  //       name: 'indah3',
  //       email: 'gatau2@gamil.com'
  //     },
  //   ],
  //   (err, result) => {
  //     if (err) {
  //       return console.log('Insert data is failed')
  //     }

  //     console.log(result)
  //   }
  // )


  // // read all data of collection mahasiswa
  // console.log(db.collection('mahasiswa').find().toArray((err, r) => {
  //   console.log(r)
  // }))

  // read one data of collection mahasiswa by name
  // const q = {name: 'indah'}
  // const q = { _id: ObjectID('63a418129548473e22d9c350') }
  // console.log(db.collection('mahasiswa').find(q).toArray((err, r) => {
  //   console.log(r)
  // }))

  // update one field `name`` data of collection mahasiswa
  // const q = { _id: ObjectID('63a418129548473e22d9c350') }
  // const updated = db.collection('mahasiswa').updateOne(
  //   q,
  //   { $set: {
  //       name: 'Indah fajarwati',
  //       email: 'Indah@fajarwati.com'
  //     }
  //   },
  // )
  // updated.then((result) => {
  //   console.log('===')
  //   console.log(result)
  // }).catch((err) => {

  //   console.log(err)
  // })

  // update field `email` many data of collection mahasiswa
  // const q = { name: 'indah' }
  // const updated = db.collection('mahasiswa').updateMany(
  //   q,
  //   { $set: {
  //       name: 'Indah fajarwati',
  //       email: 'Indah@fajarwati.com'
  //     }
  //   },
  // )

  // updated.then((result) => {
  //   console.log('===')
  //   console.log(result)
  // }).catch((err) => {

  //   console.log(err)
  // })



  // // delete one data of collection mahasiswa
  // const q = { _id: ObjectID('63a418129548473e22d9c350') }
  // db.collection('mahasiswa').deleteOne(q).then((result) => {
  //   console.log('===')
  //   console.log(result)
  // }).catch((err) => {
  //   console.log(err)
  // })

  // delete many data of collection mahasiswa
  const q = { name: 'indah3' }
  db.collection('mahasiswa').deleteMany(q).then((result) => {
    console.log('===')
    console.log(result)
  }).catch((err) => {
    console.log(err)
  })

  


  // console.log('connection success')
})