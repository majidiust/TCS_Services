/**
 * Created by Majid on 8/23/2014.
 */

var mongoose = require("mongoose");
var datejs = require('safe_datejs');

var ChangeSchema = new mongoose.Schema({
    userId : { type: mongoose.Schema.ObjectId, ref:'users'},
    userName : {type:String},
    last   : { type: String},
    next   : { type: String},
    date   : { type:Date, default: (new Date()).AsDateJs()}		
});

var TrafficSchema = new mongoose.Schema({
    date: { type: String },
    time: { type: String},
    tics: {type: String},
    englishPlate : {type: String},
    persianPlate1: {type: String},
    persianPlate2: {type: String},
    detectedImage: {type: String},
    desc : {type: String},
    profile : {type:mongoose.Schema.ObjectId, ref:'profile'},
    changeLog : [ChangeSchema]
}, { collection: 'traffic' });

var TrafficModel = mongoose.model('traffic', TrafficSchema);
module.exports.TrfficModel = TrafficModel;/**
 * Created by Majid on 8/23/2014.
 */
