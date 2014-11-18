/**
 * Created by Majid on 8/23/2014.
 */

var mongoose = require("mongoose");

var CameraSchema = new mongoose.Schema({
    FPS: { type: String },
    RTSPUrl: {type: String},
    IP : {type: String},
    Name : {type: String},
    Status : {type: Boolean},
    PanelUrl : {type: String},
    Role : {type: String}
}, { collection: 'cameras' });

var CameraModel = mongoose.model('cameras', CameraSchema);
module.exports.CameraModel = CameraModel;