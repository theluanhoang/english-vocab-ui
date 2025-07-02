"use client";
import { useParams, notFound } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, BookOpen } from "lucide-react";
import Link from "next/link";
import Heading from "@/components/atoms/Heading";
import Text from "@/components/atoms/Text";
import VocabularyCard from "@/components/molecules/VocabularyCard";
import { collectionService } from "@/app/services/collection.service";
import { GetCollectionsResponse } from "@/types/collection";
import { useVolume } from "@/hooks/useVolume";
import IntroductionSection from "@/components/molecules/IntroductionSection";

export default function CollectionDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [collection, setCollection] = useState<GetCollectionsResponse[0] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const { volumes, setVolumes, handleVolumeChange } = useVolume();

  useEffect(() => {
    if (!id) return;
    const fetchCollection = async () => {
      try {
        setIsLoading(true);
        const collections = await collectionService.getAllCollections({ collectionId: id });
        if (!collections || collections.length === 0) {
          setCollection(null);
        } else {
          setCollection(collections[0]);
          // Initialize volumes for all vocabularies using the hook
          const ids = collections[0].collectionVocabularies.map((item: any) => item.vocabulary.id);
          setVolumes(Object.fromEntries(ids.map(id => [id, 1])));
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch collection');
      } finally {
        setIsLoading(false);
      }
    };
    fetchCollection();
  }, [id, setVolumes]);

  const toggleAccordion = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background dark:bg-background flex items-center justify-center">
        <Text>Loading collection...</Text>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background dark:bg-background flex items-center justify-center">
        <Text className="text-red-500">{error}</Text>
      </div>
    );
  }

  if (!collection) return notFound();

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <Link href="/collections" className="inline-flex items-center gap-2 text-primary hover:underline mb-4 md:mb-6">
          <ArrowLeft className="w-5 h-5" /> Back to Collections
        </Link>
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
        <div className="space-y-4 md:space-y-6">
          {collection.collectionVocabularies.map((item, idx) => (
            <VocabularyCard
              key={item.vocabulary.id}
              vocabulary={item.vocabulary}
              isOpen={openIndexes.includes(idx)}
              volumes={volumes}
              toggleAccordion={toggleAccordion}
              handleVolumeChange={handleVolumeChange}
              idx={idx}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 