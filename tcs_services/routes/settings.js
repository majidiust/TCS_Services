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

module.exports = router;
router.route('/getSettings').get(AuthControl.requireAuthentication, getSettings);
router.route('/setSettings').post(AuthControl.requireAuthentication, setSettings);

