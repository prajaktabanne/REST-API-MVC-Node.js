const express = require("express");

const { connectMongoDB } = require("./connection");

const { loggerService } = require("./middleware");

const PORT = 8000;
const app = express();

const blogRouter = require("./routes/blogRouting.js");

//connect to mongoDB

connectMongoDB("mongodb://127.0.0.1:27017/reciBlogAppDB");

//middleware or plugin
app.use(express.urlencoded({ extended: false }));
app.use(loggerService("logs.txt"));

//route
app.use("/api/recipies", blogRouter);

app.listen(PORT, () => console.log("Server started!!!!"));
