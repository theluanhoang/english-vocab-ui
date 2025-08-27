import { PracticeMode } from '@/types/practice'
import Link from 'next/link'
import React from 'react'
import Heading from '../atoms/Heading';
import Text from '../atoms/Text';
import { Collection, GetCollectionResponse } from '@/types';

interface PracticeMethodProps {
    mode: PracticeMode;
    selectedCollection: GetCollectionResponse
}

function PracticeMethod({ mode, selectedCollection }: PracticeMethodProps) {
    return (
        <Link
            key={mode.id}
            href={`${mode.href}?collectionId=${selectedCollection.id}`}
            className="block"
        >
            <div className="card p-6 hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-primary/20 group">
                <div className="flex items-center gap-4 mb-4">
                    <div className={`p-3 rounded-lg text-white ${mode.color} group-hover:scale-110 transition-transform`}>
                        {mode.icon}
                    </div>
                    <div>
                        <Heading as="h3" className="text-xl font-semibold text-text-primary group-hover:text-primary transition-colors">
                            {mode.title}
                        </Heading>
                        <Text className="text-sm text-text-secondary">
                            {mode.description}
                        </Text>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">
                        {selectedCollection.collectionVocabularies.length} từ vựng
                    </span>
                    <div className="w-2 h-2 bg-primary rounded-full group-hover:scale-150 transition-transform" />
                </div>
            </div>
        </Link>
    )
}

export default PracticeMethod