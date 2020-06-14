const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://alex:asdasd@cluster0-xfzgw.gcp.mongodb.net/test?retryWrites=true&w=majority";

MongoClient.connect(url, function(err, db) {
    console.log('Connected');
    db.close();
});
// const client = new MongoClient(uri, { useNewUrlParser: true });
//
//
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   var myobj = { name: "Company Inc", address: "Highway 37" };
//   collection.collection("customers")
//   client.close();
// });
