const express = require("express");
const router = express.Router();
const submissionContoller = require("../controllers/submissionController");
const authenticateUser = require("../middleware/auth");

router.post("/", authenticateUser, submit_solution);


function submit_solution(req, res, next){
    submissionContoller.submitSolution(req.body)
        .then( data => {
            res.status(data.status).send(data.response);
        })
};

module.exports = router