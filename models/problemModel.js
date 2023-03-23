const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const problemSchema = new Schema({
    problemID: {
        type: String, 
        unique: true, 
        required: true
    },
    name: {
        type: String, 
    },
    isVisible: {
        type: Boolean
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
    sampleInput: {
        type: String, 
    },
    sampleOutput: {
        type: String, 
    },
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