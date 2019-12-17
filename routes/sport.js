var router = require('express').Router();

var sport = require('./../models/Sport');

router.get('/', (req, res) => {
  sport.find(null, function(err, sports) {
      if (err) { throw err; }
      console.log(sports);
    });
})
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("sport");
//   dbo.collection("sport").find({}).toArray(function(err, result) {
//     if (err) throw err;
//     console.log(result);
//     db.close();
//   });
// });

module.exports = router;