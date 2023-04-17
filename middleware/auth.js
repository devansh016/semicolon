const jwt = require("jsonwebtoken");
require('dotenv').config();

async function authenticateUser(req, res, next) {
    try {
        const client_jwt_token = req.cookies.token

        if(!client_jwt_token) {
            res.status(401).send({ "success": false, "message": "JWT token not found."});
            return
        }
        var decoded = jwt.verify(client_jwt_token, process.env.JWT_SECRET); 
        req.body.userid = decoded.userid;
        if(req.body.userid){
            next();
        }else{
            res.status(401).send({ "success": false, "message":"Unauthorized User."});
        }
    } catch(error) {
        res.status(400).send({ "success": false,"message": error.message});
    }
};

module.exports = authenticateUser