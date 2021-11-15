import Sidebar from "./Sidebar";
import TodoList from "./TodoList";

const Feed = () => {
  return (
    <main className="mt-8 grid grid-cols-1 md:grid-cols-3 md:max-w-4xl mx-auto">
      <section className="hidden md:inline-grid md:col-span-1">
        <div className="fixed p-4 items-center">
          <Sidebar />
        </div>
      </section>
      <section className="col-span-2">
        <TodoList />
      </section>
    </main>
  );
};

export default Feed;
