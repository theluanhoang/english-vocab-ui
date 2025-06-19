"use client";
import Link from "next/link";
import { FolderOpenDot } from "lucide-react";
import Heading from "@/components/atoms/Heading";
import Text from "@/components/atoms/Text";
import { useEffect, useState } from "react";
import { collectionService } from "@/app/services/collection.service";
import { GetCollectionsResponse } from "@/types/collection";
import { useSessionExpired } from "@/contexts/SessionExpiredContext";
import IntroductionSection from "@/components/molecules/IntroductionSection";

export default function CollectionsPage() {
  const [collections, setCollections] = useState<GetCollectionsResponse>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { open: isSessionExpired } = useSessionExpired();

  useEffect(() => {
    if (isSessionExpired) return;

    const fetchCollections = async () => {
      try {
        setIsLoading(true);
        const data = await collectionService.getAllCollections();
        setCollections(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch collections');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollections();
  }, [isSessionExpired]);

  if (isSessionExpired) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background dark:bg-background flex items-center justify-center">
        <Text>Loading collections...</Text>
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

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <IntroductionSection 
          title={'My Vocabulary Collections'} 
          description={'Review and manage your analyzed vocabulary collections. Click a collection to view its words.'} 
          icon={FolderOpenDot}
        />
        <div className="space-y-6 md:space-y-8">
          {collections.map((col) => (
            <div
              key={col.id}
              className="rounded-2xl border border-border-subtle dark:border-gray-700 bg-surface-1 dark:bg-gray-800 shadow-lg transition-all hover:shadow-xl hover:shadow-gray-200 dark:hover:shadow-gray-900/70"
            >
              <Link
                href={`/collections/${col.id}`}
                className="w-full flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-8 py-4 md:py-6 focus:outline-none group cursor-pointer gap-4"
              >
                <div className="flex items-center gap-3 md:gap-4 text-left w-full md:w-auto">
                  <div className="p-2 bg-secondary/10 dark:bg-secondary/20 rounded-lg">
                    <FolderOpenDot className="w-5 h-5 text-secondary dark:text-secondary-light" />
                  </div>
                  <div>
                    <Heading as="h3" className="text-xl md:text-2xl font-bold text-text-primary dark:text-white">{col.name}</Heading>
                    <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full mt-1 bg-secondary/10 text-secondary dark:bg-secondary/20 dark:text-secondary-light">
                      {col.type}
                    </span>
                  </div>
                </div>
                <span className="text-sm text-text-secondary dark:text-gray-400 whitespace-nowrap">{col.collectionVocabularies.length} words</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 