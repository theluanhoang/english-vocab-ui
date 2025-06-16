'use client';

import { useState } from 'react';
import { Send, Volume2, BookOpen, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { WordForm, WordFormsResponse } from '@/types/word';
import { mockWordFormsResponse } from '@/mocks/wordForms';

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
  const [wordForms, setWordForms] = useState<WordForm[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) return;

    setIsLoading(true);
    try {
      // Simulate API call delay
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
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="text-center mb-8 md:mb-12">
            <div className="inline-block p-3 bg-primary/10 dark:bg-primary/20 rounded-full">
              <BookOpen className="w-8 h-8 text-primary dark:text-primary-light" />
            </div>
            <h1 className="text-4xl font-bold text-text-primary dark:text-white mb-3">Word Forms Analyzer</h1>
            <p className="text-text-secondary dark:text-gray-300 max-w-2xl mx-auto">
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
                className="w-full px-5 h-14 sm:h-[56px] rounded-xl border border-border-subtle dark:border-gray-700 bg-surface-1 dark:bg-gray-800 text-text-primary dark:text-white placeholder-text-muted dark:placeholder-gray-500 focus:ring-2 focus:ring-primary dark:focus:ring-primary-light focus:border-transparent outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 h-14 sm:h-[56px] bg-warning cursor-pointer hover:bg-yellow-400 dark:bg-yellow-400 dark:hover:bg-yellow-300 text-gray-900 font-semibold rounded-xl border-2 border-yellow-300 dark:border-yellow-200 focus:ring-2 focus:ring-warning focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-yellow-200/40 dark:shadow-yellow-200/40 hover:shadow-xl hover:shadow-yellow-300/60 dark:hover:shadow-yellow-100/60 transform hover:-translate-y-0.5 flex-shrink-0"
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
                  className={`rounded-2xl border border-border-subtle dark:border-gray-700 bg-surface-1 dark:bg-gray-800 shadow-lg transition-all ${isOpen ? 'shadow-xl ring-2 ring-warning/30 dark:ring-yellow-300/30' : 'hover:shadow-xl hover:shadow-gray-200 dark:hover:shadow-gray-900/70'}`}
                >
                  <button
                    className="w-full flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-8 py-4 md:py-6 focus:outline-none group gap-4"
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3 md:gap-4 text-left w-full md:w-auto">
                      <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                        <Sparkles className="w-5 h-5 text-primary dark:text-primary-light" />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-text-primary dark:text-white">{form.word}</h3>
                        <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mt-1 shadow-sm border border-transparent ${getTagColor(form.partOfSpeech)}`}>
                          {form.partOfSpeech}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={e => { e.stopPropagation(); playAudio(form.audio); }}
                        className="p-3 text-text-muted hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-colors bg-surface-2 dark:bg-gray-700 rounded-xl hover:bg-surface-3 dark:hover:bg-gray-600"
                        title="Play pronunciation"
                        tabIndex={-1}
                      >
                        <Volume2 size={20} />
                      </button>
                      {isOpen ? (
                        <ChevronUp className="w-6 h-6 text-warning dark:text-yellow-300 transition-transform" />
                      ) : (
                        <ChevronDown className="w-6 h-6 text-warning dark:text-yellow-300 transition-transform" />
                      )}
                    </div>
                  </button>
                  {isOpen && (
                    <div className="px-4 md:px-8 pb-6 md:pb-8 pt-2 animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-3 md:space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-text-muted dark:text-gray-400 mb-2">Pronunciation:</h4>
                            <p className="text-text-primary dark:text-white font-mono bg-surface-2 dark:bg-gray-700 px-3 py-2 rounded-lg">
                              {form.pronunciation}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-text-muted dark:text-gray-400 mb-2">Definition:</h4>
                            <p className="text-text-primary dark:text-white bg-surface-2 dark:bg-gray-700 px-3 py-2 rounded-lg">
                              {form.definition}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-3 md:space-y-4">
                          <div>
                            <h4 className="text-sm font-medium text-text-muted dark:text-gray-400 mb-2">Meaning:</h4>
                            <p className="text-text-primary dark:text-white bg-surface-2 dark:bg-gray-700 px-3 py-2 rounded-lg">
                              {form.meaning}
                            </p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-text-muted dark:text-gray-400 mb-2">Example:</h4>
                            <p className="text-text-primary dark:text-white bg-surface-2 dark:bg-gray-700 px-3 py-2 rounded-lg italic">
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
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-warning dark:border-yellow-400 border-t-transparent"></div>
          </div>
        )}
      </div>
    </div>
  );
} 