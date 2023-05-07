const express = require("express");
const router = express.Router();
const leaderboardContoller = require("../controllers/leaderboardController");

router.get("/", leaderboard);

function leaderboard(req, res, next){
    leaderboardContoller.leaderboard(req.body)
        .then( data => {
            res.status(data.status).send(data.response);
        })
};

module.exports = router