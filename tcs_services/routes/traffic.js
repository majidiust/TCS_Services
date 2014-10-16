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
        trafficModel.find().populate('profile').exec(function(err, traffics){
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
        trafficModel.find().sort({'_id': 1}).exec(function(err, traffics){
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

function getNextRecord(req, res){
    try{
        console.log(req.params.currentId);
        trafficModel.find({'_id': {$gt: req.params.currentId}}).sort({'_id': 1}).limit(1).exec(function(err, traffics){
            if(err)
                throw err;
            if(traffics)
                res.json(traffics);
        });
    }
    catch(ex){
        res.send(ex.message, 502);
        console.log(ex.message);
    }
}

function getNextPlatedRecord(req, res){
    try{
        console.log(req.params.currentId);
        trafficModel.find( { $and :[
            {'_id': {$gt: req.params.currentId}}, {persianPlate2: {'$ne': null }}
        ]}).sort({'_id': 1}).limit(1).exec(function(err, traffics){
            if(err)
                throw err;
            if(traffics)
                res.json(traffics);
        });

    }
    catch(ex){
        res.send(ex.message, 502);
        console.log(ex.message);
    }
}

function getNextUnPlatedRecord(req, res){
    try{
        console.log(req.params.currentId);
        trafficModel.find( { $and :[
            {'_id': {$gt: req.params.currentId}}, {persianPlate2:  null }
        ]}).sort({'_id': 1}).limit(1).exec(function(err, traffics){
            if(err)
                throw err;
            if(traffics)
                res.json(traffics);
        });

    }
    catch(ex){
        res.send(ex.message, 502);
        console.log(ex.message);
    }
}

function getNextPlatedRecordByPlate(req, res){
    try{
        console.log(req.params.currentId);
        trafficModel.find( { $and :[
            {'_id': {$gt: req.params.currentId}}, {persianPlate2:  req.params.plate }
        ]}).sort({'_id': 1}).limit(1).exec(function(err, traffics){
            if(err)
                throw err;
            if(traffics)
                res.json(traffics);
        });
    }
    catch(ex){
        res.send(ex.message, 502);
        console.log(ex.message);
    }
}

function getLastRecord(req, res){
    try{
        console.log(req.params.currentId);
        trafficModel.find({'_id': {$lt: req.params.currentId}}).sort({'_id': -1}).limit(1).exec(function(err, traffics){
            if(err)
                throw err;
            if(traffics)
                res.json(traffics);
        });
    }
    catch(ex){
        res.send(ex.message, 502);
        console.log(ex.message);
    }
}

function getLastPlatedRecord(req, res){
    try{
        console.log(req.params.currentId);

        trafficModel.find( { $and :[
            {'_id': {$lt: req.params.currentId}}, {persianPlate2: {'$ne': null }}
        ]}).sort({'_id': -1}).limit(1).exec(function(err, traffics){
            if(err)
                throw err;
            if(traffics)
                res.json(traffics);
        });
    }
    catch(ex){
        res.send(ex.message, 502);
        console.log(ex.message);
    }
}

function getLastUnPlatedRecord(req, res){
    try{
        console.log(req.params.currentId);
        trafficModel.find( { $and :[
            {'_id': {$lt: req.params.currentId}}, {persianPlate2: null }
        ]}).sort({'_id': -1}).limit(1).exec(function(err, traffics){
            if(err)
                throw err;
            if(traffics)
                res.json(traffics);
        });
    }
    catch(ex){
        res.send(ex.message, 502);
        console.log(ex.message);
    }
}

function getLastPlatedRecordByPlate(req, res) {
    try {
        console.log(req.params.currentId);
        trafficModel.find({ $and: [
            {'_id': {$lt: req.params.currentId}},
            {persianPlate2: req.params.plate }
        ]}).sort({'_id': -1}).limit(1).exec(function (err, traffics) {
            if (err)
                throw err;
            if (traffics)
                res.json(traffics);
        });
    }
    catch (ex) {
        res.send(ex.message, 502);
        console.log(ex.message);
    }
}


function getTrafficPage(req, res){
    try{
	var pageNumber = req.params.pageNumber;
	var pageSize = req.params.pageSize;
	console.log(pageNumber + " : " + pageSize);
        trafficModel.find({},{},{skip: parseInt(pageNumber)*parseInt(pageSize), limit: parseInt(pageSize)}).populate('profile').sort({'_id':1}).exec(function(err, traffics){
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

function getPlatedTrafficPage(req, res){
    try{
        var pageNumber = req.params.pageNumber;
        var pageSize = req.params.pageSize;
        console.log(pageNumber + " : " + pageSize);
        trafficModel.find({persianPlate2: {'$ne': null }},{},{skip: parseInt(pageNumber)*parseInt(pageSize), limit: parseInt(pageSize)}).populate('profile').sort({'_id':1}).exec(function(err, traffics){
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

function getUnPlatedTrafficPage(req, res){
    try{
        var pageNumber = req.params.pageNumber;
        var pageSize = req.params.pageSize;
        console.log(pageNumber + " : " + pageSize);
        trafficModel.find({persianPlate2: null},{},{skip: parseInt(pageNumber)*parseInt(pageSize), limit: parseInt(pageSize)}).populate('profile').sort({'_id':1}).exec(function(err, traffics){
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
        trafficModel.find({persianPlate2:plate},{}).populate('profile').sort({'_id':1}).exec(function(err, traffics){
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

function getPlatedPageCount(req, res){
    try{
        var pageSize = req.params.pageSize;
        console.log(pageSize);
        trafficModel.find({persianPlate2: {'$ne': null }}, function(err, traffics){
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

function getUnPlatedPageCount(req, res){
    try{
        var pageSize = req.params.pageSize;
        console.log(pageSize);
        trafficModel.find({persianPlate2: null}, function(err, traffics){
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
    var currentId = req.params.currentId;
    try
    {
	AuthControl.updateUserActivity( " ذخیزه سازی پروفایل برای پلک  "  + plate + " شناسه رکورد " + currentId , req.user);
	profileModel.findOne({'plate':plate}, function(err, prof){
	    if(prof){
		prof.firstName= firstName;
    		prof.lastName= lastName;
    		prof.nationalityCode= nationalityCode;
		prof.save(null);
		trafficModel.findOne({'_id':currentId}, function(err, traffic){
		    if(traffic){
			traffic.profile = prof.id;
			traffic.save(null);
		    }
		});
	    }
	    else{
		var profile = new profileModel({
    		    firstName: firstName,
    		    lastName: lastName,
    		    nationalityCode: nationalityCode,
    		    plate: plate
		});
		profile.save(null);
		trafficModel.findOne({'_id':currentId}, function(err, traffic){
		    if(traffic){
			traffic.profile = profile.id;
			traffic.save(null);
		    }
		});
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
	trafficModel.find().sort({'_id':1}).exec(function(err, traffics){
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

function updatePlate(req, res){

    try{
        console.log(req.body.id + " : " + req.body.plate);
        trafficModel.findOne({'_id':req.body.id}, function(err, traffic){
            if(traffic){
		var last = traffic.persianPlate2;
		var next = req.body.plate;
		AuthControl.updateUserActivity("تغییر پلاک از "  + last +  " به  " + next  , req.user);
                traffic.persianPlate2 = req.body.plate;
		traffic.changeLog.push({userName: req.user.username, userId: req.user.id, last : last, next : next});
                traffic.save(null);
            }

            res.send("ok");
        });
    }
    catch(ex){
        console.log(ex)
        res.send(ex);
    }
}

function getAutomaticPlated(req, res){
    try{
	console.log("automatic plated");
	trafficModel.find({persianPlate2: { $ne :  null}, englishPlate:  null}, function(err, traffics){
            var counts = traffics.length;
            res.json(counts);
        });
    }
    catch(ex){
	console.log(ex);
	res.send(ex, 500);
    }
}


function getManualPlated(req, res){
    try{
	console.log("manual plated");
	trafficModel.find({persianPlate2: { $ne :  null}, englishPlate:  null}).populate('profile').exec(function(err, traffics){
            //var counts = traffics.length;
            res.json(traffics);
        });
    }
    catch(ex){
	console.log(ex);
	res.send(ex, 500);
    }
}

function getTotalPlated(req, res){
    try{
	trafficModel.find({persianPlate2: { $ne :  null}}, function(err, traffics){
            var counts = traffics.length;
            res.json(counts);
        });
    }
    catch(ex){
	console.log(ex);
	res.send(ex, 500);
    }
}

function getChangedRecords(req, res){
    try{
	trafficModel.find({changeLog: { $ne :  null}}).populate('profile').exec(function(err, traffics){
            res.json(traffics);
        });
    }
    catch(ex){
	console.log(ex);
	res.send(ex, 500);
    }
}

function inspectProfile(req, res){
    try
    {
	profileModel.find(function(err, prof){
	    for(var i = 0 ; i < prof.length ; i++){
		var plate = prof[i].plate;
		var id = prof[i].id;
		trafficModel.findOne({persianPlate2:plate}, function(err, tr){
		    if(tr){
			tr.profile = id;
			tr.save(null);
		    }
		    else{
			console.log(err);
		    }	
		})
	    };
	});
    }
    catch(ex)
    {
	console.log(ex);
	res.send(ex, 500);
    }
}

function getChangeLogs(req, res){
    try{
	trafficModel.findOne({'_id': req.params.trafficId}, function(err, traffics){
            //traffics.changeLog.find().populate('UserId').exec(function(err, changeLogs){
		res.send(traffics.changeLog);
	//    });
        });
    }
    catch(ex){
	console.log(ex);
	res.send(ex, 500);
    }
}

function getChangedPlateCount(req, res){
    try
    {
	trafficModel.find({changeLog: { $ne :  null}}, function(err, traffics){
            res.json(traffics.length);
        });	
    }
    catch(ex)
    {
	console.log(ex);
	res.send(ex, 500);
    }
}

function searchTraffic(req, res){
    try{
	trafficModel.find({persianPlate2: { $regex :  ".*" + req.params.plate + ".*"}}, function(err, tr){
		    if(tr)
			res.send(tr);
		    else if(err){	
			console.log(err);
			res.send(err, 500);
		    }
		});
    }
    catch(ex){
	console.log(ex);
	res.send(ex, 500);
    }
}

module.exports = router;
router.route('/getListOfTraffics').get(AuthControl.requireAuthentication, getListOfTraffic);
router.route('/getPageCount/:pageSize').get(AuthControl.requireAuthentication, getPageCount);
router.route('/getPlatedPageCount/:pageSize').get(AuthControl.requireAuthentication, getPlatedPageCount);
router.route('/getUnPlatedPageCount/:pageSize').get(AuthControl.requireAuthentication, getUnPlatedPageCount);
router.route('/getTrafficPage/:pageNumber/:pageSize').get(AuthControl.requireAuthentication, getTrafficPage);
router.route('/getPlatedTrafficPage/:pageNumber/:pageSize').get(AuthControl.requireAuthentication, getPlatedTrafficPage);
router.route('/getUnPlatedTrafficPage/:pageNumber/:pageSize').get(AuthControl.requireAuthentication, getUnPlatedTrafficPage);
router.route('/getTrafficPageByPlate/:pageNumber/:pageSize/:plate').get(AuthControl.requireAuthentication, getTrafficPageByPlate);
router.route('/saveProfile/:firstName/:lastName/:nationalityCode/:plate/:currentId').get(AuthControl.requireAuthentication, saveProfile);
router.route('/getTrafficPageByDate/:fromDay/:fromMonth/:fromYear/:toDay/:toMonth/:toYear/:pageNumber/:pageSize').get(AuthControl.requireAuthentication, getTrafficPageByDate);
router.route('/getProfile/:plate').get(AuthControl.requireAuthentication, getProfile);
router.route('/getLastTraffic').get(AuthControl.requireAuthentication, getLastTraffic);
router.route('/getTrafficById/:trafficId').get(AuthControl.requireAuthentication, getTrafficById);
router.route('/getListOfImages/:trafficId').get(AuthControl.requireAuthentication, getListOfImages);
router.route('/getTrafficBetween/:start/:end').get(AuthControl.requireAuthentication, getTrafficBetween);
router.route('/getNextRecord/:currentId').get(AuthControl.requireAuthentication, getNextRecord);
router.route('/getLastRecord/:currentId').get(AuthControl.requireAuthentication, getLastRecord);
router.route('/getNextPlatedRecord/:currentId').get(AuthControl.requireAuthentication, getNextPlatedRecord);
router.route('/getLastPlatedRecord/:currentId').get(AuthControl.requireAuthentication, getLastPlatedRecord);
router.route('/getNextUnPlatedRecord/:currentId').get(AuthControl.requireAuthentication, getNextUnPlatedRecord);
router.route('/getLastUnPlatedRecord/:currentId').get(AuthControl.requireAuthentication, getLastUnPlatedRecord);
router.route('/getNextPlatedRecordByPlate/:currentId/:plate').get(AuthControl.requireAuthentication, getNextPlatedRecordByPlate);
router.route('/getLastPlatedRecordByPlate/:currentId/:plate').get(AuthControl.requireAuthentication, getLastPlatedRecordByPlate);
router.route('/updatePlate').post(AuthControl.requireAuthentication,updatePlate);
router.route('/getAutomaticPlated').get(AuthControl.requireAuthentication, getAutomaticPlated);
router.route('/getTotalPlated').get(AuthControl.requireAuthentication, getTotalPlated);
router.route('/inspectProfile').get(AuthControl.requireAuthentication, inspectProfile);
router.route('/searchTraffic/:plate').get(AuthControl.requireAuthentication, searchTraffic);
router.route('/getManualPlated').get(AuthControl.requireAuthentication, getManualPlated);
router.route('/getChangedPlate').get(AuthControl.requireAuthentication, getChangedPlateCount);
router.route('/getChangeLogs/:trafficId').get(getChangeLogs);
router.route('/getChangedRecords').get(getChangedRecords);