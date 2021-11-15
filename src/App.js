import React from "react";
import { Route, Routes } from "react-router-dom";
import Feed from "./components/Feed";
import Header from "./components/Header";
import { useAuthUser } from "./firebase";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import useStore from "./store";

function App() {
  const user = useStore((s) => s.user);

  useAuthUser();

  return (
    <Routes>
      <Route element={<Header />}>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        {user && <Route path="feed" element={<Feed />} />}
      </Route>
    </Routes>
  );
}

export default App;
