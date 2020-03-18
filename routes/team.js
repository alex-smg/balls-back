let router = require('express').Router();

let Team = require('../models/Team');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get("/", function(req,res) {
Team.find({}).populate('teams', 'tournaments')
  .then(function(teams) {
    console.log(teams);
    res.send(teams);
  })
  .catch(function(err) {
    res.json(err);
  })
});

router.get("/:id", function(req,res) {
    Team.findById(req.params.id)
        .then(team => {
            finalTeam = {
                name: team.name,
                image: team.image,
                description: team.description,
                player_creator: team.player_creator,
                player_admin: team.player_admin,
                full: team.full,
            };
            res.json(finalTeam);
        })
});

router.delete("/delete/:id", function(req,res) {
    Team.findByIdAndRemove(req.params.id, (err, todo) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: "Team deleted",
            id: todo._id
        };
        return res.status(200).send(response);
    });
});

router.post('/', function (req, res) {
    console.log( req.body);
    new Promise((resolve, reject) => {
        resolve(new Team())
    }).then(team => {
        team.name = req.body.name;
        team.description= req.body.description;
        team.image= req.body.image;
        team.player_creator= req.body.player_creator;
        team.player_admin= req.body.player_admin;
        team.full = req.body.full;
        return team.save();
    })
});

router.put('/:id', function(req,res){
    Team.findById(req.params.id, function(err, team) {
        if (err){
            res.send(err);
        }
        team.name = req.body.name;
        team.description= req.body.description;
        team.image= req.body.image;
        team.player_creator= req.body.player_creator;
        team.player_admin= req.body.player_admin;
        team.full = req.body.full;
        team.save(function(err){
            if(err){
                res.send(err);
            }
            res.json({message : 'Bravo, mise à jour des données OK'});
        });
    });
});

module.exports = router;

