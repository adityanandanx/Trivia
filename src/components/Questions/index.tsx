"use client";
import { FC, createContext, useState } from "react";
import MCQuestion from "../MCQuestion";
import Link from "next/link";
import Button from "../ui/Button";
import { useRouter } from "next/navigation";

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
                {!hasEnded ? (
                    <div>
                        <div className="w-full text-lg flex items-center justify-center gap-2">
                            <h3>Score: </h3>
                            <span>
                                {triviaState.score}/{questions.length}
                            </span>
                        </div>
                        {currentQues.type === "multiple" ? (
                            <MCQuestion
                                index={triviaState.quesIndex}
                                question={currentQues}
                            />
                        ) : null}
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
                                Restart
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
