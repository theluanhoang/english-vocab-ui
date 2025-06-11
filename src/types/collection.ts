import { Vocabulary } from "./vocabulary";

enum CollectionType {
    FORM = 'FORM',
    SYNONYMS = 'SYNONYMS',
    MEANINGS = 'MEANINGS',
}

export interface Collection {
    id: string;
    name: string;
    description?: string | null;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    type: CollectionType;
    userId: string;
}

interface CollectionVocabulary {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    collectionId: string;
    vocabularyId: string;
    collection: Collection;
    vocabulary: Vocabulary;
}

interface GetCollectionResponse {
    id: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string | null;
    name: string;
    description: string | null;
    type: string;
    userId: string;
    collectionVocabularies: CollectionVocabulary[];
}

export type GetCollectionsResponse = GetCollectionResponse[];