let router = require('express').Router();

let Tournament = require('../models/Tournament');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get("/", function(req,res) {
    Tournament.find({}).populate('teams').populate('admin').populate('creator')
        .then(function(tournaments) {
            console.log(tournaments);
            res.send(tournaments);
        })
        .catch(function(err) {
            res.json(err);
        })
});

router.get("/:id", function(req,res) {
    Tournament.findById(req.params.id)
        .then(tournament => {
            res.json(tournament);
        })
});

router.get("/search/:code", function(req, res) {
    console.log(req.params);
    if (req.query.activeReg === 'true') {
        console.log('région');
        Tournament.find({ codeRegion: req.params.code })
            .then((tournaments) => {
                console.log(tournaments);
                res.send(tournaments);
            })
            .catch(function(err) {
                res.json(err);
            })
    } else {
        Tournament.find({ postalCode: new RegExp('^' + req.params.code)})
            .then((tournaments) => {
                console.log(tournaments);
                res.send(tournaments);
            })
            .catch(function(err) {
                res.json(err);
            })
    }
})

router.delete("/delete/:id", function(req,res) {
    Tournament.findByIdAndRemove(req.params.id, (err, todo) => {
        if (err) return res.status(500).send(err);
        const response = {
            message: "Tournament deleted",
            id: todo._id
        };
        return res.status(200).send(response);
    });
});

router.post('/', function (req, res) {
    console.log( req.body);
    new Promise((resolve, reject) => {
        resolve(new Tournament())
    }).then(tournament => {
        tournament.name = req.body.name;
        tournament.description= req.body.description;
        tournament.image= req.body.image;
        tournament.addressLocality = req.body.addressLocality;
        tournament.addressRegion = req.body.addressRegion;
        tournament.postalCode = req.body.postalCode;
        tournament.streetAddress = req.body.streetAddress;
        tournament.codeRegion = req.body.codeRegion;
        tournament.lattitude = req.body.lattitude;
        tournament.longitude = req.body.longitude;
        tournament.publish = req.body.publish;
        tournament.full = req.body.full;
        tournament.teams = req.body.teams;
        tournament.creator = req.body.creator;
        tournament.gender = req.body.gender;
        tournament.admin = req.body.admin;
        tournament.date_begin = req.body.date_begin,
        tournament.date_end = req.body.date_end,
        tournament.date_end_inscription = req.body.date_end_inscription,
        tournament.widthTeam = req.body.widthTeam,
        tournament.numberTeam = req.body.numberTeam,
        tournament.level =  req.body.level,
        tournament.typeOfHen = req.body.typeOfHen,
        res.json({'file': 'good'});
        return tournament.save();
    })
});

router.put('/:id', function(req,res){
    Tournament.findById(req.params.id, function(err, tournament) {
        tournament.name = req.body.name;
        tournament.description= req.body.description;
        tournament.image= req.body.image;
        tournament.addressLocality = req.body.addressLocality;
        tournament.addressRegion = req.body.addressRegion;
        tournament.postalCode = req.body.postalCode;
        tournament.streetAddress = req.body.streetAddress;
        tournament.codeRegion = req.body.codeRegion;
        tournament.lattitude = req.body.lattitude;
        tournament.longitude = req.body.longitude;
        tournament.publish = req.body.publish;
        tournament.full = req.body.full;
        tournament.teams = req.body.teams;
        tournament.creator = req.body.creator;
        tournament.gender = req.body.gender;
        tournament.admin = req.body.admin;
        tournament.date_begin = req.body.date_begin,
            tournament.date_end = req.body.date_end,
            tournament.date_end_inscription = req.body.date_end_inscription,
            tournament.widthTeam = req.body.widthTeam,
            tournament.numberTeam = req.body.numberTeam,
            tournament.level =  req.body.level,
            tournament.typeOfHen = req.body.typeOfHen,
        tournament.save(function(err){
            if(err){
                res.send(err);
            }
            res.json({message : 'Bravo, mise à jour des données OK'});
        });
    });
});

module.exports = router;

