import {
  HomeIcon,
  LoginIcon,
  LogoutIcon,
  MenuIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";
import { useEffect, useRef } from "react";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import shallow from "zustand/shallow";
import { logoutUser } from "../firebase";
import useStore from "../store";
import toast from "react-hot-toast";
import { Outlet } from "react-router-dom"


const Header = ({ todo, todos, setTodo, setTodos }) => {
  const [user, resetUser] = useStore((s) => [s.user, s.resetUser], shallow);
  let navigate = useNavigate();
  const inputRef = useRef(null);
  

  useEffect(() => {
    if (user) {
      inputRef.current.focus();
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (todo !== "") {
      const newTodo = {
        id: new Date().getTime(),
        text: todo,
        completed: false,
      };
      setTodos([...todos].concat(newTodo));
      setTodo("");
    }
  };

  const mutation = useMutation(logoutUser, {
    onSuccess: () => {
      resetUser();
      navigate("/login", {replace: true});
      toast.success("Logged out", {
        icon: "👋",
      });
    },
    onError: () => {
      toast.error("Error logging out");
    },
  });

  return (
    <div className="bg-gray-50 w-screen h-screen overflow-y-hidden overflow-x-hidden">

    <div className="shadow-sm border-b bg-white sticky py-3 top-0 z-50">
      <div className="flex justify-between max-w-4xl mx-5 sm:mx-10 lg:mx-auto">
        {/* left */}
        <Link to="/">
          <div className="flex items-center space-x-2 cursor-pointer">
            <img
              className="h-9 w-9 bg-white object-contain"
              src="https://chris-risner-portfolio.herokuapp.com/api/shorturl/s_LJchmX"
              alt=""
            />
          </div>
        </Link>
        {user && (
          <form className="max-w-xs" onSubmit={handleSubmit}>
            <div className="relative px-3 rounded-md">
              <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                <PlusCircleIcon className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="text"
                value={todo}
                className="bg-blue-50 block w-full py-2 pl-10 text-gray-600 font-semibold sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md "
                placeholder="Add a todo..."
                onChange={(e) => setTodo(e.target.value)}
                ref={inputRef}
              />
            </div>
            <button className="hidden" type="submit">
              Add Todo
            </button>
          </form>
        )}

        {/* right */}
        <div className="flex items-center justify-end space-x-5">
          <MenuIcon className="text-gray-600 h-6 sm:inline-flex md:hidden cursor-pointer hover:scale-125 transition-all transform duration-150 ease-out" />
          <Link to="/">
            <HomeIcon className="navBtn" />
          </Link>
          {user ? (
            <Link to="/login">
              <LogoutIcon onClick={mutation.mutate} className="navBtn" />
            </Link>
          ) : (
            <Link to="/login">
              <LoginIcon className="navBtn" />
            </Link>
          )}
        </div>
      </div>
      </div>
            <Outlet />
      </div>
  );
};

export default Header;
