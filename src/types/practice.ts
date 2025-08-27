export interface FillBlankQuestion {
    id: string;
    sentence: string;
    correctWord: string;
    options: string[];
    explanation?: string;
}

export interface FillBlankGameState {
    questions: FillBlankQuestion[];
    currentQuestionIndex: number;
    selectedAnswer: string | null;
    score: number;
    totalQuestions: number;
    isAnswered: boolean;
    isCorrect: boolean;
    isGameComplete: boolean;
}
export interface ListenWriteQuestion {
    id: string;
    word: string;
    meaning: string;
    pronunciation?: string;
    definition?: string;
    example?: string;
}

export interface ListenWriteGameState {
    questions: ListenWriteQuestion[];
    currentQuestionIndex: number;
    userAnswer: string;
    score: number;
    totalQuestions: number;
    isAnswered: boolean;
    isCorrect: boolean;
    isGameComplete: boolean;
    isListening: boolean;
}

export interface WordPair {
    id: string;
    word: string;
    meaning: string;
    isMatched: boolean;
    isSelected: boolean;
    isWrong: boolean;
}

export interface WordPairGameState {
    words: WordPair[];
    meanings: WordPair[];
    selectedWord: WordPair | null;
    selectedMeaning: WordPair | null;
    matchedPairs: string[];
    score: number;
    totalPairs: number;
    isGameComplete: boolean;
    wrongAttempts: number;
}

export interface MultipleChoiceQuestion {
    id: string;
    word: string;
    correctMeaning: string;
    options: string[];
    pronunciation?: string;
    definition?: string;
    example?: string;
}

export interface MultipleChoiceGameState {
    questions: MultipleChoiceQuestion[];
    currentQuestionIndex: number;
    selectedAnswer: string | null;
    score: number;
    totalQuestions: number;
    isAnswered: boolean;
    isCorrect: boolean;
    isGameComplete: boolean;
}

export interface PracticeMode {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    href: string;
}