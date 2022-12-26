const mongoose = require('mongoose')


mongoose.set("strictQuery", true);
const dbName = 'youduan'
// mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`) //, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const ObjectID = require('mongodb').ObjectID;


// const Contact = mongoose.model('Contact', { 
//   name: {
//     type: String,
//     required: true
//   }, 
//   hp: {
//     type: String,
//     required: true
//   }, 
//   email: {
//     type: String
//   },
// })


// // add 1 data
// const contact1 = new Contact({
//   name: "anton",
//   email: "anton@gmail.com",
//   hp: "anton@gmail.com"
// })
// // save
// contact1.save().then((r) => {
//   console.log(r)
// })
