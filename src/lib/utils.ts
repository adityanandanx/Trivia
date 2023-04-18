import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { Category, Question, UserSettings } from "./types";

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
        { id: -1, name: "Any" },
        ...(catJson.trivia_categories as Category[]),
    ];
    return categories;
}

export async function getQuestions(userSettings: UserSettings) {
    // https://opentdb.com/api.php?amount=10&category=9&difficulty=medium&type=multiple
    const { category, difficulty, nofquestions, type } = userSettings;
    const u = `https://opentdb.com/api.php?amount=${nofquestions}&type=${type.toLowerCase()}&difficulty=${difficulty.toLowerCase()}}`;

    const res = await fetch("https://opentdb.com/api.php?amount=2", {
        cache: "no-store",
    });
    if (!res.ok) {
        console.log(res.statusText);
    }
    const quesJson = await res.json();
    const questions = quesJson.results as Question[];

    return questions;
}
