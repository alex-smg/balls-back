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
    console.log(person);
    res.send(person);
  })
  .catch(function(err) {
    res.json(err);
  })
});

router.post('/', function (req, res) {
    let person = new Person( {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      image: req.body.image,
      roles: req.body.roles,
      firstname: req.body.firstname,
      lastname: lastname,
    })
    person.save();

    res.send('C good');
  }
);

module.exports = router;