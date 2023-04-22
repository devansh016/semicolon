const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const database = require("./utils/database");
var cors = require('cors')
const port = process.env.PORT || 80;

app.use(cors({
    origin: '*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}))

app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

app.use(function (req, res, next) {
    console.log(req.body)
    console.log(req.method)
    next()
})

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