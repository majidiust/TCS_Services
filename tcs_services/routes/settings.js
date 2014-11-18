/**
 * Created by Majid on 8/23/2014.
 */

var express = require('express');
var userModel = require("../models/user").UserModel;
var tokenModel = require("../models/token").TokenModel;
var settingsModel = require("../models/settings").SettingsModel;
var AuthControl = require("./users");
var jwt = require("jwt-simple");
var moment = require("moment");
var datejs = require("safe_datejs");
var shell = require('shelljs/global');
var network = require('network');

var router = express.Router();

function getSettings(req, res){
   settingsModel.find(function (err, settings) {
       if(err){
           res.json("Could not be find", 402);
       }
       if(!settings){
           res.json("Could not be find", 402);
       }
       else{
           console.log(settings[0]);
           res.json(settings[0]);
       }
   })
}

function setSettings(req, res){
    console.log("update profile");
    var conditions = {  }
        ,   options = { multi: true };
    var update = Object.create(null);
    for(var field in req.body){
        if (field.toString() != 'username' && field.toString() != 'password') {
            console.log(field + ":" + req.body[field]);
            update[field.toString()] = req.body[field];
        }
    }
    console.log(update);
    settingsModel.update(conditions, update, options, function (err, numAffected) {
        if (err) {
            console.log(err);
            res.send(err, 401);
        }
        else {
            console.log("Number of updated is : " + numAffected);
            res.send('Settings updated successfully', 201);
        }
    });
}

function resetServer(req, res)
{
    try
    {
	if (exec('sudo init 6').code !== 0) {
	    echo('Error: Git commit failed');
	    exit(1);
	}
    }
    catch(ex)
    {
	console.log(ex);
	res.send(ex, 500);
    }
}

function setNetworkSettings(req, res){
    try	{
	var ip = req.body.ip;
	var mask = req.body.mask;
	var gw = req.body.gateway;
	var cmd1 = "sudo ip addr add " + ip + " netmask  " + mask + " dev eth0";
	var cmd2 = "sudo ip link set dev eth0 up";
	var cmd3 = "sudo ip route add default via " + gw;
	if (exec(cmd1).code !== 0) {
	    res.send('faild to execute',500);
	}
	else{
	    if(exec(cmd2).code !== 0){
		res.send('error in restart network', 500);
	    }
	    else	
	    {
		if(exec(cmd3) !== 0){
		    res.send("error insetting the gw", 500);
		}
		else{
		    res.send("ip has been set successfully");
		}
	    }
	}
    }
    catch(ex){
	console.log(ex);
	res.send(ex, 500);	
    }
}


function getCurrentNetwork(req, res){
    try
    {
	network.get_active_interface(function(err,ip){
    	    res.json(ip);
	});
    }
    catch(ex)
    {
	console.log(ex);
	res.send(ex, 500);
    }
}

module.exports = router;
router.route('/getSettings').get( getSettings);
router.route('/setSettings').post(AuthControl.requireAuthentication, setSettings);
router.route('/resetServer').get(resetServer);
router.route('/setNetworkSetting').post(setNetworkSettings);
router.route('/getCurrentNetwork').get(getCurrentNetwork);