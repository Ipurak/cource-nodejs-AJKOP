var express = require('express');
var router = express.Router();

var ObjectID = require('mongodb').ObjectID; //to get id in collection useful for delete update
//##### [START]MongoDB #####
var mongo = require('./connect').mongo;
var url = require('./connect').url;
var db_name = require('./connect').db;
var mongoDB = null;

//##### [END]MongoDB #####

//##### [START]Session #####
var session = require('express-session');
var FileStore = require('session-file-store')(session);
router.use(session({
    resave: true,
    saveUninitialized: true,
    secret: '45678909876hthgrfedfew',
    store: new FileStore()
}));
//##### [END]Session #####

router.get('/', function(req, res, next) {
    res.send("ok");
});

router.get('/test', function(req, res, next) {
    res.send("test pass");
});

router.post('/checkLogin', function(req, res, next) {

    mongo.connect(url, function(err, db) {
        mongoDB = db.db(db_name);

        var con = {
            usr: req.body.usr,
            pwd: req.body.pwd
        }
        mongoDB.collection('users').find(con).toArray(function(err, rs) {
            if (err) console.log(err);
            if (rs[0] != null) {
                //found
                req.session.user_id = rs[0]._id;
                res.send({ message: "found" });
            } else {
                //not found
                res.send({ message: "not found" });
            }
        });

    });


});

router.post('/info', function(req, res, next) {

    mongo.connect(url, function(err, db) {
        if (err) console.log(err);

        console.log(db);
        mongoDB = db.db(db_name);
        var user_id = req.session.user_id;
        var con = {
            _id: new ObjectID(user_id)
        };
        mongoDB.collection('users')
            .find(con).toArray(function(err, rs) {
                if (err) console.log(err);
                if (rs[0] != null) {
                    res.send({ name: rs[0].name });
                } else {
                    res.send({});
                }
            })
    });

    // res.send({ name: "Test" });

});

router.get('/logout', function(req, res, next) {

    req.session.user_id = null;
    res.send({ message: 'success' });

});

module.exports = router;