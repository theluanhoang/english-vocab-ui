import http from "@/lib/fetchWithAuth";
import { getHeaders } from "@/lib/utils";

export const vocabularyService = {
    async analyzeWord(word: string) {
        try {
            const response = await http('/vocabulary/note-word', {
                method: 'POST',
                body: JSON.stringify({ word }),
                headers: await getHeaders(),
            })

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to analyze word');
            }

            return response.json();
        } catch (error) {
            console.error('Error analyze word:', error);
            throw error;
        }
    },
};