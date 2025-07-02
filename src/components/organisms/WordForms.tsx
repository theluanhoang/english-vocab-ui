'use client';

import React, { useState } from 'react';
import { Send, Volume2, Volume1, Volume, VolumeX, BookOpen, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { mockWordFormsResponse } from '@/mocks/wordForms';
import { Vocabulary } from '@/types';
import IntroductionSection from '../molecules/IntroductionSection';
import { Button } from '../atoms/Button';
import Input from '../atoms/Input';
import VocabularyCard from '../molecules/VocabularyCard';
import { vocabularyService } from '@/app/services/vocabulary.service';
import { useVolume } from "@/hooks/useVolume";

export default function WordForms() {
  const [word, setWord] = useState('');
  const [wordForms, setWordForms] = useState<Vocabulary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const { volumes, setVolumes, handleVolumeChange } = useVolume();
  const [error, setError] = useState<string | null>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) return;

    setIsLoading(true);
    try {
      const data = await vocabularyService.analyzeWord(word);
      setWordForms(data.words);
      setOpenIndexes([]);
      const ids = data.words.map((word: Vocabulary) => word.id);
      setVolumes(Object.fromEntries(ids.map((id: string) => [id, 1])));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze word');
      console.error('Error fetching word forms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleAccordion = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="max-w-4xl mx-auto px-4 py-8 bg-background-light dark:bg-background-dark">
        <IntroductionSection
          title={'Word Forms Analyzer'}
          description={'Discover the different forms and meanings of English words. Enter a word to explore its variations, definitions, and usage examples.'}
          icon={BookOpen}
        />

        <form onSubmit={handleSubmit} className="mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row items-center gap-3 max-w-2xl mx-auto">
            <div className="flex-1 relative w-full">
              <Input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Enter a word (e.g., certify)"
                className="w-full px-5 h-14 sm:h-[56px] rounded-xl border border-border-light dark:border-border-dark bg-background-input-light dark:bg-background-input-dark text-content-primary-light dark:text-content-primary-dark placeholder-content-tertiary-light dark:placeholder-content-tertiary-dark focus:ring-2 focus:ring-warning-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <Button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer px-6 h-14 sm:h-[56px] bg-yellow-500 hover:bg-yellow-400 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-gray-900 font-semibold rounded-xl border-none focus:ring-2 focus:ring-yellow-400/50 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-yellow-400/20 hover:shadow-xl hover:shadow-yellow-400/30 transform hover:-translate-y-0.5 flex-shrink-0"
            >
              <Send size={20} />
              {isLoading ? 'Analyzing...' : 'Analyze'}
            </Button>
          </div>
        </form>

        {wordForms.length > 0 && (
          <div className="space-y-4 md:space-y-6">
            {wordForms.map((form, idx) => {
              const isOpen = openIndexes.includes(idx);
              return (
                <VocabularyCard
                  key={form.id}
                  vocabulary={form}
                  isOpen={isOpen}
                  volumes={volumes}
                  toggleAccordion={toggleAccordion}
                  handleVolumeChange={handleVolumeChange}
                  idx={idx}
                />
              );
            })}
          </div>
        )}

        {isLoading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-warning-500 dark:border-warning-400 border-t-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
} 