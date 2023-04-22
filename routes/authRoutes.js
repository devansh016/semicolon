const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authenticateUser = require("../middleware/auth");

router.post("/signin", signinUser);
router.post("/signup", signupUser);
router.patch("/changepassword", authenticateUser, changePassword);

function signinUser(req, res, next){
    authController.authenticate(req.body)
        .then( data => {
            res.status(data.status).cookie('token', data.token, {
                secure: true,
                httpOnly: true,
                sameSite: 'None'
            }).send(data.response);
        })
};

function signupUser(req, res, next){
    authController.register(req.body)
        .then( data => {
            res.status(data.status).send(data.response);
        })
};

function changePassword(req, res, next){
    authController.changePassword(req.body)
        .then( data => {
            res.status(data.status).send(data.response);
        })
};

module.exports = router