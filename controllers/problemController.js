const Problem = require("../models/problemModel");
const otpGenerator = require('otp-generator')

async function addProblem ({name,isVisible,description,inputFormat,outputFormat,constraints,sampleInput,sampleOutput,explanation,difficulty,problemSetter,timeLimit,memoryLimit,tags,editorial}) {
    try {
        const problemID = otpGenerator.generate(6, { lowerCaseAlphabets : false, specialChars: false, digits: false });
        const problem = new Problem({ problemID,name,isVisible,description,inputFormat,outputFormat,constraints,sampleInput,sampleOutput,explanation,difficulty,problemSetter,timeLimit,memoryLimit,tags,editorial })
        await problem.save();
        return { "success": true, "status": 200, "message": "Problem Added"};
    } catch(error) {
        console.log(error)
        return { "success": false, "status": 500, "message": "Internal Server Error." };
    }
}

async function getProblembyID ({ problemID }){
    try {
        const problem = await Problem.findOne({ problemID });
        return { "success": true, "status": 200, problem};
    } catch(error) {
        console.log(error)
        return { "success": false, "status": 500, "message": "Internal Server Error." };
    }
}

async function getProblem (){
    try {
        const problem = await Problem.find();
        return { "success": true, "status": 200, problem};
    } catch(error) {
        console.log(error)
        return { "success": false, "status": 500, "message": "Internal Server Error." };
    }
}

async function deleteProblembyID({ problemID }){
    try {
        const problem = await Problem.deleteOne({ problemID });
        return { "success": true, "status": 200, "message": "Problem deleted" };
    } catch(error) {
        console.log(error)
        return { "success": false, "status": 500, "message": "Internal Server Error." };
    }
}


module.exports ={
    addProblem,
    getProblembyID,
    deleteProblembyID,
    getProblem
}