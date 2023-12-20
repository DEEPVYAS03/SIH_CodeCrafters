const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userIncomeSchema = new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    schemaId:{
        type:Schema.Types.ObjectId,
        ref:'ProjectSchema'
    },
    month:{
        type:String
    },
    year:{
        type:String
    },
    income:[{
        activity:{
            type:String
        },
        projectName:{
            type:String
        },
        projectId:{
            type:Schema.Types.ObjectId,
            ref:'Projects',
        },
        amount:{
            type:Number
        }
        // ,
        // landUsed: {
        //     type: String,
        //     required: function () {
        //         return this.activity === 'agriculture';
        //     }
        // }
    }]
},{timestamps:true},{strict:false})

module.exports = mongoose.model('incomeForm',userIncomeSchema);