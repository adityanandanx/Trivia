"use client";
import { SettingsContext } from "@/components/GlobalContext";
import Questions from "@/components/Questions";
import { Question } from "@/lib/types";
import { getQuestions } from "@/lib/utils";
import { useContext } from "react";

interface RandomQuestionProps {}

const RandomQuestion = async ({}: RandomQuestionProps) => {
    // const [questions, setQuestions] = useState<Question[]>([]);
    const { userSettings } = useContext(SettingsContext);
    const questions = await getQuestions(userSettings);
    // const questions = [
    //     {
    //         category: "Entertainment: Music",
    //         type: "multiple",
    //         difficulty: "easy",
    //         question:
    //             "&quot;Hallelujah&quot; is a song written by which Canadian recording artist?",
    //         correct_answer: "Leonard Cohen",
    //         incorrect_answers: [
    //             "Kory Lefkowits",
    //             "Ryan Letourneau ",
    //             "Justin Bieber ",
    //         ],
    //     },
    //     {
    //         category: "Entertainment: Comics",
    //         type: "multiple",
    //         difficulty: "easy",
    //         question:
    //             "In &quot;Homestuck&quot; what is Dave Strider&#039;s guardian?",
    //         correct_answer: "Bro",
    //         incorrect_answers: ["Becquerel", "Doc Scratch", "Halley"],
    //     },
    // ];
    // console.log(questions);

    // useEffect(() => {
    //     getQuestions(userSettings).then((q) => setQuestions(q));
    // }, []);
    return (
        <div>
            <Questions questions={questions as Question[]} />
        </div>
    );
};

export default RandomQuestion;
