import { MenuIcon, PlusCircleIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "react-query";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import shallow from "zustand/shallow";
import { createTodo, getTimestamp, logoutUser } from "../firebase";
import useStore from "../store";

const Header = () => {
  const [user, resetUser] = useStore((s) => [s.user, s.resetUser], shallow);
  let navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const queryClient = useQueryClient();

  const change = useMutation(createTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
      reset();
      toast.success("Todo Added", {
        icon: "👍",
      });
    },
  });

  const onSubmit = ({ todo }) => {
    change.mutate({
      todo,
      completed: false,
      created: getTimestamp(),
      user: { uid: user.uid, username: user.username },
    });
  };

  const mutation = useMutation(logoutUser, {
    onSuccess: () => {
      resetUser();
      navigate("/", { replace: true });
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
          {user ? (
            <Link to="/feed">
              <div className="flex items-center space-x-2 cursor-pointer">
                <img
                  className="h-9 w-9 bg-white object-contain"
                  src="https://chris-risner-portfolio.herokuapp.com/api/shorturl/s_LJchmX"
                  alt=""
                />
              </div>
            </Link>
          ) : (
            <Link to="/">
              <div className="flex items-center space-x-2 cursor-pointer">
                <img
                  className="h-9 w-9 bg-white object-contain"
                  src="https://chris-risner-portfolio.herokuapp.com/api/shorturl/s_LJchmX"
                  alt=""
                />
              </div>
            </Link>
          )}

          {user && (
            <form className="max-w-xs" onSubmit={handleSubmit(onSubmit)}>
              <div className="relative px-3 rounded-md">
                <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                  <PlusCircleIcon className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  {...register("todo")}
                  type="text"
                  className="bg-blue-50 block w-full py-2 pl-10 text-gray-600 font-semibold sm:text-sm border-gray-300 focus:ring-black focus:border-black rounded-md "
                  placeholder="Add a todo..."
                />
              </div>
              <button className="hidden" type="submit">
                Add Todo
              </button>
            </form>
          )}

          {/* right */}
          <div className="flex items-center justify-end space-x-5">
            {user && (
              <MenuIcon className="text-gray-600 h-6 sm:inline-flex md:hidden cursor-pointer hover:scale-125 transition-all transform duration-150 ease-out" />
            )}
            <NavLink to="/feed">
              <span className="text-gray-600 text-sm font-black">
                {user?.username.toUpperCase()}
              </span>
            </NavLink>
            {user ? (
              <NavLink onClick={mutation.mutate} to="/">
                <span className="text-gray-600 text-sm font-black">
                  LOG OUT
                </span>
              </NavLink>
            ) : (
              <NavLink className="text-gray-600 text-sm font-black" to="signup">
                <span>SIGN UP</span>
              </NavLink>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
