const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('dotenv').config();

const LeaderboardSchema = new Schema({
    userid : { 
        type: String, 
    },
    username: { 
        type: String, 
    },
    problemCodes: {
        type: Array
    },
    createdDate: { 
        type: Date, 
        default: Date.now 
    }
});

LeaderboardSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    // transform: function (doc, ret) {
    //     delete ret.id;
    // }
});

module.exports = mongoose.model('Leaderboard', LeaderboardSchema);