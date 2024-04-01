const mongoose = require('mongoose');
const User = require("../models/userModel")
const Projects = require("../models/wdcProjectsModel")
const Schema = mongoose.Schema;

const incomeSchema = new Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    projectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Projects'
    },
    month:{
        type: String,
        required: true
    },
    year:{
        type: String,
        required: true
    },
    activityIncome:[{
        activity:{
            type: String
        },
        income:{
            type:Number
        }
    }]
},{timestamps:true})

module.exports = mongoose.model('UserIncome',incomeSchema)
