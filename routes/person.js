var router = require('express').Router();

var Person = require('../models/Person');
var jwt = require('jsonwebtoken');
process.env.SECRET_key = 'secret';

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
router.get("/:id", function(req,res) {
    Person.findById(req.params.id)
     .then(person => {
         finalPerson = {
             email: person.email,
             image: person.image,
             firstname: person.firstname,
             lastname: person.lastname
         };
        res.json(finalPerson);
    })
});

router.delete("/delete/:id", function(req,res) {
    Person.findByIdAndRemove(req.params.id, (err, todo) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: "Person deleted",
            id: todo._id
        };
        return res.status(200).send(response);
    });
});

router.post('/', function (req, res) {
    console.log( req.body);
    new Promise((resolve, reject) => {
        resolve(new Person())
    }).then(person => {
        person.name = req.body.name;
        person.email= req.body.email;
        person.password= req.body.password;
        person.image= req.body.image;
        person.roles= req.body.roles;
        person.firstname= req.body.firstname;
        person.lastname= req.body.lastname;
        return person.save();
    })
});
router.post('/login', function (req, res) {
    console.log(req.body)
    Person.findOne({
        email: req.body.email
    })
        .then(person => {
            console.log(person);
            if(person) {
                    if(req.body.password === person.password) {
                        const payload = {
                            _id : person._id,
                            name: person.name,
                            email: person.email,
                            image: person.image,
                            firstname: person.firstname,
                            lastname: person.lastname
                        };
                        let token = jwt.sign(payload, process.env.SECRET_key, {
                            expiresIn:  1440
                        });

                        return res.json(token)


                    } else {
                        console.log('nop');
                        res.json({error: 'Password incorrect'});

                      }
            } else {
                    console.log('nop');
                    res.json({error: 'User incorrect'});
                }
        })
        .catch(err => {
            res.send(err)
        })
    });

module.exports = router;