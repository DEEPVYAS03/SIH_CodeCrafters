const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminIncomeFormSchema = new Schema({
    schemaId:{
        type:Schema.Types.ObjectId
    },
    totalSubmissions:{
        type:Number
    },
    correctSubmissions:{
        type:Number
    },
    errorSubmissions:{
        type:Number
    }
},{timestamps:true})

module.exports = mongoose.model('AdminIncForm',adminIncomeFormSchema)