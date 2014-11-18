/**
 * Created by Majid on 8/23/2014.
 */

var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ProfileSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String},
    nationalityCode: {type: String},
    plate: {type:String},
    traffics :   [{type:Schema.ObjectId, ref:'traffic'}]
}, { collection: 'profile' });

var ProfileModel = mongoose.model('profile', ProfileSchema);
module.exports.ProfileModel = ProfileModel;/**
 * Created by Majid on 8/23/2014.
 */
