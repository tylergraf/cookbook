var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

var categorySchema = new Schema({
    created: Date,
    updated: Date,
    name: String,
    _id: String
});


module.exports = mongoose.model('Categories', categorySchema);