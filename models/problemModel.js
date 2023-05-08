const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const problemSchema = new Schema({
    code: {
        type: String, 
        unique: [true, "Problem code should be unique."], 
        required: [true, "Problem code required."]
    },
    name: {
        type: String, 
    },
    isVisible: {
        type: Boolean
    },
    statement: {
        type: String
    },
    description: {
        type: String, 
    },
    inputFormat: {
        type: String, 
    },
    outputFormat: {
        type: String, 
    },
    constraints: {
        type: String, 
    },
    sample:[{
        input: { type: String },
        output: { type: String }
    }],
    explanation: {
        type: String, 
    },
    difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard']
    },
    problemSetter: {
        type: String, 
    },
    timeLimit: {
        type: Number 
    },
    memoryLimit: {
        type: Number, 
    },
    tags: {
        type: [String], 
    },
    editorial: {
        type: String, 
    },
    createdDate: { 
        type: Date, 
        default: Date.now 
    }
});

problemSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret.id;
    }
});

module.exports = mongoose.model('Problems', problemSchema);