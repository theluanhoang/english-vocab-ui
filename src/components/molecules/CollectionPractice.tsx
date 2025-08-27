import React from 'react'
import Text from '../atoms/Text'
import Heading from '../atoms/Heading'
import { GetCollectionResponse } from '@/types';
import { BookOpen } from 'lucide-react';

interface CollectionPracticeProps {
    collection: GetCollectionResponse;
    onClick: () => void;
}

function CollectionPractice({ collection, onClick }: CollectionPracticeProps) {
    return (
        <div
            key={collection.id}
            className="card p-6 hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-primary/20"
            onClick={onClick}
        >
            <div className="flex items-center gap-3 mb-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                    <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div>
                    <Heading as="h3" className="text-lg font-semibold text-text-primary">
                        {collection.name}
                    </Heading>
                    <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-secondary/10 text-secondary">
                        {collection.type}
                    </span>
                </div>
            </div>
            <Text className="text-sm text-text-secondary mb-3">
                {collection.collectionVocabularies.length} từ vựng
            </Text>
            <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(collection.collectionVocabularies.length * 2, 100)}%` }}
                />
            </div>
        </div>
    )
}

export default CollectionPractice