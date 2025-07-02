import React from 'react'
import Heading from '../atoms/Heading'
import { Collection } from '@/types'
import Text from '../atoms/Text';

interface HeaderCollectionProps {
    collection: Collection;
}

function HeaderCollection({ collection }: HeaderCollectionProps) {
    return (
        <div className="mb-6 md:mb-8">
            <Heading as="h1" className="text-2xl md:text-3xl font-bold text-content-primary-light dark:text-content-primary-dark mb-2 flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center md:text-left">
                {collection.name}
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary-light">
                    {collection.type}
                </span>
            </Heading>
            {collection.description && (
                <Text as="p" className="text-content-secondary-light dark:text-content-secondary-dark mb-2">{collection.description}</Text>
            )}
            <div className="text-xs text-text-muted dark:text-gray-400">
                Created at: {new Date(collection.createdAt).toLocaleString()}
            </div>
        </div>
    )
}

export default HeaderCollection