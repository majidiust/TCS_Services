/**
 * Created by Majid on 8/23/2014.
 */

var express = require('express');
var userModel = require("../models/user").UserModel;
var tokenModel = require("../models/token").TokenModel;
var trafficModel = require("../models/traffic").TrfficModel;
var AuthControl = require("./users");
var jwt = require("jwt-simple");
var moment = require("moment");
var datejs = require("safe_datejs");
var fs = require("fs");
var dir = require("node-dir");
var jalali_moment = require("moment-jalaali");

var router = express.Router();


function getListOfImages(req, res) {
    try {

        var id = req.params.trafficId;
        var path = "./public/www/" + id;
        dir.files(path, function (err, files) {
            if (err) {
                throw err;
            }
            else {
                var result = [];
                for(var i = 0 ; i < files.length ; i++) {
                    var f = files[i];
                    var tmp = f.split('\\');
                    console.log(tmp[tmp.length - 1]);
                    result.push(tmp[tmp.length - 1]);
                }
                res.json(result);
            }
        });
    }
    catch (ex) {
        console.log(ex.message);
        res.send(ex.message, 501);
    }
}

function getListOfTraffic(req, res){
    try{
        trafficModel.find(function(err, traffics){
            if(err)
                throw err;
            res.json(traffics);
        });
    }
    catch(ex){
        res.send(ex.message, 502);
        console.log(ex.message);
    }
}

function getTrafficBetween(req, res){
    if(req.params.start && req.params.end) {
        trafficModel.find(function (err, traffics) {
            if (err)
                throw err;
            else {
                var result = [];
                for (var i = 0; i < traffics.length; i++) {
                    var tmp = jalali_moment(traffics[i].date + " " + traffics[i].time, "jYYYY/jMM/jDD HH:mm:ss").format('YYYY/MM/DD HH:mm:ss');
                    var date = Date.parse(tmp);
                    if(date >= req.params.start && date <= req.params.end)
                        result.push(traffics[i]);
                    console.log(tmp + " : " + date);
                }
                res.json(result);
            }
        });
    }
    else{
        res.send("Empty params", 405);
    }
}

module.exports = router;
router.route('/getListOfTraffics').get(getListOfTraffic);
router.route('/getListOfImages/:trafficId').get(getListOfImages);
router.route('/getTrafficBetween/:start/:end').get(getTrafficBetween);


