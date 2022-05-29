import {
    ChartBarIcon,
    ChatIcon,
    DotsHorizontalIcon,
    HeartIcon,
    ShareIcon,
    TrashIcon,
} from "@heroicons/react/outline";
import {
    HeartIcon as HeartIconFilled,
    ChatIcon as ChatIconFilled,
} from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import Moment from "react-moment";
import { socket } from "../socket";

function Tweet({ tweet, user }: any) {
    const [liked, setLiked] = useState(false);
    const [likes, setLikes] = useState(tweet.likes as number);


    useEffect(() => {
        setLikes(tweet.likes)
    }, [tweet.likes]);

    const handleLike = () => {
        const data = {
            count: liked ? -1 : 1,
            tweetId: tweet?._id
        }
        setLiked((liked) => !liked);
        setLikes((likes) => liked ? -1 : 1 + likes);
        socket.emit("tweet:like", data);
    }

    const handleDelete = () => {
        const tweetId = tweet._id;
        socket.emit("tweet:remove", tweetId);
    }


    return (
        <div
            className="p-3 flex cursor-pointer border-b border-gray-700"
        >
            <img
                src={tweet.user_id?.image}
                alt="avatar-image"
                className="h-11 w-11 rounded-full mr-4"
            />

            <div className="flex flex-col space-y-2 w-full">
                <div className={`flex justify-between`}>
                    <div className="text-[#6e767d]">
                        <div className="inline-block group">
                            <h4
                                className={`font-bold text-[15px] sm:text-base text-[#d9d9d9] group-hover:underline inline-block`}
                            >
                                {tweet.user_id?.name}
                            </h4>
                            <span
                                className={`text-sm sm:text-[15px] ml-1.5`}
                            >
                                @{tweet.user_id?.username}
                            </span>
                        </div>
                        {/* ·{" "} */}
                        <span className="hover:underline text-sm sm:text-[15px]">
                            {/* <Moment fromNow>{tweet.createdAt.toDate()}</Moment> */}
                        </span>
                        <p className="text-[#d9d9d9] text-[15px] sm:text-base mt-0.5">
                            {tweet.content}
                        </p>
                    </div>
                    <div className="icon group flex-shrink-0 ml-auto">
                        <DotsHorizontalIcon className="h-5 text-[#6e767d] group-hover:text-[#1d9bf0]" />
                    </div>
                </div>
                {tweet.image &&

                    (<img
                        src={tweet.image}
                        alt="tweet-image"
                        className="rounded-2xl max-h-[700px] object-cover mr-2"
                    />)
                }
                <div
                    className={`text-[#6e767d] flex justify-between w-10/12`}
                >
                    <div
                        className="flex items-center space-x-1 group"
                    >
                        <div className="icon group-hover:bg-[#1d9bf0] group-hover:bg-opacity-10">
                            <ChatIcon className="h-5 group-hover:text-[#1d9bf0]" />
                        </div>
                    </div>

                    <div
                        className="flex items-center space-x-1 group"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleLike();
                        }}
                    >
                        <div className="icon group-hover:bg-pink-600/10">
                            {liked ? (
                                <HeartIconFilled className="h-5 text-pink-600" />
                            ) : (
                                <HeartIcon className="h-5 group-hover:text-pink-600" />
                            )}
                        </div>
                        {likes > 0 && (
                            <span
                                className={`group-hover:text-pink-600 text-sm ${liked && "text-pink-600"
                                    }`}
                            >
                                {likes}
                            </span>
                        )}
                    </div>

                    <div className="icon group">
                        <ShareIcon className="h-5 group-hover:text-emerald-400" />
                    </div>
                    {
                        (tweet.user_id._id === user._id) &&
                        (
                            <div className="icon group" onClick={handleDelete}>
                                <TrashIcon className="h-5 group-hover:text-red-500" />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default Tweet;
