"use client";
import { SettingsContext } from "@/components/GlobalContext";
import Questions from "@/components/Questions";
import { Question } from "@/lib/types";
import { getQuestions } from "@/lib/utils";
import { useContext, useEffect, useState } from "react";

interface RandomQuestionProps {}

const RandomQuestion = async ({}: RandomQuestionProps) => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const { userSettings } = useContext(SettingsContext);
    // const questions = await getQuestions();
    useEffect(() => {
        getQuestions(userSettings);
    }, []);
    return (
        <div>
            <Questions questions={questions} />
        </div>
    );
};

export default RandomQuestion;
