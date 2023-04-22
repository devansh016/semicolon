const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateUser = require("../middleware/auth");

router.get("/", authenticateUser, get_profile);
router.post("/", authenticateUser, update_profile);
router.delete("/", authenticateUser, delete_user);


function get_profile(req, res, next){
    userController.get_profile(req.body)
        .then( data => {
            res.status(data.status).send(data.response);
        })
};

function update_profile(req, res, next){
    userController.update_profile(req.body)
        .then( data => {
            res.status(data.status).send(data.response);
        })
};

function delete_user(req, res, next){
    userController.delete_user(req.body)
        .then( data => {
            res.status(data.status).send(data.response);
        })
};

module.exports = router