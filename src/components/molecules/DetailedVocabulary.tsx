import { ChevronDown, ChevronUp, Sparkles, Volume, Volume1, Volume2, VolumeX } from 'lucide-react';
import React from 'react'
import Heading from '../atoms/Heading';
import { Button } from '../atoms/Button';
import { Vocabulary } from '@/types';
import Text from '../atoms/Text';
import VolumeBar from '../atoms/VolumeBar';
import { getTagColor } from '@/lib/utils';

interface DetailedVocabularyProps {
    isOpen: boolean;
    volumes: Record<string, number>;
    form: Vocabulary;
    toggleAccordion: (idx: number) => void;
    handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    idx: number;
}

function DetailedVocabulary({ form, isOpen, volumes, toggleAccordion, idx, handleVolumeChange }: DetailedVocabularyProps) {
    const playAudio = (audioUrl: string, id: string) => {
        const audio = new Audio(audioUrl);
        audio.volume = volumes[id] ?? 1;
        audio.play();
    };

    const getVolumeIcon = (volume: number) => {
        if (volume === 0) return <VolumeX size={20} />;
        if (volume < 0.3) return <Volume size={20} />;
        if (volume < 0.7) return <Volume1 size={20} />;
        return <Volume2 size={20} />;
    };
    return (
        <div
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
                        className={`cursor-pointer p-3 text-content-tertiary-light hover:text-warning-600 dark:text-content-tertiary-dark dark:hover:text-warning-400 transition-all bg-background-icon-light hover:bg-warning-500/10 dark:bg-background-icon-dark dark:hover:bg-warning-500/20 rounded-xl hover:scale-105 dark:hover:scale-105 hover:shadow-md hover:shadow-warning-500/20 dark:hover:shadow-lg dark:hover:shadow-warning-400/30 dark:hover:border dark:hover:border-warning-400/30 flex-shrink-0 transform transition-transform duration-200 ${volumes[form.id] > 0 ? 'animate-pulse' : ''
                            }`}
                        title="Play pronunciation"
                        tabIndex={-1}
                    >
                        {getVolumeIcon(volumes[form.id] ?? 1)}
                    </Button>

                    <div className="w-24 flex items-center px-2 py-1.5 bg-background-slider-light dark:bg-background-slider-dark rounded-lg group">
                        {(() => {
                            const percent = (volumes[form.id] ?? 1) * 100;
                            const thumbWidthPercent = 8;
                            const left = Math.max(0, percent - thumbWidthPercent / 2);
                            const right = Math.min(100, percent + thumbWidthPercent / 2);
                            return (
                                <VolumeBar
                                    value={volumes[form.id] ?? 1}
                                    formId={form.id}
                                    handleVolumeChange={handleVolumeChange}
                                    left={left}
                                    right={right}
                                />
                            );
                        })()}
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
    )
}

export default DetailedVocabulary