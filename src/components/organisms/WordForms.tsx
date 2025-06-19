'use client';

import React, { useState } from 'react';
import { Send, Volume2, Volume1, Volume, VolumeX, BookOpen, Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import { mockWordFormsResponse } from '@/mocks/wordForms';
import { Vocabulary } from '@/types';
import IntroductionSection from '../molecules/IntroductionSection';
import { Button } from '../atoms/Button';
import Input from '../atoms/Input';
import Heading from '../atoms/Heading';
import Text from '../atoms/Text';

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
  const [volumes, setVolumes] = useState<{ [id: string]: number }>({});
  const [showVolumeSlider, setShowVolumeSlider] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!word.trim()) return;

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setWordForms(mockWordFormsResponse.words);
      setOpenIndexes([]);
      const newVolumes: { [id: string]: number } = {};
      mockWordFormsResponse.words.forEach((word: Vocabulary) => {
        newVolumes[word.id] = 1;
      });
      setVolumes(newVolumes);
    } catch (error) {
      console.error('Error fetching word forms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = (audioUrl: string, id: string) => {
    const audio = new Audio(audioUrl);
    audio.volume = volumes[id] ?? 1;
    audio.play();
  };

  const toggleAccordion = (idx: number) => {
    setOpenIndexes((prev) =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const newVolume = parseFloat(e.target.value);
    setVolumes(prev => ({
      ...prev,
      [id]: newVolume
    }));
    setShowVolumeSlider(null);
  };

  const getVolumeIcon = (volume: number) => {
    if (volume === 0) return <VolumeX size={20} />;
    if (volume < 0.3) return <Volume size={20} />;
    if (volume < 0.7) return <Volume1 size={20} />;
    return <Volume2 size={20} />;
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
                <div
                  key={form.id}
                  className={`rounded-2xl border border-border-light dark:border-border-dark bg-background-card-light dark:bg-background-card-dark shadow-sm transition-all ${isOpen ? 'shadow-md ring-2 ring-warning-500/30 dark:ring-warning-500/30' : 'hover:shadow-md'}`}
                >
                  <div
                    className="w-full flex flex-col md:flex-row items-start md:items-center justify-between px-4 md:px-8 py-4 md:py-6 focus:outline-none group gap-4 cursor-pointer select-none"
                    role="button"
                    tabIndex={0}
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3 md:gap-4 text-left w-full md:w-auto">
                      <div className="p-2 bg-background-icon-light dark:bg-background-icon-dark rounded-lg">
                        <Sparkles className="w-5 h-5 text-warning-500 dark:text-warning-400" />
                      </div>
                      <div>
                        <Heading as='h3' className="text-xl md:text-2xl font-bold text-content-primary-light dark:text-content-primary-dark">{form.word}</Heading>
                        <span className={`inline-block px-3 py-1 text-sm font-semibold rounded-full mt-1 shadow-sm border border-transparent ${getTagColor(form.partOfSpeech)}`}>
                          {form.partOfSpeech}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        type="button"
                        onClick={e => { e.stopPropagation(); playAudio(form.audio, form.id); }}
                        className={`cursor-pointer p-3 text-content-tertiary-light hover:text-warning-600 dark:text-content-tertiary-dark dark:hover:text-warning-400 transition-all bg-background-icon-light hover:bg-warning-500/10 dark:bg-background-icon-dark dark:hover:bg-warning-500/20 rounded-xl hover:scale-105 dark:hover:scale-105 hover:shadow-md hover:shadow-warning-500/20 dark:hover:shadow-lg dark:hover:shadow-warning-400/30 dark:hover:border dark:hover:border-warning-400/30 flex-shrink-0 transform transition-transform duration-200 ${
                          volumes[form.id] > 0 ? 'animate-pulse' : ''
                        }`}
                        title="Play pronunciation"
                        tabIndex={-1}
                      >
                        {getVolumeIcon(volumes[form.id] ?? 1)}
                      </Button>

                      <div className="w-24 flex items-center px-2 py-1.5 bg-background-slider-light dark:bg-background-slider-dark rounded-lg group">
                        <Input
                          type="range"
                          min="0"
                          max="1"
                          step="0.01"
                          value={volumes[form.id] ?? 1}
                          onClick={(e) => e.stopPropagation()}
                          onChange={(e) => handleVolumeChange(e, form.id)}
                          className={`w-full h-1 bg-background-slider-track-light dark:bg-background-slider-track-dark rounded-full appearance-none cursor-pointer transition-all duration-200
                          [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-background-slider-thumb-light [&::-webkit-slider-thumb]:dark:bg-background-slider-thumb-dark [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:transition-all hover:[&::-webkit-slider-thumb]:scale-110 
                          [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-background-slider-thumb-light [&::-moz-range-thumb]:dark:bg-background-slider-thumb-dark [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:transition-all hover:[&::-moz-range-thumb]:scale-110
                          group-hover:shadow-lg`}
                          style={{
                            background: `linear-gradient(to right, var(--warning-500) 0%, var(--warning-500) ${(volumes[form.id] ?? 1) * 100}%, var(--background-slider-track-light) ${(volumes[form.id] ?? 1) * 100}%, var(--background-slider-track-light) 100%)`
                          }}
                        />
                      </div>

                      <Button 
                        type="button"
                        onClick={e => { e.stopPropagation(); toggleAccordion(idx); }}
                        className="flex-shrink-0"
                      >
                        {isOpen ? (
                          <ChevronUp className="w-6 h-6 text-warning-500 dark:text-warning-400" />
                        ) : (
                          <ChevronDown className="w-6 h-6 text-warning-500 dark:text-warning-400" />
                        )}
                      </Button>
                    </div>
                  </div>
                  {isOpen && (
                    <div className="px-4 md:px-8 pb-6 md:pb-8 pt-2 animate-fade-in">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div className="space-y-3 md:space-y-4">
                          <div>
                            <Heading as='h4' className="text-sm font-medium text-content-secondary-light dark:text-content-secondary-dark mb-2">Pronunciation:</Heading>
                            <Text className="text-content-primary-light dark:text-content-primary-dark font-mono bg-background-icon-light dark:bg-background-icon-dark px-3 py-2 rounded-lg border border-border-light dark:border-border-dark">
                              {form.pronunciation}
                            </Text>
                          </div>
                          <div>
                            <Heading as='h4' className="text-sm font-medium text-content-secondary-light dark:text-content-secondary-dark mb-2">Definition:</Heading>
                            <Text className="text-content-primary-light dark:text-content-primary-dark bg-background-icon-light dark:bg-background-icon-dark px-3 py-2 rounded-lg border border-border-light dark:border-border-dark">
                              {form.definition}
                            </Text>
                          </div>
                        </div>
                        <div className="space-y-3 md:space-y-4">
                          <div>
                            <Heading as='h4' className="text-sm font-medium text-content-secondary-light dark:text-content-secondary-dark mb-2">Meaning:</Heading>
                            <Text className="text-content-primary-light dark:text-content-primary-dark bg-background-icon-light dark:bg-background-icon-dark px-3 py-2 rounded-lg border border-border-light dark:border-border-dark">
                              {form.definition}
                            </Text>
                          </div>
                          <div>
                            <Heading as='h4' className="text-sm font-medium text-content-secondary-light dark:text-content-secondary-dark mb-2">Example:</Heading>
                            <Text className="text-content-primary-light dark:text-content-primary-dark bg-background-icon-light dark:bg-background-icon-dark px-3 py-2 rounded-lg border border-border-light dark:border-border-dark italic">
                              "{form.exampleSentence}"
                            </Text>
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