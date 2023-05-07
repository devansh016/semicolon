var request = require("request-promise");
const Problem = require("../models/problemModel");
const Submission =  require("../models/submissionModel")
var base64 = require('base-64');
var utf8 = require('utf8');


async function submitSolution({userid, source_code, language_id, problem_code}){

    const checkAnswer = async ({source_code, language_id, problem_code }) => {
        const options = {
            "method": "POST",
            "url": "http://64.227.134.248/submissions/?base64_encoded=true&wait=true",
            "headers": {
                "cache-control": "no-cache",
                "Content-Type": "application/json"
            },
            "body": {
                "source_code": base64.encode(utf8.encode(source_code)),
                "language_id": language_id,
                "number_of_runs": "1",
                "stdin": "_fill",
                "expected_output": "_fill",
            },
            "json": true
        };
        const tests = [];

        var problem = await Problem.findOne({ "code": problem_code }, {sample: 1});

        /**Attaching each sample test case */
        problem.sample.forEach((samplecase) => {
            options.body['stdin'] = base64.encode(utf8.encode(samplecase.input));
            options.body['expected_output'] = base64.encode(utf8.encode(samplecase.output));
            tests.push(request(options));
        });

        const judge0Response = await Promise.all(tests);
        console.log(judge0Response)
        return judge0Response;
    }

    var results = await checkAnswer({source_code, language_id, problem_code});

    // Code to attach this submissions data to user's account
    var tcs = [], verdict = 'Accepted', time = 0, mem = 0, flag = false;
    let total_time = 0.0
    let total_memory = 0
    var ac = 0;
    for (i = 0; i < results.length; i++) {
        time = Math.max(time, results[i].time);
        mem = Math.max(mem, results[i].memory);
        if (flag === false && results[i].status.description !== 'Accepted') {
            verdict = results[i].status.description;
            flag = true;
        }
        else {
            ac++;
            total_time = total_time + time;
            total_memory = total_memory + mem;
        }
        tcs.push({
            status: results[i].status.description,
            time: results[i].time,
            memory: results[i].memory
        });
    }

    if(ac==results.length){
        
        let submission = new Submission({
            userid,
            problem_code,
            "verdict": "Accepted",
            "time": total_time/results.length,
            "memory": total_memory/results.length,
            "success": true,
        })
        await submission.save()
        return {
            "status": 200, 
            "response": {
                "success": true,
                "verdict": "Accepted",
                "verdict": "Accepted",
                "time": total_time/results.length,
                "memory": total_memory/results.length,
                "message": "Testcases Passed: " +ac+"/"+results.length,
            }
        }
    } else {
        let submission = new Submission({
            userid,
            problem_code,
            "verdict": "Rejected",
            "time": total_time/results.length,
            "memory": total_memory/results.length,
            "success": false,
        })
        await submission.save()
        return {
            "status": 200, 
            "response": {
                "success": true,
                "verdict": "Rejected",
                "time": total_time/results.length,
                "memory": total_memory/results.length,
                "message": "Testcases Passed: " +ac+"/"+results.length,
            }
        }
    }
    
};





// async function run_testcases({source_code, language_id, problem_code}){

//     var problem = await Problem.findOne({ "code": problem_code }, {sample: 1});
//     let accepted = 0;
//     let total_sample_cases = sample.length;

//     // Running Each Sample Case
//     problem.sample.forEach(sample => {
//         const input = htmlToText(sample.input, { wordwrap: null, preserveNewlines: true});
//         const output = htmlToText(sample.output, { wordwrap: null, preserveNewlines: true});

//         let data = JSON.stringify({
//             "source_code": base64.encode(utf8.encode(source_code)),
//             "language_id": language_id,
//             "number_of_runs": "1",
//             "stdin": base64.encode(utf8.encode(input)),
//             "expected_output": base64.encode(utf8.encode(output)),
//         });

//         let config = {
//             method: 'post',
//             maxBodyLength: Infinity,
//             url: 'http://64.227.134.248/submissions/?base64_encoded=true&wait=true',
//             headers: { 
//               'Content-Type': 'application/json'
//             },
//             data : data
//         };
          
//         axios.request(config)
//           .then((response) => {
//             if(response.data.status.id==3)
//                 accepted++;
//           })
//           .catch((error) => {
//             console.log(error);
//           }); 
//     });

// }


// async function submit_solution({source_code, language_id, problem_code}){
    
//     console.log(accepted)
//     if(rejected==0)
//         return {
//             "status": 200, 
//             "response": {
//                 "success": true,
//                 "message": "Submission Accepted."
//             }
//         }
//     else {
//         return {
//             "status": 200, 
//             "response": {
//                 "success": true,
//                 "message": "Wrong Submission."
//             }
//         }
//     }
// }

module.exports = {
    // submit_solution,
    submitSolution
}