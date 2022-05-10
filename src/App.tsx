import { useState } from 'react'
import Tweet from './components/Tweet'
import './index.css'


function App() {
  const profile = {
    username: "akshaykumar",
    fullname: "Akshay Kumar",
    isVerified: true,
    imgUrl: "https://pbs.twimg.com/profile_images/1513413525187743746/JVdygchC_400x400.jpg"
  }

  const tweetInfo = {
    content: "A glimpse into the world of #Ramsetu. ",
    imgUrl: "https://pbs.twimg.com/media/FRbhpo3VgAAQBjV?format=jpg&name=large",
    likes: 12334,
    retweets: 123,
    childTweets: ['hi'],
    createdAt: new Date()
  }
  
  return (
    <div className="min-h-screen">
      <div className="container mx-auto ">
        <div id="feed" className="sm:max-w-xl bg-black border border-b-0 border-gray-900 mx-auto rounded-lg flex flex-col">
          <Tweet profile={profile} tweet={tweetInfo} />
          <Tweet profile={profile} tweet={tweetInfo} />
          <Tweet profile={profile} tweet={tweetInfo} />
        </div>
      </div>
    </div>
  )
}

export default App
