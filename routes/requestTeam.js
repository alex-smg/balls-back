let router = require('express').Router();

let RequestTeam = require('../models/RequestTeam');

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.get("/:id", function(req,res) {
    RequestTeam.findById(req.params.id)
        .then(requestTeam => {
            res.json(requestTeam);
        })
});

router.get("/search/:id", function(req, res) {
    console.log(req.params);
    RequestTeam.find({ idApplicant: req.params.id })
            .then((requestTeam) => {
                console.log(requestTeam);
                res.send(requestTeam);
            })
            .catch(function(err) {
                res.json(err);
            })
});

router.post('/', function (req, res) {
    console.log( req.body);
    new Promise((resolve, reject) => {
        resolve(new RequestTeam())
    }).then(requestTeam => {
        requestTeam.idTeam = req.body.idTeam;
        requestTeam.nameTeam= req.body.nameTeam;
        requestTeam.idApplicant= req.body.idApplicant;
        requestTeam.idPlayer= req.body.idPlayer;
        requestTeam.accepted= req.body.accepted;
        requestTeam.refused= req.body.refused;
        }
    )});
module.exports = router;