import { SparklesIcon } from "@heroicons/react/outline";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { socket } from "../socket";
import { tweetsState } from "../store";
import CreateTweet from "./CreateTweet";
import Tweet from "./Tweet";

function Feed({ user }: any) {
  const [tweets, setTweets] = useRecoilState<any>(tweetsState);

  useEffect(() => {
    socket.on("tweet:all", ({ tweets }: any) => {
      setTweets([...tweets]);
    })
    socket.emit("tweet:list", {});
  }, [])


  return (
    <div className="flex-grow border-l border-r border-gray-700 max-w-xl sm:ml-[73px] xl:ml-[370px]">
      <div className="text-[#d9d9d9] flex items-center sm:justify-between py-2 px-3 sticky top-0 z-50 bg-black border-b border-gray-700">
        <h2 className="text-lg sm:text-xl font-bold">{user.name.split(" ")[0] + "'s Feed"}</h2>
        <div className="hoverAnimation w-9 h-9 flex items-center justify-center xl:px-0 ml-auto">
          <SparklesIcon className="h-5 text-sky-500" />
        </div>
      </div>
      <CreateTweet />
      <div className="pb-72">
        {
          tweets.map((tweet: any, idx: any) =>
            <Tweet key={idx} tweet={tweet} user={user} />
          )
        }
      </div>
    </div>
  );
}

export default Feed;

  // const onNewTweets = useCallback(
  //   ({ tweets }: any) => {
  //     setTweets([...tweets]);
  //   },
  //   [setTweets, tweets],
  // );


  // useEffect(() => {
  //   socket.on("tweet:all", onNewTweets)
  //   return () => {
  //     socket.off("tweet:all", onNewTweets);
  //   };
  // }, [onNewTweets, socket]);