import "./App.css";
import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Feed from "./components/Feed";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  useEffect(() => {
    const temp = localStorage.getItem("todos");
    const loadTodos = JSON.parse(temp);

    if (loadTodos) {
      setTodos(loadTodos);
    }
  }, []);

  useEffect(() => {
    const local = JSON.stringify(todos);
    localStorage.setItem("todos", local);
  }, [todos]);


  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll">
      <Header todo={todo} todos={todos} setTodo={setTodo} setTodos={setTodos} />
      <Feed todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
