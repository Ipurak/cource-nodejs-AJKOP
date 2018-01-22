var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/hello', function(req, res, next) {
    res.send("Hello hope you have a nice day!!111111");
});

router.get('/hi', function(req, res, next) {
    //get paramiter from URL use key "query" query.[name's paramiter]
    var name = req.query.name;
    res.send('Hello ' + name);
});

//Send data by form
router.get('/myForm', function(req, res, next) {
    res.render('myForm'); //call Folder myForm.ejs in views
});
router.post('/myForm', function(req, res, next) {
    //get parameter by Form use key "body" body.[name's input]
    var x = req.body.x;
    var y = req.body.y;
    res.send('x = ' + x + ' y = ' + y);
});

module.exports = router;