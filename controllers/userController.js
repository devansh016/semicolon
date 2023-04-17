const User = require("../models/userModel");
const { v4: uuidv4 } = require('uuid');

async function update_profile({ userid, profile }) {
    const user = await User.findOne({ userid });
    if(user) {
        
        return { "status": 200, "user": user.getUserData(), "token": user.generateToken(), "message": "Login Sucess" };
    } else {
        return { "status": 403, "message": "Can't update user profile." };
    }
};

async function get_profile({ userid }) {
    if (await User.findOne({ email })) {
        return { "success": false, "status": 409, "message": "Email id " + email + " is already in use." }
    } else if (await User.findOne({ username })) {
        return { "success": false, "status": 409, "message": "Username " + username + " is already in use." }
    }
    else {
        const user = new User({ username, name, email, password, userid: uuidv4() });
        await user.save();
        return { "success": true, "status": 200, "message": "Account Created."};
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