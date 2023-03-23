const express = require("express");
const router = express.Router();
const problemController = require("../controllers/problemController");
const authenticateUser = require("../middleware/auth");

router.post("/problem", addproblem);
router.get("/problem", getProblem);
router.get("/problem/:problemID", getProblembyID);
router.delete("/problem", deleteProblembyID);

function deleteProblembyID(req, res, next){
    problemController.deleteProblembyID(req.params)
        .then( data => {
            res.status(data.status).send(data);
        })
};

function getProblembyID(req, res, next){
    problemController.getProblembyID(req.params)
        .then( data => {
            res.status(data.status).send(data);
        })
};

function getProblem(req, res, next){
    problemController.getProblem()
        .then( data => {
            res.status(data.status).send(data);
        })
};

function addproblem(req, res, next){
    problemController.addProblem(req.body)
        .then( data => {
            res.status(data.status).send(data);
        })
};

module.exports = router