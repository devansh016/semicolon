const express = require("express");
const cookieParser = require('cookie-parser');
const app = express();
const database = require("./utils/database");
var cors = require('cors')
const port = process.env.PORT || 80;

// const winston = require('winston');
// const logConfiguration = {
//     'transports': [
//         new winston.transports.Console()
//     ]
// };
// const logger = winston.createLogger(logConfiguration);

app.use(cors({
    origin: '*'
}))
app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const probRoutes = require("./routes/problemRoutes");
app.use("/api/admin", probRoutes);

database.on("error", console.error.bind(console, "connection error: "));
database.once("open", function () {
    console.log("Database Connected successfully");
});

app.listen(port, function(){
    console.log("App is running at port " + port);
});