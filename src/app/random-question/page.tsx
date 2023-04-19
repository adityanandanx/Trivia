"use client";
import { SettingsContext } from "@/components/GlobalContext";
import Questions from "@/components/Questions";
import Button from "@/components/ui/Button";
import { Question } from "@/lib/types";
import { getQuestions } from "@/lib/utils";
import Link from "next/link";
import { useContext } from "react";

// interface RandomQuestionProps {}

const RandomQuestion = async () => {
    const { userSettings } = useContext(SettingsContext);
    const { error_msg, questions } = await getQuestions(userSettings);
    // const router = useRouter();

    return (
        <div className="flex flex-col gap-3 justify-center items-center">
            {error_msg !== null ? (
                <>
                    <p className="capitalize text-center">{error_msg}</p>
                    <Link href="/" className="outline-none">
                        <Button
                            autoFocus
                            variant="primary"
                            brightness="dim"
                            className="px-10"
                        >
                            Back to menu
                        </Button>
                    </Link>
                </>
            ) : (
                <Questions questions={questions as Question[]} />
            )}
        </div>
    );
};

export default RandomQuestion;
