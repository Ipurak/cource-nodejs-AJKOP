var express = require('express');
var router = express.Router();
var fs = require('fs');

var fileUpload = require('express-fileupload');
router.use(fileUpload());

var ObjectID = require('mongodb').ObjectID; //to get id in collection useful for delete update

//##### [START]MongoDB #####
var mongo = require('./connect').mongo;
var url = require('./connect').url;
var db_name = require('./connect').db;
var mongoDB = null;
mongo.connect(url, function(err, db) {
    mongoDB = db.db(db_name);
});
//##### [END]MongoDB #####

var db = require('./connect-mysql');



//##### [START]Layout #####
var layout = require('express-ejs-layouts');
// router.use(layout);
//##### [END]Layout #####

router.get('/test-connect-mongo', function(req, res, next) {
    console.log(mongoDB);
    res.send("info");
});

//### [START]Check Login ###
var checkLogin = (req, res, next) => {
    if (1) {
        next();
    } else {
        res.redirect('/login');
    }
}
router.get('/login', function(req, res, next) {
    res.render('login');
});
//### [END]Check Login ###


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
router.get('/myForm', checkLogin, function(req, res, next) {
    res.render('myForm'); //call Folder myForm.ejs in views
});
router.post('/myForm', function(req, res, next) {
    //get parameter by Form use key "body" body.[name's input]
    var x = req.body.x;
    var y = req.body.y;
    res.send('x = ' + x + ' y = ' + y);
});

//node with angular 
router.get('/test-angularjs', function(req, res, next) {
    res.render('test-angularjs');
});

//mysql
//select
router.get('/select', function(req, res, next) {
    // console.log("aaa");
    // console.log(db);
    var sql = 'select * from books';
    db.query(sql, function(err, rs) {
        if (err) console.log(err);
        res.send(rs);
    });
    // res.send("ok");
});
//insert and edit
router.post('/save', function(req, res, next) {
    if (req.body.id != null) {
        //edit
        var sql = 'Update books SET ? WHERE id = ?';
        var param = [
            req.body, //-------------^
            req.body.id //------------------------^
        ];
        db.query(sql, param, function(err, rs) {
            if (err) console.log(err);
            res.send({ message: 'success' });
        });
    } else {
        //insert
        var sql = 'insert into books SET ?';
        var d = new Date();
        var h = d.getHours();
        var m = d.getMinutes();
        var str = h + ":" + m;
        console.log(str);
        req.body.created_at = new Date();
        req.body.status = 1;
        db.query(sql, req.body, function(err, rs) {
            if (err) console.log(err);
            res.send({ message: 'success' });
        });
    }
});
//Delete
router.post('/del', function(req, res, next) {
    var sql = 'delete from books where id = ?';
    var param = [
        req.body.id //------------------------^
    ];
    db.query(sql, param, function(err, rs) {
        if (err) console.log(err);
        res.send({ message: 'success' });
    });
});
//Write File by nodeJS
router.get('/file-test', function(req, res, next) {
    fs.appendFile('data.txt', 'hello', function(err) {
        if (err) console.log(err);
        res.send('ok pass');
    });
});

router.get('/read-file', function(req, res, next) {
    fs.readFile('data.txt', function(err, data) {
        if (err) console.log(err);
        res.send('data: ' + data);
    });
});

router.get('/file-stat', function(req, res, next) {
    fs.stat('data.txt', (err, data) => {
        if (err) console.log(err);
        res.send(data);
    });
});

router.get('/insert-mongo', function(req, res, next) { //From URL
    res.render('insert-mongo');
});

router.post('/insert-mongo', function(req, res, next) { //From Ajax
    if (req.body._id == null) {
        //inser to mongodb
        req.body.created_at = new Date();
        mongoDB.collection('books').insertOne(req.body, function(err, rs) {
            if (err) console.log(err);
            res.send({ message: "success" });
        });
    } else {
        //update to mongodb
        var condition = { _id: new ObjectID(req.body._id) }
        req.body._id = new ObjectID(req.body._id);
        var data = {
            $set: req.body
        }
        mongoDB.collection('books').updateOne(condition, data, function(err, rs) {
            if (err) console.log(err);
            console.log(rs);
            res.send({ message: 'success' });
        });
    }

});

router.get('/select-mongo', async function(req, res, next) {

    mongoDB.collection('books')
        .find()
        .sort({ name: -1 }).toArray(function(err, rs) {
            var arr = [];

            if (rs != null)
                rs.forEach(book => {

                    var con = { _id: new ObjectID(book.user_id) };

                    var user_name;

                    mongoDB.collection('users')
                        .find(con).toArray(function(err, rs) {
                            if (err) console.log(err);

                            if (rs[0] != null) {
                                user_name = rs[0].name;
                            }

                            var row = {
                                _id: book._id,
                                isbn: book.isbn,
                                name: book.name,
                                user_name: user_name
                            }

                            arr.push(row);

                        })

                });

            setTimeout(() => {
                res.send(arr);
            }, 100);

        });
    // mongoDB.collection('books').aggregate([{
    //     $lookup: {
    //         from: 'users',
    //         localField: '_id',
    //         foreignField: 'user_id',
    //         as: 'user'
    //     }
    // }], function(err, rs) {
    //     // var rs = JSON.stringify(rs);
    //     // if (err) console.log(err);
    //     // res.send(rs);
    // });
});

router.post('/bookAll', function(req, res, next) {

    mongo.connect(url, function(err, db) {
        if (err) console.log(err);
        mongoDB = db.db(db_name);

        mongoDB.collection('books')
            .find().toArray(function(err, rs) {
                if (err) console.log(err);
                res.send(rs);
            });
    });

});

router.post('/userInfo', function(req, res, next) {
    var con = { _id: new ObjectID(req.body.user_id) };
    mongo.connect(url, function(err, db) {
        if (err) console.log(err);
        mongoDB.collection('users')
            .find(con).toArray(function(err, rs) {
                if (err) console.log(err);
                res.send(rs);
            });
    });
    res.send({ name: "aaa" });
});

router.post('/del-mongo', function(req, res, next) {
    var condition = {
        _id: new ObjectID(req.body._id)
    }
    mongoDB.collection('books').deleteOne(condition, function(err, rs) {
        if (err) console.log(err);
        res.send({ message: 'success' });
    });
});

router.get('/home', function(req, res, next) {
    res.render('home');
});

router.get('/quotation-bill', function(req, res, next) {
    res.render('quotation-bill');
})

router.get('/testUpload', function(req, res, next) {
    res.render('testUpload');
})

router.post('/testUpload', function(req, res, next) {
    if (req.files.myFile != undefined) {
        var i = 0;
        // single file
        if (req.files.myFile.name != undefined) {
            var myFile = req.files.myFile;
            var arr = myFile.name.split('.');
            var ext = arr[arr.length - 1];
            var d = new Date();
            var newName = d.getFullYear() +
                d.getMonth() + "" +
                d.getDate() + "" +
                d.getHours() + "" +
                d.getMinutes() + "" +
                d.getSeconds() + "" +
                d.getMilliseconds() + "" +
                "." + ext;
            var path = __dirname.replace("/routes", '')
                .replace("\\routes", '');
            path = path + '/public/my-upload/' + newName;
            myFile.mv(path, function(err) {
                if (err) console.log(err);
            });
        } else {
            // multiple file
            req.files.myFile.forEach(myFile => {
                i++;
                var arr = myFile.name.split('.');
                var ext = arr[arr.length - 1];
                var d = new Date();
                var newName = d.getFullYear() +
                    d.getMonth() + "" +
                    d.getDate() + "" +
                    d.getHours() + "" +
                    d.getMinutes() + "" +
                    d.getSeconds() + "" +
                    d.getMilliseconds() + "" +
                    i + "" +
                    "." + ext;
                var path = __dirname.replace("/routes", '')
                    .replace("\\routes", '');
                path = path + '/public/my-upload/' + newName;
                myFile.mv(path, function(err) {
                    if (err) console.log(err);
                });
            });
        }
        res.send("upload successfuly!!");
    } else {
        res.send("Please, select a file.");
    }
})

router.get('/allFile', function(req, res, next) {
    res.render('allFile');
})

router.get('/fileInDir', function(req, res, next) {
    var path = __dirname.replace('/routes', '').replace("\\router", '');
    path = path + "/public/my-upload/";

    fs.readdir(path, function(err, files) {
        if (err) console.log(err);
        res.send(files);
    });

})

module.exports = router;