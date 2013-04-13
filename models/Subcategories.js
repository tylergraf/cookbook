var mongoose = require('mongoose')
    ,Schema = mongoose.Schema;

var subcategorySchema = new Schema({
    created: Date,
    updated: Date,
    name: String,
    category_id: String,
    _id: String
});


module.exports = mongoose.model('Subcategories', subcategorySchema);