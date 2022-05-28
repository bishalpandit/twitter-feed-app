import {
  ChartBarIcon,
  EmojiHappyIcon,
  PhotographIcon,
  XIcon,
} from "@heroicons/react/outline";
import axios from "axios";
import { useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { socket } from "../socket";
import { authState } from "../store";
import baseUrl from "../utils/baseUrl";

function CreateTweet() {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const filePickerRef = useRef<any>(null);
  const [auth, setAuth] = useRecoilState<any>(authState);

  const createTweet = async () => {
    if (loading) return;
    setLoading(true);

    const tweet = {
      content: input,
      user: auth.user,
      image: selectedFile,
      likes: 0
    };
    socket.emit("tweet:create", tweet);

    setTimeout(() => {
      setLoading(false);
    }, 1000);

    setInput("");
    setSelectedFile(null);
  };

  const addImageToTweet = (e: any) => {
    const reader = new FileReader();
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }
    reader.onload = (readerEvent: any) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  const logoutHandler = () => {
    axios.get(`${baseUrl}/auth/logout`, {
      withCredentials: true
    })
      .then(() => {
        setAuth({ user: null })
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll scrollbar-hide ${loading && "opacity-60"
        }`}
    >
      <img
        src={auth.user.image}
        alt=""
        className="h-11 w-11 rounded-full cursor-pointer"
        onClick={logoutHandler}
      />
      <div className="divide-y divide-gray-700 w-full">
        <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's happening?"
            rows={2}
            className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-gray-500 tracking-wide w-full min-h-[50px]"
          />

          {selectedFile && (
            <div className="relative">
              <div
                className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
                onClick={() => setSelectedFile(null)}
              >
                <XIcon className="text-white h-5" />
              </div>
              <img
                src={selectedFile}
                alt=""
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between pt-2.5">
          <div className="flex items-center">
            <div
              className="icon"
              onClick={() => filePickerRef.current.click()}
            >
              <PhotographIcon className="text-[#1d9bf0] h-[22px]" />
              <input
                type="file"
                ref={filePickerRef}
                hidden
                disabled={loading}
                onChange={addImageToTweet}
              />
            </div>

            <div className="icon rotate-90">
              <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
            </div>

            <div className="icon">
              <EmojiHappyIcon className="text-[#1d9bf0] h-[22px]" />
            </div>
          </div>
          <button
            className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
            disabled={!input && !selectedFile}
            onClick={createTweet}
          >
            {loading ?
              (
                <svg role="status" className="w-6 h-6 mx-2 text-white animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
              ) :
              "Tweet"}
          </button>
        </div>

      </div>
    </div>
  );
}

export default CreateTweet;
