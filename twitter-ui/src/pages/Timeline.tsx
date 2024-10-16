import { FormEvent, useState, KeyboardEvent } from "react";

import { Header } from "../components/Header"
import { Separator } from "../components/Separator"
import { Tweet } from "../components/Tweet"

import "./Timeline.css";

export function Timeline() {
  const [newTweet, setNewTweet] = useState("");
  const [tweets, setTweets] = useState([
    "Meu primeiro tweet",
    "Teste",
    "Deu certo tweetar!"
  ])

  function handleCreateNewTweet(event: FormEvent) {
    event.preventDefault();

    setTweets(previousTweets => [newTweet, ...previousTweets]);
    setNewTweet("");
  }

  function handleHotkeySubmit(event: KeyboardEvent) {
    if(event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
        setTweets(previousTweets => [newTweet, ...previousTweets]);
        setNewTweet("");
    }
}

  return (
      <section className="timeline">
        <Header title="Home"/>

        <form action="" className="new-tweet-form" onSubmit={handleCreateNewTweet}>
          <label htmlFor="tweet">
            <img src="https://github.com/bw3sley.png" alt="" />
          
            <textarea 
              id="tweet" 
              placeholder="What's happening?"

              value={newTweet}

              onKeyDown={handleHotkeySubmit}
              onChange={(event) => setNewTweet(event.currentTarget.value)}
            />
          </label>

          <button type="submit">Tweet</button>
        </form>

        <Separator />

        {
          tweets.map(tweet => {
            return <Tweet key={tweet} content={tweet} />
          })
        }
      </section>
  )
}