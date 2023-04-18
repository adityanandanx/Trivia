"use client";
import { FC, useContext, useEffect, useState } from "react";
import Option from "./Option";
import { ControlsContext } from "../Questions";
import { createContext } from "react";
import { decode } from "he";
import { shuffle } from "@/lib/utils";

// interface QuestionState {
//     attempted: boolean;
//     setAttempted: () => void;
//     clickedOptionIndex: number;
//     setClickedOptionIndex: () => void;
// }

interface MCQuestionProps {
    index: number;
    question: Question;
}

// const QuestionStateContext = createContext<QuestionState | null>(null);

const MCQuestion: FC<MCQuestionProps> = ({ index, question }) => {
    const [attempted, setAttempted] = useState<boolean>(false);
    const [options, setOptions] = useState<string[]>([]);

    useEffect(() => {
        setOptions(
            shuffle([question.correct_answer, ...question.incorrect_answers])
        );
    }, [question]);
    const checkAnswer = (ans: string) => {
        return ans === question.correct_answer;
    };

    return (
        <div className={`flex flex-col gap-4 `}>
            <h2 className="flex gap-3 text-2xl font-semibold">
                <span>{index + 1}. </span>
                <span>{decode(question.question)}</span>
            </h2>
            <ul className="grid grid-cols-2 gap-4 w-full">
                {options.map((option, i) => (
                    <li className="list-item" key={i}>
                        <Option
                            attempt={{ attempted, setAttempted }}
                            isCorrect={checkAnswer(option)}
                            key={i}
                        >
                            {decode(option)}
                        </Option>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MCQuestion;
