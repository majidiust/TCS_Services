/**
 * Created by Majid on 8/23/2014.
 */

var express = require('express');
var userModel = require("../models/user").UserModel;
var tokenModel = require("../models/token").TokenModel;
var trafficModel = require("../models/traffic").TrfficModel;
var profileModel = require("../models/profile").ProfileModel;
var cameraModel = require("../models/camera").CameraModel;
var AuthControl = require("./users");
var jwt = require("jwt-simple");
var moment = require("moment");
var datejs = require("safe_datejs");
var fs = require("fs");
var dir = require("node-dir");
var jalali_moment = require("moment-jalaali");
var router = express.Router();

function getListOfCameras(req, res){
    try{
        cameraModel.find(function(err, cameras){
            if(err){
                res.send(err, 500);
                console.log(err);
            }
            else{
                res.send(cameras);
            }
        });
    }
    catch(ex){
        console.log(ex);
        res.send(ex, 500);
    }
}

function addNewCamera(req, res){
    try{
        console.log("add new camera");
        var camera = new cameraModel({
            FPS: req.body.FPS,
            RTSPUrl: req.body.RTSPUrl,
            IP: req.body.IP,
            Name: req.body.Name,
            Status: true,
            PanelUrl: req.body.PanelUrl,
            Role: req.body.Role
        });
        console.log(camera);
        camera.save(function (err) {
            if (err)
                res.send(err, 401);
            else
                res.json({message: 'camera added to database successfully', cameraId: camera.id});
        });
    }
    catch(ex){
        console.log(ex);
        res.send(ex, 500);
    }
}

function changeCameraStatus(req, res){
    try{
       cameraModel.findOne({'_id':req.body.cameraId}, function(err, camera){
           if(err){
               console.log(err);
               res.send(err, 500);
           }
           else if(camera){
               camera.Status = !camera.Status;
               camera.save(null);
               res.send("ok");
           }
           else{
               res.send('Not found', 406);
           }
       });
    }
    catch(ex){
        console.log(ex);
        res.send(ex, 500);
    }
}

function removeCamera(req, res){
    try{
        cameraModel.remove({'_id':req.body.cameraId}, function(err){
            if(err){
                console.log(err);
                res.send(err, 500);
            }
            else{
                res.send("ok");
            }
        });
    }
    catch(ex){
        console.log(ex);
        res.send(ex, 500);
    }
}

module.exports = router;
router.route('/getListOfCameras').get(getListOfCameras);
router.route('/addNewCamera').post(addNewCamera);
router.route('/changeCameraStatus').post(changeCameraStatus);
router.route('/deleteCamera').post(removeCamera);

