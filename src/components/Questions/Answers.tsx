"use client";
import { FC, useContext, useState } from "react";
import { cn } from "@/lib/utils";
import Button from "../ui/Button";
import { Question } from "@/lib/types";
import { decode } from "he";
import * as Dialog from "@radix-ui/react-dialog";
import { TriviaStateContext } from ".";
import { MdClose } from "react-icons/md";

interface AnswersProps extends Dialog.DialogProps {
    questions: Question[];
}

const Answers: FC<AnswersProps> = ({ questions, ...props }) => {
    const [open, setOpen] = useState(false);
    return (
        <Dialog.Root open={open} onOpenChange={setOpen} {...props}>
            <Dialog.Trigger>
                <Button variant="secondary" brightness="dim">
                    {open ? "Hide Wrong Answers" : "Show Wrong Answers"}
                </Button>
            </Dialog.Trigger>
            <Dialog.Portal>
                <Dialog.Overlay className="grid place-items-center py-10 data-[state=open]:animate-overlayShow bg-zinc-900/50 fixed inset-0 overflow-y-auto">
                    <Dialog.Content className="flex flex-col data-[state=open]:animate-contentShow w-[90vw] max-w-lg rounded-md bg-zinc-50 dark:bg-zinc-800 p-10 shadow-lg focus:outline-none">
                        <Dialog.Title className="text-2xl font-semibold">
                            Your Wrong Answers:
                        </Dialog.Title>
                        <Dialog.Description className="flex flex-col gap-10 text-mauve11 mt-[10px] mb-5 text-[15px] leading-normal">
                            {questions.map((q, i) => (
                                <QuestionAnswer
                                    index={i}
                                    question={q}
                                    key={i}
                                />
                            ))}
                        </Dialog.Description>
                    </Dialog.Content>
                </Dialog.Overlay>
            </Dialog.Portal>
        </Dialog.Root>
    );
};

interface QuestionAnswerProps {
    question: Question;
    index: number;
}

const QuestionAnswer: FC<QuestionAnswerProps> = ({ index, question }) => {
    const triviaState = useContext(TriviaStateContext);

    if (triviaState?.correctQuestions[index] === true) {
        return null;
    }

    return (
        <div className="flex flex-col gap-1">
            <span className="text-base flex gap-2">
                <span>{index + 1 + "."}</span>
                <div className="flex flex-col gap-1">
                    {decode(question.question)}
                    <span className="text-xs text-green-500">
                        Answer: {decode(question.correct_answer)}
                    </span>
                </div>
            </span>
        </div>
    );
};

export default Answers;
