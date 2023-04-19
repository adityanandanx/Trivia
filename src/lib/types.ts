export enum Difficulty {
    easy = "easy",
    medium = "medium",
    hard = "hard",
    mix = "mixed",
}

export enum QuestionType {
    multiple = "multiple",
    boolean = "boolean",
    mix = "mixed",
}

export interface Question {
    category: string;
    type: QuestionType;
    difficulty: Difficulty;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface Category {
    id: number;
    name: string;
}

export interface UserSettings {
    amount: number;
    category: Category;
    type: QuestionType;
    difficulty: Difficulty;
}
