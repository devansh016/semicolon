const axios = require('axios');
const { htmlToText } = require('html-to-text');
const Problem = require("../models/problemModel");


async function submit_solution({source_code, language_id, problem_code}){
    var problem = await Problem.findOne({ "code": problem_code }, {sample: 1});

    
    problem.sample.forEach(sample => {
        const input = htmlToText(sample.input, { wordwrap: null, preserveNewlines: true});
        const output = htmlToText(sample.output, { wordwrap: null, preserveNewlines: true});

        let data = JSON.stringify({
            source_code, language_id,
            "number_of_runs": "1",
            "stdin": "SnVkZ2Uw",
            "expected_output": null,
          });
          
        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://64.227.134.248/submissions/?base64_encoded=true&wait=true',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
        };
          
        axios.request(config)
          .then((response) => {
            console.log(JSON.stringify(response.data));
          })
          .catch((error) => {
            console.log(error);
          });
    });



    return {
        "status": 200, 
        "response": {
            "success": true,
            "message": "User not found."
        }
    }
}

module.exports = {
    submit_solution
}