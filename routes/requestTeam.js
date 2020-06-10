let router = require('express').Router();

let RequestTeam = require('../models/RequestTeam');

const Pusher = require('pusher');
const pusher = new Pusher({
    appId: '980442',
    key: '9d6e61f69ec4ae232c76',
    secret: '8ad18769dc3410058509',
    cluster: 'eu',
    encrypted: true
});

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

router.get("/search/player/:id", function(req, res) {
    console.log(req.params);
    RequestTeam.find({ idPlayer: req.params.id }).populate('idTeam').populate('idApplicant')
        .then((requestTeam) => {
            res.send(requestTeam);
        })
        .catch(function(err) {
            res.json(err);
        })
});

router.delete('/:id', function(req, res) {
    RequestTeam.findOneAndRemove({_id: req.params.id}, function(err){
        console.log(err)
    });
    res.send('good');
});

router.post('/', function (req, res) {
    console.log(req.body);
    new Promise((resolve, reject) => {
        resolve(new RequestTeam())
    }).then(requestTeam => {
        console.log(req.body.nameTeam)
        requestTeam.idTeam = req.body.idTeam;
        requestTeam.nameTeam= req.body.nameTeam;
        requestTeam.idApplicant= req.body.idApplicant;
        requestTeam.idPlayer= req.body.idPlayer;
        requestTeam.accepted= false;
        requestTeam.refused= false;
        requestTeam.save( (err, savedTeam) => {
            if (err) console.log(err);
            else {
                let id = JSON.stringify(req.body.idPlayer);
                RequestTeam.findOne({ _id: savedTeam._id }).populate('idTeam').populate('idApplicant')
                    .then((requestTeam) => {
                        pusher.trigger('notif', `${id}`, {
                            requestTeam
                        });
                    });
                return res.json(savedTeam)
            }
        });


        }
    ).catch(function(err) {
        res.json(err);
    })
});

module.exports = router;
