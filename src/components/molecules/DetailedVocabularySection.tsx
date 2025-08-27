import React from 'react'
import Heading from '../atoms/Heading'
import AudioButton from './AudioButton'
import { Vocabulary } from '@/types';
import { getTagColor } from '@/lib/utils';
import Text from '../atoms/Text';

type DetailedVocabularySectionProps = {
    vocabulary: Vocabulary;
}

function DetailVocabularySection({ vocabulary }: DetailedVocabularySectionProps) {
    return (
        <div className="px-4 md:px-8 pb-6 md:pb-8 pt-2 animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-3 md:space-y-4">
                    <div>
                        <Heading as='h4' className="text-sm font-medium text-content-secondary-light dark:text-content-secondary-dark mb-2">Pronunciation:</Heading>
                        <Text className="text-content-primary-light dark:text-content-primary-dark font-mono bg-background-icon-light dark:bg-background-icon-dark px-3 py-2 rounded-lg border border-border-light dark:border-border-dark">
                            {vocabulary.pronunciation}
                        </Text>
                    </div>
                    <div>
                        <Heading as='h4' className="text-sm font-medium text-content-secondary-light dark:text-content-secondary-dark mb-2">Definition:</Heading>
                        <Text className="text-content-primary-light dark:text-content-primary-dark bg-background-icon-light dark:bg-background-icon-dark px-3 py-2 rounded-lg border border-border-light dark:border-border-dark">
                            {vocabulary.definition}
                        </Text>
                    </div>
                </div>
                <div className="space-y-3 md:space-y-4">
                    <div>
                        <Heading as='h4' className="text-sm font-medium text-content-secondary-light dark:text-content-secondary-dark mb-2">Meaning:</Heading>
                        <Text className="text-content-primary-light dark:text-content-primary-dark bg-background-icon-light dark:bg-background-icon-dark px-3 py-2 rounded-lg border border-border-light dark:border-border-dark">
                            {vocabulary.meaning}
                        </Text>
                    </div>
                    <div>
                        <Heading as='h4' className="text-sm font-medium text-content-secondary-light dark:text-content-secondary-dark mb-2">Example:</Heading>
                        <Text className="text-content-primary-light dark:text-content-primary-dark bg-background-icon-light dark:bg-background-icon-dark px-3 py-2 rounded-lg border border-border-light dark:border-border-dark italic">
                            "{vocabulary.exampleSentence} {vocabulary.translatedExample ?? (vocabulary.translatedExample)}"
                        </Text>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailVocabularySection;