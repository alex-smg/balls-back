let router = require('express').Router();
let mongoose = require('mongoose');

let Team = require('../models/Team');
let Person = require('../models/Person');

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get("/", function(req,res) {
Team.find({}).populate('teams', 'tournaments')
  .then(function(teams) {
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
    new Promise((resolve, reject) => {
        resolve(new Team())
    }).then(team => {
        team.name = req.body.name;
        team.description= req.body.description;
        team.image= req.body.image;
        team.player_creator= req.body.player_creator;
        team.player_admin= req.body.player_admin;
        team.full = req.body.full;
        team.nbrPlayer = req.body.nbrPlayer;
        team.save( (err, savedTeam) => {
            if (err) console.log(err);
            else {
                Person.findById(req.body.player_admin).then(person => {
                    person.teams.push(mongoose.Types.ObjectId(savedTeam._id));
                    person.save(function(err){
                        if(err){
                            res.send(err);
                        }
                    });
                })
               return res.json(savedTeam)
            }
        });
    })
});

router.post('/addPlayer', function (req, res) {
    Team.findById(req.params.id)
        .then(team => {
            team.persons = mongoose.Types.ObjectId(req.params.playerId)
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

