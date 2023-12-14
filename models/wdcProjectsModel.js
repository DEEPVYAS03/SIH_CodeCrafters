const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const wdcProjectsSchema = new Schema({
    project_name: {
        type: String,
        required: true
    },
    activities:[
        {
            type:String
        }
    ],
    project_start: {
        type: String
    },
    project_end: {
        type: String
    },
    state: {
        type: String
    },
    district: {
        type: String
    },
    village: {
        type: String
    },
    state_code: {
        type: Number
    },
    district_code: {
        type: Number
    },

    watershed_Committee: {
        type: String
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
}, { timestamps: true });

wdcProjectsSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Projects', wdcProjectsSchema);