/**
 * Created by Majid on 8/23/2014.
 */

var express = require('express');
var userModel = require("../models/user").UserModel;
var tokenModel = require("../models/token").TokenModel;
var trafficModel = require("../models/traffic").TrfficModel;
var profileModel = require("../models/profile").ProfileModel;
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
                    var tmp = f.split('/');
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

function getTrafficById(req, res){
    try{
	var id = req.params.trafficId;
	if(!id)
	    res.send('empty params', 400);
	trafficModel.findOne({'_id': id}, function(err, traffic){
            if(err)
                throw err;
	    if(!traffic)
		res.send('not found', 405);
            res.json(traffic);
        });
    }
    catch(ex){
	console.log(ex);
	res.send(ex, 502);
    }
}

function getLastTraffic(req, res){
    try{
        trafficModel.find(function(err, traffics){
            if(err)
                throw err;
	    if(traffics && traffics.length > 0)
        	res.json(traffics[traffics.length - 1]);
        });
    }
    catch(ex){
        res.send(ex.message, 502);
        console.log(ex.message);
    }
}

function getTrafficPage(req, res){
    try{
	var pageNumber = req.params.pageNumber;
	var pageSize = req.params.pageSize;
	console.log(pageNumber + " : " + pageSize);
        trafficModel.find({},{},{skip: parseInt(pageNumber)*parseInt(pageSize), limit: parseInt(pageSize)}).sort({'_id':1}).exec(function(err, traffics){
            if(err)
                throw err;
	    //if(traffics && traffics.length > 0)
        	res.json(traffics);
        });
    }
    catch(ex){
        res.send(ex.message, 502);
        console.log(ex.message);
    }
}

function getTrafficPageByPlate(req, res){
    try{
        var pageNumber = req.params.pageNumber;
        var pageSize = req.params.pageSize;
        var plate = req.params.plate;
        console.log(pageNumber + " : " + pageSize + " : " + plate);
        trafficModel.find({persianPlate2:plate},{},{skip: parseInt(pageNumber)*parseInt(pageSize), limit: parseInt(pageSize)}).sort({'_id':1}).exec(function(err, traffics){
            if(err)
                throw err;
            //if(traffics && traffics.length > 0)
            res.json(traffics);
        });
    }
    catch(ex){
        res.send(ex, 502);
        console.log(ex);
    }
}

function getPageCount(req, res){
    try{
	var pageSize = req.params.pageSize;
	console.log(pageSize);
        trafficModel.find(function(err, traffics){
		var counts = traffics.length;
		var pageCount = parseInt(counts)/parseInt(pageSize);
        	res.json({pageCount:parseInt(pageCount,10)});
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


function getProfile(req, res){
    var plate = req.params.plate;
    try
    {
	profileModel.findOne({'plate':plate}, function(err, prof){
	    if(err)
		res.send(err, 402);
	    if(!prof)
		res.send("not found", 402);
	    res.json(prof);
	});
    }
    catch(ex)
    {
	console.log(ex);
	res.send(ex, 402);
    }
}

function saveProfile(req, res){
    var firstName = req.params.firstName;
    var lastName = req.params.lastName;
    var nationalityCode = req.params.nationalityCode;
    var plate = req.params.plate;
    try
    {
	profileModel.findOne({'plate':plate}, function(err, prof){
	    if(prof){
		prof.firstName= firstName;
    		prof.lastName= lastName;
    		prof.nationalityCode= nationalityCode;
		prof.save(null);
	    }
	    else{
		var profile = new profileModel({
    		    firstName: firstName,
    		    lastName: lastName,
    		    nationalityCode: nationalityCode,
    		    plate: plate
		});
		profile.save(null);
		res.send("ok");
	    }
	});
    }
    catch(ex)
    {
	console.log(ex);
	res.send(ex, 402);
    }
}

function getTrafficPageByDate(req, res){
    try{
	var pageNumber = req.params.pageNumber;
	var pageSize = req.params.pageSize;
	var fromDay = req.params.fromDay;
	var fromMonth = req.params.fromMonth;
	var fromYear = req.params.fromYear;
	var toDay = req.params.toDay;
	var toMonth = req.params.toMonth;
	var toYear = req.params.toYear;
	console.log(pageNumber + " : " + pageSize + " : " +  fromDay + " : " + fromMonth + " : " + fromYear + " : " + toDay + " : " + toMonth + " : " + toYear);
	trafficModel.find({},{},{skip: parseInt(pageNumber)*parseInt(pageSize), limit: parseInt(pageSize)}).sort({'_id':1}).exec(function(err, traffics){
            if (err)
                throw err;
            else {
                var result = [];
                for (var i = 0; i < traffics.length; i++) {
                    var tmp = jalali_moment(traffics[i].date + " " + traffics[i].time, "jYYYY/jMM/jDD HH:mm:ss").format('YYYY/MM/DD HH:mm:ss');
                    var date = Date.parse(tmp);
		    var stringStart = fromYear + "/" + fromMonth + "/" + fromDay;
		    var stringEnd   = toYear + "/" + toMonth + "/" + toDay;
		    var tmpStart = jalali_moment(stringStart + " " + "00:00:00", "jYYYY/jMM/jDD HH:mm:ss").format('YYYY/MM/DD HH:mm:ss');
		    var tmpEnd   = jalali_moment(stringEnd + " " + "23:59:00", "jYYYY/jMM/jDD HH:mm:ss").format('YYYY/MM/DD HH:mm:ss');
                    if(date >= Date.parse(tmpStart) && date <= Date.parse(tmpEnd))
                        result.push(traffics[i]);
                    console.log(tmpStart + " : " + tmp + " : " + tmpEnd);
                }
                res.json(result);
            }
        });
    }
    catch(ex){
        res.send(ex.message, 502);
        console.log(ex.message);
    }
}

module.exports = router;
router.route('/getListOfTraffics').get(getListOfTraffic);
router.route('/getPageCount/:pageSize').get(getPageCount);
router.route('/getTrafficPage/:pageNumber/:pageSize').get(getTrafficPage);
router.route('/getTrafficPageByPlate/:pageNumber/:pageSize/:plate').get(getTrafficPageByPlate);
router.route('/saveProfile/:firstName/:lastName/:nationalityCode/:plate').get(saveProfile);
router.route('/getTrafficPageByDate/:fromDay/:fromMonth/:fromYear/:toDay/:toMonth/:toYear/:pageNumber/:pageSize').get(getTrafficPageByDate);
router.route('/getProfile/:plate').get(getProfile);
router.route('/getLastTraffic').get(getLastTraffic);
router.route('/getTrafficById/:trafficId').get(getTrafficById);
router.route('/getListOfImages/:trafficId').get(getListOfImages);
router.route('/getTrafficBetween/:start/:end').get(getTrafficBetween);



