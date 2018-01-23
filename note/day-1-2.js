
//##### LAOUT #####
npm instal express-ejs-layouts //ใช้ใน nodejs ทำเมนูแสดงในทุกหน้า
//จะใช้ได้กับ laout ที่มีใน node

//1. must create new file in view name layout.ejs
//2. call in nodejs
     var layout = require('express-ejs-layouts');
	 router.use(layout);

	 //Noted: work only route has res.render
	 res.render('myForm');

//##### Work with mysql #####
npm install mysql//installing
//include mysql
var mysql = require('mysql');
var db = mysql.createPool({
    host: 'localhost',
    user: "root",
    password: "",
    database: "db_nodejs_it"
});

//Used
router.get('/select', function(req, res, next) {
    var sql = 'select * from books';
    db.query(sql, function(err, rs) {
        if (err) console.log(err);
        res.send(rs);
    });
});  


