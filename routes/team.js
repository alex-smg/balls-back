var router = require('express').Router();

var Team = require('../models/Team');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get("/", function(req,res) {
Team.find({}).populate('persons')
  .then(function(teams) {
    console.log(teams);
    res.send(teams);
  })
  .catch(function(err) {
    res.json(err);
  })
});

module.exports = router;