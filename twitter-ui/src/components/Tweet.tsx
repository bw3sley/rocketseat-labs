import { Link } from "react-router-dom";

import { ChatCircle, ArrowsClockwise, Heart } from "phosphor-react";

import "./Tweet.css";

interface TweetProps {
    content: string
}

export function Tweet(props: TweetProps) {
    return (
        <Link to="/status" className="tweet">
            <img src="https://github.com/diego3g.png" alt="" />

            <div className="tweet-content">
                <header className="tweet-content-header">
                    <strong>Diego Fernandes</strong>
                    <span>@dieegosf</span>
                </header>

                <p>
                    {props.content}
                </p>

                <footer className="tweet-content-footer">
                    <button type="button">
                        <ChatCircle />
                        20
                    </button>

                    <button type="button">
                        <ArrowsClockwise />
                        20
                    </button>
                    
                    <button type="button">
                        <Heart />
                        20
                    </button>
                </footer>
            </div>
        </Link>
    )
}