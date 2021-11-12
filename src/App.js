import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Feed from "./components/Feed";
import useStore from "./store";
import Signup from "./pages/Signup";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const user = useStore((s) => s.user);

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
    <div className="bg-gray-50 w-screen h-screen overflow-y-hidden overflow-x-hidden">
      <Header todo={todo} todos={todos} setTodo={setTodo} setTodos={setTodos} />

      {!user ? <Signup /> : <Feed todos={todos} setTodos={setTodos} />}
    </div>
  );
}

export default App;
