'use client';

import React, { useState, useEffect } from 'react';
import { BookOpen, Target, PenTool, Volume2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { collectionService } from '@/app/services/collection.service';
import { GetCollectionsResponse } from '@/types/collection';
import { useSessionExpired } from '@/contexts/SessionExpiredContext';
import IntroductionSection from '@/components/molecules/IntroductionSection';
import { Button } from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import Heading from '@/components/atoms/Heading';

interface PracticeMode {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  href: string;
}

export default function PracticePage() {
  const [collections, setCollections] = useState<GetCollectionsResponse>([]);
  const [selectedCollection, setSelectedCollection] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { open: isSessionExpired } = useSessionExpired();

  const practiceModes: PracticeMode[] = [
    {
      id: 'match-words',
      title: 'Ghép Từ Và Nghĩa',
      description: 'Ghép từ tiếng Anh với nghĩa tiếng Việt tương ứng',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-blue-500',
      href: '/practice/match-words'
    },
    {
      id: 'fill-blanks',
      title: 'Điền Từ Vào Câu',
      description: 'Chọn từ tiếng Anh phù hợp để hoàn thiện câu',
      icon: <PenTool className="w-6 h-6" />,
      color: 'bg-green-500',
      href: '/practice/fill-blanks'
    },
    {
      id: 'multiple-choice',
      title: 'Trắc Nghiệm Từ Vựng',
      description: 'Chọn nghĩa đúng cho từ tiếng Anh được cho',
      icon: <Target className="w-6 h-6" />,
      color: 'bg-purple-500',
      href: '/practice/multiple-choice'
    },
    {
      id: 'listen-write',
      title: 'Nghe Và Viết',
      description: 'Nghe từ tiếng Anh và viết lại cho đúng',
      icon: <Volume2 className="w-6 h-6" />,
      color: 'bg-orange-500',
      href: '/practice/listen-write'
    }
  ];

  useEffect(() => {
    if (isSessionExpired) return;

    const fetchCollections = async () => {
      try {
        setIsLoading(true);
        const data = await collectionService.getAllCollections();
        setCollections(data);
      } catch (err) {
        console.error('Failed to fetch collections:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollections();
  }, [isSessionExpired]);

  if (isSessionExpired) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Text>Đang tải bộ sưu tập...</Text>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <IntroductionSection 
          title="Luyện Tập Từ Vựng" 
          description="Chọn bộ sưu tập và phương thức luyện tập phù hợp với bạn"
          icon={BookOpen}
        />

        {!selectedCollection ? (
          <>
            <div className="mb-8">
              <Heading as="h2" className="text-2xl font-bold mb-4 text-text-primary">
                Chọn Bộ Sưu Tập
              </Heading>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {collections.map((collection) => (
                  <div
                    key={collection.id}
                    className="card p-6 hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-primary/20"
                    onClick={() => setSelectedCollection(collection)}
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
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={() => setSelectedCollection(null)}
                className="mb-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay lại bộ sưu tập
              </Button>
              <Heading as="h2" className="text-2xl font-bold mb-2 text-text-primary">
                {selectedCollection.name}
              </Heading>
              <Text className="text-text-secondary mb-6">
                Chọn phương thức luyện tập bạn muốn thực hiện
              </Text>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {practiceModes.map((mode) => (
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
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
} 