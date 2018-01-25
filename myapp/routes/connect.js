//##### [START]Mongo DB #####
var mongo = require("mongodb").MongoClient;
var url = "";
var data = {
        mongo: mongo,
        url: "mongodb://localhost:27017",
        db: "my_database"
    }
    //##### [END]Mongo DB ####

module.exports = data;