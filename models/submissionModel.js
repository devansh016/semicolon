const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('dotenv').config();

const SubmissionSchema = new Schema({
    userid : { 
        type: String, 
    },
    problem_code: { 
        type: String, 
    },
    verdict: {
        type: String,
        enum: ['Accepted', 'Rejected']
    },
    time: {
        type: Number
    },
    memory : {
        type: Number,
    },
    success: {
        type: Boolean
    },
    createdDate: { 
        type: Date, 
        default: Date.now 
    }
});

SubmissionSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    // transform: function (doc, ret) {
    //     delete ret.id;
    // }
});

module.exports = mongoose.model('Submission', SubmissionSchema);