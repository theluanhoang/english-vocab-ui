import React from 'react'
import Heading from '../atoms/Heading'
import AudioButton from './AudioButton'
import { Vocabulary } from '@/types';
import { getTagColor } from '../organisms/WordForms';

type VocabularyCardProps = {
    vocabulary: Vocabulary;
}
function VocabularyCard({ vocabulary }: VocabularyCardProps) {
    return (
        <div
            className="rounded-xl border border-border-subtle dark:border-gray-700 bg-surface-2 dark:bg-gray-700 shadow-md p-4 md:p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
            <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                    <Heading as="h4" className="text-xl font-bold text-text-primary dark:text-white">
                        {vocabulary.word}
                    </Heading>
                    <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full shadow-sm border border-transparent ${getTagColor(vocabulary.partOfSpeech)}`}>
                        {vocabulary.partOfSpeech}
                    </span>
                </div>
                <div className="text-text-secondary dark:text-gray-300 text-sm mb-1">
                    {vocabulary.definition}
                </div>
                <div className="text-text-muted dark:text-gray-400 text-xs italic">
                    "{vocabulary.exampleSentence}"
                </div>
            </div>
            <AudioButton audioUrl={vocabulary.audio} pronunciation={vocabulary.pronunciation} />
        </div>
    )
}

export default VocabularyCard