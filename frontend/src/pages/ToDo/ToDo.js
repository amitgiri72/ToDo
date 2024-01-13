import axios from "axios";
import React, { useEffect, useState } from "react";
import "./ToDo.css";
import toast from "react-hot-toast";

const ToDo = () => {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState([]);
  // const [iscompleted,setIsCompleted] = useState(false);

  const createTodo = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "https://todo-69nw.onrender.com/todo/create-todo",
        { task, completed: false }
      );
      if (data?.success) {
        toast(data.message);
        setTask("");
        // window.location.reload();
        getTodo();
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error);
      toast("something went wrong");
    }
  };

  const getTodo = async () => {
    try {
      let { data } = await axios.get("https://todo-69nw.onrender.com/todo/show-todos");
      if (data?.success) {
        // console.log(data.todo);
        // toast(data.message);
        setTodos(data?.todo);
      } else {
        toast(data.message);
      }
    } catch (error) {
      console.log(error);
      toast("something went wrong");
    }
  };

  const updateTodo = async (id, completed) => {
    //write code for update todo
    try {
      let { data } = await axios.put(
        `https://todo-69nw.onrender.com/todo/update-todo/${id}`,
        { completed: !completed }
      );
      if (data.success) {
        if(completed!==true){
        toast("Task completed");}
        else{
          toast("Task is now active");
        }
        getTodo();
      } else {
        toast(data.message);
      }
    } catch (error) {
      console.error(error);
      toast("something went wrong while updating todo");
    }
  };
  const deleteTodo = async (id) => {
    let confirmation = window.confirm("Are you sure to delete this task?");
    if (confirmation === true) {
      try {
        let { data } = await axios.delete(
          `https://todo-69nw.onrender.com/todo/delete-todo/${id}`
        );
        if (data.success) {
          toast(data.message);
          getTodo();
        }
      } catch (error) {
        console.log(error);
        toast("Error while deleting task");
      }
    }
  };
  useEffect(() => {
    getTodo();
  }, []);
  return (
    <div className="main">
      <h1 className="heading1">Todos</h1>
      <div className="create">
        <h1>Create Todo</h1>
        <form onSubmit={createTodo}>
          <input
            type="text"
            placeholder="Enter a Task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button className="button" data-text="Submit">
            <span className="actual-text">&nbsp;Submit&nbsp;</span>
            <span aria-hidden="true" className="hover-text">
              &nbsp;Submit&nbsp;
            </span>
          </button>
        </form>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => updateTodo(todo._id, todo.completed)}
            ></input>
            <span
              style={todo.completed ? { color: "green" } : { color: "red" }}
            >
              {todo.task}{" "}
            </span>
            <button className="btn" onClick={() => deleteTodo(todo._id)}>Delete</button>
            {/* <button onClick={()=> setIsCompleted(!iscompleted)} >Mark as completed</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDo;
