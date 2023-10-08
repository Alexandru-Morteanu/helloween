"use client";
import axios from "axios";
import Link from "next/link";
import { useState, ChangeEvent } from "react";

const LogInForm: React.FC = () => {
  interface userData {
    username: string;
    password: string;
  }
  const [userData, SetUserData] = useState<userData>({
    username: "",
    password: "",
  });

  const ChangeEvent = (event: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    SetUserData((prevContent: any) => ({
      ...prevContent,
      [id]: value,
    }));
  };

  const SubmitEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(userData);
    try {
      await axios.post("/api", userData).then((response) => {
        if (response.data.success) {
          console.log(response.data.message);
        } else {
          console.log(response.data.message);
        }
      });
    } catch (error) {
      console.log("There was an error while checking the data!");
    }
  };

  return (
    <div className="flex self-center flex-col">
      <form
        onSubmit={SubmitEvent}
        className="sm:p-4 p-6 rounded-lg shadow-lg w-96"
      >
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
            onChange={ChangeEvent}
            placeholder="Username"
            required
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
            onChange={ChangeEvent}
            placeholder="Password"
            required
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
          <Link className="text-red-500 hover:underline" href="./getAccount">
            Get One Now!
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogInForm;
