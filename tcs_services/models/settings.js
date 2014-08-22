/**
 * Created by Majid on 8/23/2014.
 */

var mongoose = require("mongoose");

var SettingsSchema = new mongoose.Schema({
    FPS: { type: String },
    baudRate: { type: String},
    ReTryOpenSerialPort: {type: String},
    RTSPUrl: {type: String},
    StopRTSPThr: {type: String}
}, { collection: 'settings' });

var SettingsModel = mongoose.model('settings', SettingsSchema);
module.exports.SettingsModel = SettingsModel;