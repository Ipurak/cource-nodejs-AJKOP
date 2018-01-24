//##### [START]Mongo DB #####
var mongo = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017";
var mongoDB;

mongo.connect(url, function(err, db) {
    mongoDB = db.db("my_database");
});


//##### [END]Mongo DB ####

module.exports = mongoDB;