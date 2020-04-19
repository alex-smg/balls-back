var router = require('express').Router();


router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

router.post('/', function (req, res) {
    let file = req.files.file;
    let extension = req.files.mimetype === 'image/png' ? '.png' : '.jpg';
    let name = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    file.mv(`./upload/${req.body.folder}/${name}${extension}`);
    res.json(`upload/${req.body.folder}/${name}${extension}`)

});


module.exports = router;