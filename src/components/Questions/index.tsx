"use client";
import { FC, createContext, useEffect, useRef, useState } from "react";
import MCQuestion from "../Question";
import Link from "next/link";
import Button from "../ui/Button";
import { Question, QuestionType } from "@/lib/types";
import { MdChevronLeft, MdClose } from "react-icons/md";
import Answers from "./Answers";
import Confetti from "react-confetti";

interface QuestionsProps {
    questions: Question[];
    quesIndex?: number;
}

export interface Controls {
    next: () => void;
    prev: () => void;
    incrementScore: () => void;
}

export interface TriviaState {
    quesIndex: number;
    score: number;
    hasEnded: boolean;
    correctQuestions: boolean[];
}

const ControlsContext = createContext<Controls | null>(null);
const TriviaStateContext = createContext<TriviaState | null>(null);

const Questions: FC<QuestionsProps> = ({ questions, quesIndex = 0 }) => {
    // Starting question
    const [currentQues, setCurrentQues] = useState<Question>(
        questions[quesIndex]
    );
    const [hasEnded, setHasEnded] = useState<boolean>(false);

    // State of the game
    const [triviaState, setTriviaState] = useState<TriviaState>({
        quesIndex: quesIndex,
        score: 0,
        hasEnded: false,
        correctQuestions: new Array(questions.length).fill(false),
    });
    // controls
    const [controls, setControls] = useState<Controls>({
        next: () => {
            setTriviaState((prevState) => {
                if (prevState.quesIndex >= questions.length - 1) {
                    prevState.hasEnded = true;
                    localStorage.setItem(
                        "highestScore",
                        `${prevState.score}/${questions.length}`
                    );
                    setHasEnded(true);
                    return prevState;
                }
                prevState.quesIndex += 1;
                setCurrentQues(questions[prevState.quesIndex]);

                return prevState;
            });
        },
        prev: () => {
            setTriviaState((prevState) => {
                prevState.quesIndex -= 1;
                return prevState;
            });
        },
        incrementScore: () => {
            setTriviaState((prevState) => {
                prevState.score += 1;
                prevState.correctQuestions[prevState.quesIndex] = true;
                return prevState;
            });
        },
    });

    return (
        <ControlsContext.Provider value={controls}>
            <TriviaStateContext.Provider value={triviaState}>
                <Link href={"/"} className="">
                    <Button
                        className="text-3xl p-2 m-3 absolute top-0 right-0"
                        variant={"secondary"}
                        brightness={"dim"}
                    >
                        <MdClose />
                    </Button>
                </Link>
                {!hasEnded ? (
                    <div>
                        <div className="w-full text-lg text-zinc-900 dark:text-zinc-50 opacity-50 flex flex-col sm:flex-row items-center justify-between gap-2 px-4 py-2">
                            <div className="flex gap-2">
                                <h3>Score: </h3>
                                {triviaState.score}/{questions.length}
                            </div>
                            <div className="flex gap-2">
                                <h3>Questions left: </h3>
                                {questions.length - triviaState.quesIndex}
                            </div>
                        </div>

                        <MCQuestion
                            index={triviaState.quesIndex}
                            question={questions[triviaState.quesIndex]}
                        />
                    </div>
                ) : (
                    <h1 className="flex flex-col items-center justify-center ">
                        <span className="text-xl">Your Final Score is:</span>
                        <span className="text-4xl font-black">
                            {triviaState.score}/{questions.length}
                        </span>
                        <Link href="/" className="outline-none">
                            <Button
                                autoFocus
                                variant="secondary"
                                brightness="dim"
                                className="px-10"
                            >
                                Back to menu
                            </Button>
                        </Link>
                        {triviaState.score === questions.length ? (
                            <Confetti recycle={false} numberOfPieces={500} />
                        ) : (
                            <Answers questions={questions} />
                        )}
                    </h1>
                )}
            </TriviaStateContext.Provider>
        </ControlsContext.Provider>
    );
};

export default Questions;
export { TriviaStateContext, ControlsContext };
