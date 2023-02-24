const express = require("express");
const app = express();
const database = require("./utils/database");
const port = process.env.PORT || 80;

// const winston = require('winston');
// const logConfiguration = {
//     'transports': [
//         new winston.transports.Console()
//     ]
// };
// const logger = winston.createLogger(logConfiguration);

app.use(express.json()); 
app.use(express.urlencoded({ extended: false }));

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

database.on("error", console.error.bind(console, "connection error: "));
database.once("open", function () {
    console.log("Database Connected successfully");
});

app.listen(port, function(){
    console.log("App is running at port " + port);
});