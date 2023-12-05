const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const database = require("./utils/database");
var cors = require("cors");
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api/user", userRoutes);

const probRoutes = require("./routes/problemRoutes");
app.use("/api/admin", probRoutes);

const submissionRoutes = require("./routes/submissionRoutes");
app.use("/api/submission", submissionRoutes);

const leaderboardRoutes = require("./routes/leaderboardRoutes");
app.use("/api/leaderboard", leaderboardRoutes);

database.on("error", console.error.bind(console, "connection error: "));
database.once("open", function () {
  console.log("Database Connected successfully");
});

app.listen(port, function () {
  console.log("App is running at port " + port);
});
