var request = require("request-promise");
const Leaderboard = require("../models/leaderboardModel");



async function leaderboard (){
    try {
        const leaderboard = await Leaderboard.find({},{ username: 1, createdDate: 1, problem_solved: { $size: "$problemCodes" }});
        leaderboard.sort(function(a, b) {
            return a.problem_solved - b.problem_solved;
        });
        return { 
            "status": 200, 
            response:{
                "success": true,
                leaderboard
            }
        }
    } catch(error) {
        console.log(error.message)
        return { 
            "status": 500, 
            response:{
                "success": false,
                message: "Internal Server Error."
            }
        }
    }
}



module.exports = {
    leaderboard
}