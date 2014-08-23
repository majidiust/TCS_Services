/**
 * Created by Majid on 8/23/2014.
 */

var mongoose = require("mongoose");

var TrafficSchema = new mongoose.Schema({
    date: { type: String },
    time: { type: String},
    tics: {type: String}
}, { collection: 'traffic' });

var TrafficModel = mongoose.model('traffic', TrafficSchema);
module.exports.TrfficModel = TrafficModel;/**
 * Created by Majid on 8/23/2014.
 */
