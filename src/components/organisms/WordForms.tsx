'use client';

import { useState } from 'react';
import { Send, Volume2, BookOpen, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { mockWordFormsResponse } from '@/mocks/wordForms';
import { Vocabulary } from '@/types';

export function getTagColor(partOfSpeech: string) {
  switch (partOfSpeech.toLowerCase()) {
    case 'verb':
      return 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900';
    case 'noun':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-900';
    case 'adjective':
      return 'bg-purple-100 text-purple-800 dark:bg-purple-200 dark:text-purple-900';
    case 'adverb':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900';
    case 'participle':
      return 'bg-pink-100 text-pink-800 dark:bg-pink-200 dark:text-pink-900';
    default:
      return 'bg-gray-200 text-gray-800 dark:bg-gray-300 dark:text-gray-900';
  }
}

export default function WordForms() {
  const [word, setWord] = useState('');
  const [wordForms, setWordForms] = useState<Vocabulary[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWordForms(mockWordFormsResponse.words);
      setOpenIndexes([]);
    } catch (error) {
      console.error('Error fetching word forms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.play();
  };

  const toggleAccordion = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="min-h-screen bg-background dark:bg-background-dark">
      <div className="max-w-4xl mx-auto px-4 py-8 bg-background dark:bg-background-dark">
        <div className="text-center mb-8 md:mb-12">
            <div className="inline-block p-3 bg-background-icon-light dark:bg-background-icon-dark rounded-full">
              <BookOpen className="w-8 h-8 text-warning-500 dark:text-primary-light" />
            </div>
            <h1 className="text-4xl font-bold text-content-primary-light dark:text-content-primary-dark mb-3">Word Forms Analyzer</h1>
            <p className="text-content-secondary-light dark:text-content-secondary-dark max-w-2xl mx-auto">
              Discover the different forms and meanings of English words. Enter a word to explore its variations, definitions, and usage examples.
            </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-8 md:mb-12">
          <div className="flex flex-col sm:flex-row items-center gap-3 max-w-2xl mx-auto">
            <div className="flex-1 relative w-full">
              <input
                type="text"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Enter a word (e.g., certify)"
                className="w-full px-5 h-14 sm:h-[56px] rounded-xl border border-border-light dark:border-border-dark bg-background-input-light dark:bg-background-input-dark text-content-primary-light dark:text-content-primary-dark placeholder-content-tertiary-light dark:placeholder-content-tertiary-dark focus:ring-2 focus:ring-warning-500 focus:border-transparent outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer px-6 h-14 sm:h-[56px] bg-yellow-500 hover:bg-yellow-400 dark:bg-yellow-500 dark:hover:bg-yellow-400 text-gray-900 font-semibold rounded-xl border-none focus:ring-2 focus:ring-yellow-400/50 focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-yellow-400/20 hover:shadow-xl hover:shadow-yellow-400/30 transform hover:-translate-y-0.5 flex-shrink-0"
            >
              <Send size={20} />
              {isLoading ? 'Analyzing...' : 'Analyze'}
            </button>
          </div>
        </form>

        {wordForms.length > 0 && (
          <div className="space-y-4 md:space-y-6">
            {wordForms.map((form, idx) => {
              const isOpen = openIndexes.includes(idx);
              return (
                <div
                  key={form.id}
                  className={`rounded-2xl border border-gray-200 dark:border-gray-700 bg-background-card-light dark:bg-background-card-dark shadow-sm transition-all ${isOpen ? 'shadow-md ring-2 ring-warning-500/30 dark:ring-warning-500/30' : 'hover:shadow-md'}`}
                >
                  <button
                    className="w-full flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-8 py-4 md:py-6 focus:outline-none group gap-4"
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3 md:gap-4 text-left w-full md:w-auto">
                      <div className="p-2 bg-background-icon-light dark:bg-background-icon-dark rounded-lg">
                        <Sparkles className="w-5 h-5 text-warning-500 dark:text-primary-light" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-content-primary-light dark:text-content-primary-dark">{form.word}</h3>
                        <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mt-1 shadow-sm border border-transparent ${getTagColor(form.partOfSpeech)}`}>
                          {form.partOfSpeech}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); playAudio(form.audio); }}
                        className="cursor-pointer p-3 text-content-tertiary-light hover:text-warning-600 dark:text-content-tertiary-dark dark:hover:text-warning-400 transition-all bg-background-icon-light hover:bg-warning-500/10 dark:bg-background-icon-dark dark:hover:bg-warning-500/20 rounded-xl hover:scale-105 dark:hover:scale-105 hover:shadow-md hover:shadow-warning-500/20 dark:hover:shadow-lg dark:hover:shadow-warning-400/30 dark:hover:border dark:hover:border-warning-400/30"
                        title="Play pronunciation"
                        tabIndex={-1}
                      >
                        <Volume2 size={20} />
                      </button>
                      {isOpen ? (
                        <ChevronUp className="w-6 h-6 text-warning-500 dark:text-warning-400" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-warning-500 dark:text-warning-400" />
                      )}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-4 md:px-8 pb-6 md:pb-8 pt-2 animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-3 md:space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-content-secondary-light dark:text-content-secondary-dark mb-2">Pronunciation:</h4>
                            <p className="text-content-primary-light dark:text-content-primary-dark font-mono bg-background-icon-light dark:bg-background-icon-dark px-3 py-2 rounded-lg border border-border-light dark:border-border-dark">
                              {form.pronunciation}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-content-secondary-light dark:text-content-secondary-dark mb-2">Definition:</h4>
                            <p className="text-content-primary-light dark:text-content-primary-dark bg-background-icon-light dark:bg-background-icon-dark px-3 py-2 rounded-lg border border-border-light dark:border-border-dark">
                              {form.definition}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-3 md:space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-content-secondary-light dark:text-content-secondary-dark mb-2">Meaning:</h4>
                            <p className="text-content-primary-light dark:text-content-primary-dark bg-background-icon-light dark:bg-background-icon-dark px-3 py-2 rounded-lg border border-border-light dark:border-border-dark">
                              {form.definition}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-content-secondary-light dark:text-content-secondary-dark mb-2">Example:</h4>
                            <p className="text-content-primary-light dark:text-content-primary-dark bg-background-icon-light dark:bg-background-icon-dark px-3 py-2 rounded-lg border border-border-light dark:border-border-dark italic">
                              "{form.exampleSentence}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
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