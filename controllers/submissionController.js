var request = require("request-promise");
const Problem = require("../models/problemModel");
const Submission = require("../models/submissionModel");
const Leaderboard = require("../models/leaderboardModel");
var base64 = require("base-64");
var utf8 = require("utf8");
require("dotenv").config();

async function submitSolution({
  userid,
  source_code,
  language_id,
  problem_code,
}) {
  const checkAnswer = async ({ source_code, language_id, problem_code }) => {
    const options = {
      method: "POST",
      url:
        process.env.JUDGE_0_URL + "submissions/?base64_encoded=true&wait=true",
      headers: {
        "cache-control": "no-cache",
        "Content-Type": "application/json",
      },
      body: {
        source_code: base64.encode(utf8.encode(source_code)),
        language_id: language_id,
        number_of_runs: "1",
        stdin: "_fill",
        expected_output: "_fill",
      },
      json: true,
    };
    const tests = [];

    var problem = await Problem.findOne({ code: problem_code }, { sample: 1 });

    /**Attaching each sample test case */
    problem.sample.forEach((samplecase) => {
      options.body["stdin"] = base64.encode(utf8.encode(samplecase.input));
      options.body["expected_output"] = base64.encode(
        utf8.encode(samplecase.output)
      );
      tests.push(request(options));
    });

    const judge0Response = await Promise.all(tests);
    return judge0Response;
  };

  var results = await checkAnswer({ source_code, language_id, problem_code });

  // Code to attach this submissions data to user's account
  var tcs = [],
    verdict = "Accepted",
    time = 0,
    mem = 0,
    flag = false;
  let total_time = 0.0;
  let total_memory = 0;
  var ac = 0;
  for (i = 0; i < results.length; i++) {
    time = Math.max(time, results[i].time);
    mem = Math.max(mem, results[i].memory);
    if (flag === false && results[i].status.description !== "Accepted") {
      verdict = results[i].status.description;
      flag = true;
    } else {
      ac++;
      total_time = total_time + time;
      total_memory = total_memory + mem;
    }
    tcs.push({
      status: results[i].status.description,
      time: results[i].time,
      memory: results[i].memory,
    });
  }

  if (ac == results.length) {
    let submission = new Submission({
      userid,
      problem_code,
      verdict: "Accepted",
      time: total_time / results.length,
      memory: total_memory / results.length,
      success: true,
    });
    await submission.save();
    let leaderboard = await Leaderboard.findOne({ userid });
    if (leaderboard && !leaderboard.problemCodes.includes(problem_code)) {
      leaderboard.problemCodes.push(problem_code);
      await leaderboard.save();
    }

    return {
      status: 200,
      response: {
        success: true,
        verdict: "Accepted",
        verdict: "Accepted",
        time: total_time / results.length,
        memory: total_memory / results.length,
        message: "Testcases Passed: " + ac + "/" + results.length,
      },
    };
  } else {
    let submission = new Submission({
      userid,
      problem_code,
      verdict: "Rejected",
      time: total_time / results.length,
      memory: total_memory / results.length,
      success: false,
    });
    await submission.save();
    return {
      status: 200,
      response: {
        success: true,
        verdict: "Rejected",
        time: total_time / results.length,
        memory: total_memory / results.length,
        message: "Testcases Passed: " + ac + "/" + results.length,
      },
    };
  }
}

module.exports = {
  // submit_solution,
  submitSolution,
};
