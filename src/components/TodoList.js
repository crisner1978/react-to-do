import { useState } from "react";
import toast from "react-hot-toast";
import { useMutation, useQuery, useQueryClient } from "react-query";
import LoadingBar from "react-top-loading-bar";
import { getTodosByUsername, handleDelete } from "../firebase";
import useStore from "../store";

const TodoList = () => {
  const [progress, setProgress] = useState(100);
  const user = useStore((s) => s.user);
  let username = user.username;

  const { data: todos, isLoading } = useQuery(["todos", username], () => {
    return getTodosByUsername(username);
  });

  const queryClient = useQueryClient();

  const mutation = useMutation(handleDelete, {
    onSuccess: () => {
      queryClient.invalidateQueries(["todos", username]);
      toast.success("Todo deleted");
    },
  });

  if (isLoading)
    return (
      <LoadingBar
        color="#0055b3"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
    );
  if (!todos || !todos.length) return null;

  const toggleComplete = (id) => {
    // const updatedTodos = todos.map((todo) => {
    //   if (todo.id === id) {
    //     todo.completed = !todo.completed;
    //   }
    //   return todo;
    // });
    // updatedTodos;
  };



  return (
    <div>
      {todos.map((todo) => (
        <div
          className="flex items-center p-4 space-x-4 hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out"
          key={todo.id}>
          <div className="flex-1 shadow-md cursor-pointer">
            <h1
              className={`font-semibold text-gray-600 mb-1 {${todo.completed} && "line-through"}`}>
              {todo.todo}
            </h1>
          </div>

          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleComplete(todo.id)}
          />

          <button
            type="button"
            className="text-red-300 font-semibold hover:text-red-500"
            onClick={() => mutation.mutate(todo.id)}>
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
