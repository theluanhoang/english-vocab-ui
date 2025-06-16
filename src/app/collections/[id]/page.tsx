"use client";
import { useParams, notFound } from "next/navigation";
import { mockCollections } from "@/mocks/collections";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Heading from "@/components/atoms/Heading";
import Text from "@/components/atoms/Text";
import VocabularyCard from "@/components/molecules/VocabularyCard";

export default function CollectionDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const collection = mockCollections.find((c) => c.id === id);

  if (!collection) return notFound();

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/collections" className="inline-flex items-center gap-2 text-primary hover:underline mb-4 md:mb-6">
          <ArrowLeft className="w-5 h-5" /> Back to Collections
        </Link>
        <div className="mb-6 md:mb-8">
          <Heading as="h1" className="text-2xl md:text-3xl font-bold text-text-primary dark:text-white mb-2 flex flex-col md:flex-row items-center gap-2 md:gap-3 text-center md:text-left">
            {collection.name}
            <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary-light">
              {collection.type}
            </span>
          </Heading>
          {collection.description && (
            <Text as="p" className="text-text-secondary dark:text-gray-300 mb-2">{collection.description}</Text>
          )}
          <div className="text-xs text-text-secondary dark:text-gray-400">
            Created at: {new Date(collection.createdAt).toLocaleString()}
          </div>
        </div>
        <div className="space-y-4 md:space-y-6">
          {collection.collectionVocabularies.map((item) => (
            <VocabularyCard key={item.vocabulary.id} vocabulary={item.vocabulary} />
          ))}
        </div>
      </div>
    </div>
  );
} 