const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    number:{
        type:String,
        required:true
    },
    preference:[{
        type:String
    }],
    address:{
        state:{
            type:String,
            required:true
        },
        district:{
            type:String,
            required:true
        },
        village:{
            type:String,
            required:true
        }
    },
    presentIncome:{
        type:Number,
        required:true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
},{timestamps:true});

userSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('User',userSchema);