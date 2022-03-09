export default () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center space-y-8 justify-center">
      <h2 className="text-3xl font-extrabold text-center text-gray-900">
        Sign up
      </h2>
      <div className="max-w-md w-full bg-white font-sm text-sm text-gray-800 shadow-sm px-10 py-8 rounded-lg">
        <div className="w-full flex font-md flex-col items-center space-y-6">
          <div className="w-full">
            <p className="text-left">Email address</p>
            <input className="rounded-md px-2 w-full mt-1 border border-gray-300 h-10 outline-none" />
          </div>
          <div className="w-full">
            <p className="text-left">Password</p>
            <input
              type="password"
              className="rounded-md px-2 w-full mt-1 border border-gray-300 h-10 outline-none"
            />
          </div>
        </div>
        <button className="w-full mt-10 rounded-lg py-2 text-white text-center bg-indigo-600">
          Sign up
        </button>
      </div>
    </div>
  );
};
