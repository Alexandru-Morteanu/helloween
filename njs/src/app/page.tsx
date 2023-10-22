"use client";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useEffect, useState, ChangeEvent, useRef } from "react";
import Loading from "./loading";
import { useRouter } from "next/navigation";

interface storyData {
  author: string;
  story: string;
}
interface wrongData {
  possible: boolean;
  message: string;
}
interface UserResponse {
  user: string | null | AxiosResponse;
}
export default function Main() {
  //userstate = logged in or not
  const [loading, setLoading] = useState<Boolean>(true);
  const router = useRouter();
  const ref = useRef<HTMLTextAreaElement>(null);
  const [storyData, SetStoryData] = useState<storyData>({
    author: "",
    story: "",
  });
  const [wrongDataMsg, setWrongDataMsg] = useState<wrongData>({
    possible: false,
    message: "It's spooki time!",
  });

  const ChangeEvent = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { id, value } = event.target;
    SetStoryData((prevContent: any) => ({
      ...prevContent,
      [id]: value,
    }));
  };

  const SubmitEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(storyData);
    try {
      await axios.post("/api/story", storyData).then((response) => {
        if (response.data.success) {
          setWrongDataMsg({
            possible: true,
            message: `Your story was succesfully sent! \u{1F383}`,
          });
          if (ref.current) ref.current.value = "";
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
        console.log("R.I.P servers \u{1F95E}");
        setWrongDataMsg({ possible: true, message: "Server's on vacation 🏖️" });
      } else {
        console.log("An error occurred while sending your story...");
        setWrongDataMsg({
          possible: true,
          message: "Damn...Code broke...Contact an admin!",
        });
      }
    }
  };
  const checktoken = async (): Promise<UserResponse> => {
    try {
      const response = await axios.get("/api/checktoken");
      if (response.data.validlog) {
        SetStoryData({
          author: response.data.user.username,
          story: "",
        });
        return {
          user: response,
        };
      } else {
        return {
          user: null,
        };
      }
    } catch (e) {
      return {
        user: null,
      };
    }
  };
  /*
  - The main idea: Get data when page load and redirect user after the function was executed.
  Errors: Bad design, maybe useLayoutEffect would work better here...maybe.
  */
  useEffect(() => {
    const fetchData = async () => {
      const { user } = await checktoken();
      if (user) {
        setLoading(false);
      } else {
        router.push("/login");
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <main className="flex justify-center font-serif flex-col">
        {loading ? (
          <Loading />
        ) : (
          <div className="flex self-center flex-col">
            <form
              onSubmit={SubmitEvent}
              className="sm:p-4 p-4 rounded-lg shadow-lg w-96"
            >
              <div className="flex flex-col items-center">
                <h2 className="text-2xl font-semibold mb-2 flex flex-row ">
                  📝 Submit Your Story
                </h2>
              </div>
              <p
                className="text-red-700 text-xs text-center"
                style={
                  !wrongDataMsg.possible
                    ? { opacity: "0%" }
                    : { opacity: "100%" }
                }
              >
                {wrongDataMsg.message}
              </p>
              <div>
                <label
                  className="block text-white text-sm font-medium mb-2"
                  htmlFor="story"
                >
                  Write Your Story here:
                </label>
                <textarea
                  className="w-full h-64 bg-gray-900 text-white border border-red-600 rounded-md py-2 px-3 focus:outline-none focus:border-red-400"
                  id="story"
                  onChange={ChangeEvent}
                  placeholder="Write your story here..."
                  ref={ref}
                  required
                />
              </div>

              <div className="mb-6">
                <button
                  className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </>
  );
}
