const jwt = require("jsonwebtoken");
require('dotenv').config();

async function authenticateUser(req, res, next) {
    try {
        if(!req.headers.authorization){
            res.status(401).send({ "success": false, "status": 401, "message": "No token found."});
            return;
        }
        var authorization = req.headers.authorization.split(' ')[1],decoded;
        var decoded = jwt.verify(authorization, process.env.JWT_SECRET); 
        req.body.userid = decoded.userid;
        if(req.body.userid){
            next();
        }else{
            res.status(401).send({ "success": false, "status": 401, "message":"Unauthorized User."});
        }
    } catch(error) {
        res.status(400).send({ "success": false, "status": 401, "message": error.message});
    }
};

module.exports = authenticateUser