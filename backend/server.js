const { configDotenv } = require("dotenv");
const colors = require("colors")
const express = require("express");
const cors = require("cors")
const app = express();
const { connectDB } = require('./configs/db.js');
const {ToDo} = require("./models/todoModel.js")
const {todoRoute} = require("./routes/todoRoute.js")


//configure env
configDotenv();
connectDB();

//port
const PORT = process.env.PORT || 8080;
//middelware
app.use(cors());
app.use(express.json())





app.use("/todo",todoRoute)


//rest api
app.get("/", (req, res) => {
  res.send("server is on 8080 amit giri ji ");
});

//run listen
app.listen(PORT, () => {
  console.log(`server running on ${process.env.DEV_MODE} mode on port : ${PORT}`.bgCyan.green);
});
// mongodb+srv://amitgiri:amit72@cluster0.rpo6kk7.mongodb.net/ecommerce

// mongodb+srv://amitgiri:<password>@cluster0.rpo6kk7.mongodb.net/