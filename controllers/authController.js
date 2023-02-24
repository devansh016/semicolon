const User = require("../models/userModel");
const { v4: uuidv4 } = require('uuid');

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if(user && user.verifyUserPassword(password)) {
        return { "status": 200, "token": user.generateToken() };
    } else {
        return { "status": 403, "message": "Wrong username/email or password." };
    }
};

async function register({ username, name, email, password }) {
    if (await User.findOne({ email })) {
        return { "success": false, "status": 409, "message": "Email id " + email + " is already in use." }
    } else if (await User.findOne({ username })) {
        return { "success": false, "status": 409, "message": "Username " + username + " is already in use." }
    }
    else {
        const user = new User({ username, name, email, password, userid: uuidv4() });
        await user.save();
        return { "success": true, "status": 200, "token": "Bearer "+ user.generateToken() };
    }
};

async function changePassword ({ userid, password, newpassword }){
    const user = await User.findOne({ userid });
    if(user){
        if (user.verifyUserPassword(password)) {
            user.changePassword(newpassword);
            return { "success": true, "status": 200, "message": "Password changed." }
        }
        else {
            return { "success": false, "status": 401, "message": "Current password incorrect." }
        }
    } else {
        return {  "success": false, "status": 500, "message": "Internal Server Error!" }
    }
};

module.exports ={
    authenticate,
    register,
    changePassword
}