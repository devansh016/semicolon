const User = require("../models/userModel");
const Leaderboard = require("../models/leaderboardModel");

const { v4: uuidv4 } = require('uuid');

async function authenticate({ username, password }) {
    const user = await User.findOne({ username });
    if(user && user.verifyUserPassword(password)) {
        return {   
            "status": 200,
            "response": {
                "success": true,
                "user": user.getUserData(),
                "token": user.generateToken(),
                "message": "User Login Successfully."
            },
            "token": user.generateToken(), 
        };
    } else {
        return { 
            "success": false, 
            "status": 403, 
            "response": {
                "success": false,
                "message": "Wrong username/email or password."
            },
        };
    }
};

async function register({ username, name, email, password }) {
    if (await User.findOne({ email })) {
        return { 
            "status": 409, 
            "response": {
                "success": false,
                "message": "Email id " + email + " is already in use."
            }
        };
    } else if (await User.findOne({ username })) {
        return {
            "status": 409, 
            "response": {
                "success": false,
                "message": "Username " + username + " is already in use."
            }
        };
    }
    else {
        const user = new User({ username, name, email, password, userid: uuidv4() });
        await user.save();
        const leaderboard = new Leaderboard({
            "userid": user.userid,
            "username": username
        })
        await leaderboard.save()
        return {
            "status": 200, 
            "response": {
                "success": true,
                "message": "Account created successfully."
            }
        }
    }
};

async function changePassword ({ userid, password, newpassword }){
    const user = await User.findOne({ userid });
    if(user){
        if (user.verifyUserPassword(password)) {
            user.changePassword(newpassword);
            return {
                "status": 200, 
                "response": {
                    "success": true,
                    "message": "Password changed successfully."
                }
            }
        }
        else {
            return {
                "status": 401, 
                "response": {
                    "success": false,
                    "message": "Current Password Incorrect."
                }
            }
        }
    } else {
        return {
            "status": 404, 
            "response": {
                "success": false,
                "message": "User not found."
            }
        }
    }
};

module.exports ={
    authenticate,
    register,
    changePassword
}