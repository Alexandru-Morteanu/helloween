import { ReactNode } from "react";

interface LogInFormProps {
  changeToLogIn: boolean;
}

const LogInForm: React.FC<LogInFormProps> = ({ changeToLogIn }) => {
  return (
    <div className="flex self-center flex-col">
      <form className="p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-orange-700 mb-6">Login</h2>
        <div>
          <label
            className="block text-white text-sm font-medium mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="w-full bg-gray-900 text-white border border-red-600 rounded-md py-2 px-3 focus:outline-none focus:border-red-400"
            type="text"
            id="username"
            placeholder="Username"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-white text-sm font-medium mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full bg-gray-900 text-white border border-red-600 rounded-md py-2 px-3 focus:outline-none focus:border-red-400"
            type="password"
            id="password"
            placeholder="Password"
          />
        </div>

        <div className="mb-6">
          <button
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
            type="submit"
          >
            Login
          </button>
        </div>

        <p className="text-gray-400 text-sm text-center">
          Don't have an account?{" "}
          <a className="text-red-500 hover:underline" href="#">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
};

export default LogInForm;
