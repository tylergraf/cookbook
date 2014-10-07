var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var categorySchema = new Schema({
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now},
    name: String,
    slug: String,
    id: ObjectId
});


module.exports = mongoose.model('Categories', categorySchema);
