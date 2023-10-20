"use client";
import axios from "axios";
import Link from "next/link";
import { useState, ChangeEvent } from "react";

const LogInForm: React.FC = () => {
  interface userData {
    username: string;
    password: string;
  }
  interface wrongData {
    possible: boolean;
    message: string;
  }
  const [userData, SetUserData] = useState<userData>({
    username: "",
    password: "",
  });
  const [wrongDataMsg, setWrongDataMsg] = useState<wrongData>({
    possible: false,
    message: "It's spooki time!",
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
      await axios.post("/api/login", userData).then((response) => {
        if (response.data.success) {
          setWrongDataMsg({
            possible: true,
            message: `Welcome ${userData.username}!`,
          });
        } else {
          setWrongDataMsg({ possible: true, message: response.data.message });
        }
      });
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.data.message);
        setWrongDataMsg({
          possible: true,
          message: error.response.data.message,
        });
      } else if (error.request) {
        console.log("R.I.P servers 🍮");
        setWrongDataMsg({ possible: true, message: "Server's on vacation 🏖️" });
      } else {
        console.log("An error occurred while sending the request.");
        setWrongDataMsg({
          possible: true,
          message: "Damn...Code broke...Contact an admin!",
        });
      }
    }
  };
  return (
    <div className="flex self-center flex-col">
      <form
        onSubmit={SubmitEvent}
        className="sm:p-4 p-4 rounded-lg shadow-lg w-96"
      >
        <div className="flex flex-col items-center">
          <h2 className="text-2xl font-semibold mb-2 flex flex-row ">
            🎃 Login
          </h2>
          <p
            className="text-red-700 text-xs"
            style={
              !wrongDataMsg.possible ? { opacity: "0%" } : { opacity: "100%" }
            }
          >
            {/* {(wrongDataMsg.possible && wrongDataMsg.message)} */}
            {wrongDataMsg.message}
          </p>
        </div>
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
