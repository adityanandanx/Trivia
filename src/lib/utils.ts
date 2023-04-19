import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Category, Difficulty, Question, UserSettings } from "./types";
import queryString from "query-string";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

// Fisher-Yates shuffle
export function shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
        // swap elements array[i] and array[j]
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

export async function getCategories() {
    const res = await fetch("https://opentdb.com/api_category.php");
    const catJson = await res.json();
    let categories = [];
    categories = [
        { id: -1, name: "mixed" },
        ...(catJson.trivia_categories as Category[]),
    ];
    return categories;
}

export async function getQuestions(userSettings: UserSettings) {
    // https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple
    const { category, difficulty, amount, type: qtype } = userSettings;
    // const u = `https://opentdb.com/api.php?amount=${nofquestions}&type=${type.toLowerCase()}&difficulty=${difficulty.toLowerCase()}&category=${
    //     category.id
    // }`;

    const u =
        "https://opentdb.com/api.php?" +
        queryString.stringify({
            category: category.id === -1 ? null : category.id,
            difficulty: difficulty === "mixed" ? null : difficulty,
            amount: amount,
            type: qtype === "mixed" ? null : qtype,
        });

    const res = await fetch(u, {
        cache: "no-store",
    });
    const quesJson = await res.json();
    let error_msg: string | null = null;

    // According to the api -
    switch (quesJson.response_code) {
        case 1:
            error_msg =
                "No questions found with the applied settings. Try changing the parameters.";
            break;
        case 2:
            error_msg = "Bad request";
            break;
        case 3:
            error_msg = "Token not found";
            break;
        case 4:
            error_msg = "Token Empty";
            break;
        default:
            break;
    }
    const questions = quesJson.results as Question[];

    return { error_msg, questions };
}
