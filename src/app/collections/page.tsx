"use client";
import Link from "next/link";
import { mockCollections } from "@/mocks/collections";
import { FolderOpenDot } from "lucide-react";
import Heading from "@/components/atoms/Heading";
import Text from "@/components/atoms/Text";

export default function CollectionsPage() {

  return (
    <div className="min-h-screen bg-background dark:bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center md:text-left mb-8 md:mb-12">
          <div className="text-center">
            <div className="inline-block p-3 bg-secondary/10 dark:bg-secondary/20 rounded-full">
              <FolderOpenDot className="w-8 h-8 text-secondary dark:text-secondary-light" />
            </div>
            <Heading as="h1" className="text-4xl font-bold text-text-primary dark:text-white mb-3">My Vocabulary Collections</Heading>
            <Text as="p" className="text-text-secondary dark:text-gray-300 max-w-2xl mx-auto">
              Review and manage your analyzed vocabulary collections. Click a collection to view its words.
            </Text>
          </div>
        </div>
        <div className="space-y-6 md:space-y-8">
          {mockCollections.map((col) => (
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
                <span className="text-sm text-text-muted dark:text-gray-400 whitespace-nowrap">{col.collectionVocabularies.length} words</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 