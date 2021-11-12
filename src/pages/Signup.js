const Signup = () => {




  
  return (
    <main className="flex justify-center items-center h-full -mt-5 mx-auto">
      <img
        className="relative w-screen h-screen object-cover top-0"
        src="https://efficientively.com/wp-content/uploads/2020/07/colorful-sticky-notes.jpg"
        alt=""
      />

      <div className="bg-white bg-opacity-60 backdrop-opacity-70 backdrop-filter backdrop-blur-md absolute md:max-w-3xl py-10 px-16 rounded-lg shadow-2xl">
        <form className="space-y-3">
          <div className="flex flex-col">
            <label
              className="text-gray-800 text-sm font-black mb-1"
              htmlFor="username">
              USERNAME
            </label>
            <input
              className="outline-none focus:ring-0 border-0 rounded-xl"
              type="text"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-gray-800 text-sm font-black mb-1"
              htmlFor="email">
              EMAIL
            </label>
            <input
              className="outline-none focus:ring-0 border-0 rounded-xl"
              type="email"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-gray-800 text-sm font-black mb-1"
              htmlFor="password">
              PASSWORD
            </label>
            <input
              className="outline-none focus:ring-0 border-0 rounded-xl"
              type="password"
            />
          </div>
          <div className="flex flex-col">
            <label
              className="text-gray-800 text-sm font-black mb-1"
              htmlFor="password">
              CONFIRM
            </label>
            <input
              className="outline-none focus:ring-0 border-0 rounded-xl"
              type="password"
            />
          </div>
          <div className="flex justify-center">
            <button className="text-gray-800 font-black hover:scale-110 transition-all transform duration-300 ease-out hover:bg-gray-800 hover:text-white px-8 py-2 rounded-xl">
              CREATE TODOS
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Signup;
