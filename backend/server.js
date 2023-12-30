const { configDotenv } = require("dotenv");
const colors = require("colors")
const express = require("express");
const app = express();

//configure env
configDotenv();

//port
const PORT = process.env.PORT || 8080;
//middelware
app.use(express.json())


let todoArray = [];
// console.log(todoArray["task"])
app.post("/create-todo", (req, res) => {
  const task = {
    taskname:req.body.taskname,
    time: req.body.time,
  }
  todoArray.push(task);
  res.json({message:'data added'});
  console.log("todo array"+ todoArray)
    
})
app.get("/show-tasks", (req,res)=>{
  res.json(todoArray);
  
  todoArray.forEach((task,index) => {
    console.log(`Task ${index + 1}:`);
    console.log(`Task Name: ${task.taskname}`);
    console.log(`Time: ${task.time}`);
    console.log('------------------------');
  });
    
  });

console.log(todoArray)
//rest api
app.get("/", (req, res) => {
  res.send("server is on 8080 amit giri ji ");
});

//run listen
app.listen(PORT, () => {
  console.log(`server running on ${process.env.DEV_MODE} mode on port : ${PORT}`.bgCyan.green);
});
