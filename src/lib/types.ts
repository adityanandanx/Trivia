export enum Difficulty {
    easy = "Easy",
    medium = "Medium",
    hard = "Hard",
}

export enum QuestionType {
    multiple = "Multiple",
    boolean = "True/False",
    any = "Any",
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
    nofquestions: number;
    category: Category;
    type: QuestionType;
    difficulty: Difficulty;
}
