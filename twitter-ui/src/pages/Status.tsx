import { FormEvent, KeyboardEvent, useState } from "react";

import { PaperPlaneRight } from "phosphor-react";

import { Header } from "../components/Header";
import { Separator } from "../components/Separator";
import { Tweet } from "../components/Tweet";

import "./Status.css";

export function Status() {
    const [newAnswer, setNewAnswer] = useState("");
    const [answers, setAnswers] = useState([
        "Concordo...",
        "Olha, faz sentido!",
        "Parabéns pelo progresso."
    ])
  
    function handleCreateNewAnswer(event: FormEvent) {
      event.preventDefault();
  
      setAnswers(previousTweets => [newAnswer, ...previousTweets]);
      setNewAnswer("");
    }

    function handleHotkeySubmit(event: KeyboardEvent) {
        if(event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
            setAnswers(previousTweets => [newAnswer, ...previousTweets]);
            setNewAnswer("");
        }
    }

    return (
        <section className="status">
            <Header title="Tweet"/>

            <Tweet content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam atque adipisci voluptatibus sit quasi non. Vero amet molestiae quo dignissimos, provident delectus adipisci. Dolorum, autem accusamus accusantium perferendis architecto qui." />

            <Separator />

            <form action="" className="answer-tweet-form" onSubmit={handleCreateNewAnswer}>
                <label htmlFor="tweet">
                    <img src="https://github.com/bw3sley.png" alt="" />
                
                    <textarea 
                        id="tweet" 
                        placeholder="Tweet your answer"

                        value={newAnswer}
                    
                        onKeyDown={handleHotkeySubmit}
                        onChange={event => setNewAnswer(event.currentTarget.value)}
                    />
                </label>

                <button type="submit">
                    <PaperPlaneRight />
                    <span>Answer</span>
                </button>
            </form>

            {
                answers.map(answer => {
                    return <Tweet key={answer} content={answer} />
                })
            }
        </section>
    )
}