const Problem = require("../models/problemModel");

async function addProblem ({code,name,isVisible,description,inputFormat,outputFormat,constraints,sample,explanation,difficulty,problemSetter,timeLimit,memoryLimit,tags,editorial}) {
    try {
        const prob = await Problem.findOne({"code": code})
        if(prob){
            return {
                "status": 409,
                "response": {
                    "success": false,
                    "message": "Problem code not unique.",
                }
                
            }
        }
        const problem = new Problem({code,name,isVisible,description,inputFormat,outputFormat,constraints,sample,explanation,difficulty,problemSetter,timeLimit,memoryLimit,tags,editorial })
        await problem.save();
        return {
            "status": 200,
            "response": {
                "success": true,
                "message": "Problem added successfully.",
            }
        }
    } catch(error) {
        return {
            "status": 500,
            "response": {
                "success": false,
                "message": "Internal Server Error.",
            }
        }
    }
}

async function getProblembyID ({code}){
    try {
        const problem = await Problem.findOne({ code }, {_id: 0});
        return { 
            "status": 200, 
            response:{
                "success": true,
                problem
            }
        }
    } catch(error) {
        return { 
            "status": 500, 
            response:{
                "success": false,
                message: "Internal Server Error."
            }
        }
    }
}

async function getProblem (){
    try {
        const problem = await Problem.find({},{_id: 0, code: 1, name: 1, difficulty: 1, tags: 1});
        return { 
            "status": 200, 
            response:{
                "success": true,
                problem
            }
        }
    } catch(error) {
        return { 
            "status": 500, 
            response:{
                "success": false,
                message: "Internal Server Error."
            }
        }
    }
}

async function deleteProblembyID({ code }){
    try {
        const problem = await Problem.deleteOne({ code });
        return { 
            "status": 200, 
            response:{
                "success": true,
                message: "Problem Deleted."
            }
        }
    } catch(error) {
        return { 
            "status": 500, 
            response:{
                "success": false,
                message: "Internal Server Error."
            }
        }
    }
}

module.exports ={
    addProblem,
    getProblembyID,
    deleteProblembyID,
    getProblem
}