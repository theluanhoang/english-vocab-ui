export interface Vocabulary {
    id: string;
    word: string;
    deletedAt: string | null;
    partOfSpeech: string;
    definition: string;
    exampleSentence: string;
    audio: string;
    pronunciation: string;
    translatedExample: string;
    meaning: string;
}

export interface WordFormsResponse {
    info: {
        id: string;
        name: string;
        type: string;
        userId: string;
        createdAt: string;
        updatedAt: string;
        deletedAt: string | null;
        description: string | null;
    };
    words: Vocabulary[];
} 