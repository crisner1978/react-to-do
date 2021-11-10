import { useState } from "react";

const TodoList = ({ todos, setTodos }) => {

    const [todoEditing, setTodoEditing] = useState(null);
    const [editingText, setEditingText] = useState("");
  
    const deleteTodo = (id) => {
      const updatedTodos = [...todos].filter((todo) => todo.id !== id);
      setTodos(updatedTodos);
    };
  
    const toggleComplete = (id) => {
      const updatedTodos = [...todos].map((todo) => {
        if (todo.id === id) {
          todo.completed = !todo.completed;
        }
        return todo;
      });
      setTodos(updatedTodos);
    };
  
    const editTodo = (id) => {
      const updatedTodos = [...todos].map((todo) => {
        if (todo.id === id) {
          todo.text = editingText;
        }
        return todo;
      });
      setTodos(updatedTodos);
      setTodoEditing(null);
      setEditingText("");
    };
  
    return (
        <div>
            {todos.map((todo) => (
          <div
            className="flex items-center p-4 space-x-4 hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out"
            key={todo.id}>
            {todoEditing === todo.id ? (
              <input
                className="flex-1 border-none focus:ring-0 outline-none text-gray-600 font-semibold"
                type="text"
                value={editingText}
                placeholder={todo.text}
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div
                onClick={() => setTodoEditing(todo.id)}
                className="flex-1 shadow-md cursor-pointer">
                <h1
                  className={`font-semibold text-gray-600 mb-1 ${
                    todo.completed && "line-through"
                  }`}>
                  {todo.text}
                </h1>
              </div>
            )}
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />

            {todoEditing === todo.id ? (
              <button
                type="submit"
                className="text-gray-600 font-semibold"
                onClick={() => editTodo(todo.id)}>
                Confirm
              </button>
            ) : (
              <button
                type="button"
                className="text-red-300 font-semibold hover:text-red-500"
                onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
            )}
          </div>
        ))}
        </div>
    )
}

export default TodoList
