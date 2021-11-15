import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useMutation } from "react-query";
import { loginUser } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const mutation = useMutation(loginUser, {
    onSuccess: () => {
      navigate("/feed", { replace: true });
      toast.success("Log in successful");
    },
    onError: (error) => {
      let message = error?.code;
      switch (message) {
        case "auth/wrong-password":
          message = "Password is incorrect";
          break;
        case "auth/user-not-found":
          message = "User does not exist";
          break;
        default:
          break;
      }
      toast.error(error.message);
    },
  });

  const onSubmit = (data) => {
    const { email, password } = data;
    mutation.mutate({ email, password });
  };

  return (
    <main className="flex justify-center items-center h-full -mt-5 mx-auto">
      <img
        className="relative w-screen h-screen object-cover top-0"
        src="https://efficientively.com/wp-content/uploads/2020/07/colorful-sticky-notes.jpg"
        alt=""
      />

      <div className="bg-white bg-opacity-60 backdrop-opacity-70 backdrop-filter backdrop-blur-md absolute md:max-w-3xl py-10 px-14 rounded-lg shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
          <div className="flex flex-col">
            <label
              className="text-gray-800 text-sm font-black mb-1"
              htmlFor="email">
              EMAIL
            </label>
            <input
              {...register("email", {
                required: "Email required",
                maxLength: {
                  value: 30,
                  message: "less than 30 characters",
                },
              })}
              className="text-gray-600 font-bold outline-none focus:ring-0 border-0 rounded-xl"
              type="email"
            />
            <span className="error">{errors.email?.message.toUpperCase()}</span>
          </div>
          <div className="flex flex-col">
            <label
              className="text-gray-800 text-sm font-black mb-1"
              htmlFor="password">
              PASSWORD
            </label>
            <input
              {...register("password", {
                required: "Password required",
                minLength: {
                  value: 6,
                  message: "more than 6 characters",
                },
                maxLength: {
                  value: 30,
                  message: "less than 30 characters",
                },
              })}
              className="text-gray-600 font-bold outline-none focus:ring-0 border-0 rounded-xl"
              type="password"
            />
            <span className="error">
              {errors.password?.message.toUpperCase()}
            </span>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-gray-800 font-black transition-all transform duration-300 ease-out hover:bg-blue-700 hover:text-white px-24 py-2 rounded-xl">
              LOG IN
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;
