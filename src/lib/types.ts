enum Difficulty {
    easy = "easy",
    medium = "medium",
    hard = "hard",
}

enum QuestionType {
    multiple = "multiple",
    boolean = "boolean",
}

interface Question {
    category: string;
    type: QuestionType;
    difficulty: Difficulty;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}
