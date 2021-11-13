import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Feed from "./components/Feed";
import useStore from "./store";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useAuthUser } from "./firebase";
import { Routes, Route } from "react-router-dom";

function App() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");
  const user = useStore((s) => s.user);

  useAuthUser();

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
    <Routes>
      <Route
        element={<Header />}
        todo={todo}
        todos={todos}
        setTodo={setTodo}
        setTodos={setTodos}>
        <Route index path="/" element={<Signup />} />
        <Route path="login" element={<Login />} />
        {user && <Route path="feed" element={<Feed todos={todos} setTodos={setTodos} />} />}
      </Route>
    </Routes>
  );
}

export default App;
