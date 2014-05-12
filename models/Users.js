var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    id: ObjectId,
    facebookId: String,
    name: String,
    avatar: String,
    email: String,
    password: String
});


module.exports = mongoose.model('Users', userSchema);
