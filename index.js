const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const database = require("./utils/database");
var cors = require('cors')
const port = process.env.PORT || 80;

app.use(cors({
    origin: '*'
}))
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
});
app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

const probRoutes = require("./routes/problemRoutes");
app.use("/api/admin", probRoutes);

database.on("error", console.error.bind(console, "connection error: "));
database.once("open", function () {
    console.log("Database Connected successfully");
});

app.listen(port, function(){
    console.log("App is running at port " + port);
});