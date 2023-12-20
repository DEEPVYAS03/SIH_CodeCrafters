const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminUserSchema = new Schema({
    uid: {
        type: String,
        required: true
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String,
    },
    number: {
        type: String
    }
},{timestamps:true});

module.exports = mongoose.model('AdminUser', adminUserSchema);
