const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchemSchema = new Schema({
    state:{
        type:String
    },
    district:{
        type:String
    },
    village:{
        type:String
    },
    projectName:{
        type:String
    },
    activities:[{
        type:String
    }],
    structure:{
        type:String
    }
},{timestamps:true})

module.exports = mongoose.model('ProjectSchema',projectSchemSchema)