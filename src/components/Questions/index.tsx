"use client";
import { FC, createContext, useEffect, useRef, useState } from "react";
import MCQuestion from "../Question";
import Link from "next/link";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";
import { Question, QuestionType } from "@/lib/types";
import { MdChevronLeft, MdClose } from "react-icons/md";

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
    rights: number;
    wrongs: number;
    hasEnded: boolean;
}

const ControlsContext = createContext<Controls | null>(null);
const TriviaStateContext = createContext<TriviaState | null>(null);

const Questions: FC<QuestionsProps> = ({ questions, quesIndex = 0 }) => {
    // Starting question
    const [currentQues, setCurrentQues] = useState<Question>(
        questions[quesIndex]
    );
    const [hasEnded, setHasEnded] = useState<boolean>(false);
    const router = useRouter();

    // State of the game
    const [triviaState, setTriviaState] = useState<TriviaState>({
        quesIndex: quesIndex,
        score: 0,
        rights: 0,
        wrongs: 0,
        hasEnded: false,
    });
    // controls
    const [controls, setControls] = useState<Controls>({
        next: () => {
            setTriviaState((prevState) => {
                if (prevState.quesIndex >= questions.length - 1) {
                    prevState.hasEnded = true;
                    setHasEnded(true);
                    return prevState;
                }
                prevState.quesIndex += 1;
                setCurrentQues(questions[prevState.quesIndex]);
                // console.log(prevState.quesIndex);

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
                        onClick={() => {
                            router.replace("/");
                            router.refresh();
                        }}
                    >
                        <MdClose />
                    </Button>
                </Link>
                {!hasEnded ? (
                    <div>
                        <div className="w-full text-lg flex items-center justify-center gap-2">
                            <h3>Score: </h3>
                            <span>
                                {triviaState.score}/{questions.length}
                            </span>
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
                                className="px-10 opacity-50 hover:opacity-100 transition-opacity"
                                onClick={() => {
                                    router.replace("/");
                                    router.refresh();
                                }}
                            >
                                Back to menu
                            </Button>
                        </Link>
                    </h1>
                )}
            </TriviaStateContext.Provider>
        </ControlsContext.Provider>
    );
};

export default Questions;
export { TriviaStateContext, ControlsContext };
