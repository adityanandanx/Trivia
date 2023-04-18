import MCQuestion from "@/components/MCQuestion";
import Questions from "@/components/Questions";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface RandomQuestionProps {}

const RandomQuestion = async ({}: RandomQuestionProps) => {
    const res = await fetch(
        "https://opentdb.com/api.php?amount=10&type=multiple",
        {
            cache: "no-store",
        }
    );
    const quesJson = await res.json();
    const questions = quesJson.results as Question[];
    return (
        <div>
            <Questions questions={questions} />
        </div>
    );
};

export default RandomQuestion;
