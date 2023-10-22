"use client";
import axios, { AxiosError, AxiosResponse } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, useEffect, useCallback } from "react";
import Loading from "../loading";

//Interfaces
interface UserData {
  username: string;
  password: string;
}

interface ErrorMessage {
  possible: boolean;
  message: string;
}

interface UserResponse {
  user: string | null | AxiosResponse;
}

export default function signup() {
  //consts/data
  const [loading, setLoading] = useState<Boolean>(true);
  const router = useRouter();

  const [userData, setUserData] = useState<UserData>({
    username: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
    possible: false,
    message: "It's spooki time!",
  });

  //Functions
  const handleChangeEvent = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { id, value } = event.target;
      setUserData((prevContent) => ({
        ...prevContent,
        [id]: value,
      }));
    },
    []
  );

  const handleSubmitEvent = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      try {
        await axios
          .post("/api/signup", userData, { withCredentials: true })
          .then((response) => {
            if (response.data.success) {
              setErrorMessage({
                possible: true,
                message: `Welcome ${userData.username}!`,
              });
            } else {
              setErrorMessage({
                possible: true,
                message: response.data.message,
              });
            }
          });
      } catch (error: any) {
        if (error.response) {
          setErrorMessage({
            possible: true,
            message: error.response.data.message,
          });
        } else if (error.request) {
          setErrorMessage({
            possible: true,
            message: "Server's on vacation 🏖️",
          });
        } else {
          setErrorMessage({
            possible: true,
            message: "Damn...Code broke...Contact an admin!",
          });
        }
      }
    },
    [userData]
  );

  const checkToken = useCallback(async (): Promise<UserResponse> => {
    try {
      const response = await axios.get("/api/checktoken");
      if (response.data.validlog) {
        router.push("/");
        return {
          user: response,
        };
      } else {
        return {
          user: null,
        };
      }
    } catch (e) {
      const error = e as AxiosError;
      return {
        user: null,
      };
    }
  }, []);

  const fetchData = useCallback(async () => {
    const { user } = await checkToken();
    if (user) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [checkToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);
  if (loading) {
    return <Loading />;
  }
  return (
    <main className="flex justify-center font-serif flex-col">
      <div className="flex self-center flex-col">
        <form
          onSubmit={handleSubmitEvent}
          className="sm:p-4 p-4 rounded-lg shadow-lg w-96"
        >
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-2 flex flex-row ">
              {"\u{1F383} SignUp"}
            </h2>
            <p
              className="text-red-700 text-xs"
              style={
                !errorMessage.possible ? { opacity: "0%" } : { opacity: "100%" }
              }
            >
              {errorMessage.message}
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
              onChange={handleChangeEvent}
              placeholder="username"
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
              onChange={handleChangeEvent}
              placeholder="password"
              required
            />
          </div>

          <div className="mb-6">
            <button
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
              type="submit"
            >
              SignUp
            </button>
          </div>

          <p className="text-gray-400 text-sm text-center">
            Already have an account?{" "}
            <Link className="text-red-500 hover:underline" href="/login">
              Log In Now!
            </Link>
          </p>
        </form>
      </div>
    </main>
  );
}
