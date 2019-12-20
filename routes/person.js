var router = require('express').Router();

var Person = require('../models/Person');

// router.get('/', (req, res) => {
//   person.find(null, function(err, person) {
//       if (err) { throw err; }
//       console.log(person);
//     });
// })

// SANS MONGOOSE
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("sport");
//   dbo.collection("person").find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });
router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get("/", function(req,res) {
  Person.find({})
  .then(function(person) {
    res.send(person);
  })
  .catch(function(err) {
    res.json(err);
  })
});

module.exports = router;