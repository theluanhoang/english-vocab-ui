import React from 'react'
import { Button } from '../atoms/Button'
import { Volume2 } from 'lucide-react';

type AudioButtonProps = {
    audioUrl: string;
    pronunciation: string;
}

function AudioButton({ audioUrl, pronunciation }: AudioButtonProps) {

    const playAudio = (audioUrl: string) => {
        const audio = new Audio(audioUrl);
        audio.play();
    };
    
    return (
        <div className="flex flex-row md:flex-col items-end md:items-end gap-2 min-w-[120px] md:min-w-[120px]">
            <Button
                type="button"
                onClick={() => playAudio(audioUrl)}
                className="p-2 text-text-muted hover:text-primary dark:text-gray-400 dark:hover:text-primary-light transition-colors bg-surface-3 dark:bg-gray-600 rounded-xl hover:bg-surface-2 dark:hover:bg-gray-700"
                title="Play pronunciation"
            >
                <Volume2 size={20} />
            </Button>
            <div className="text-xs text-text-muted dark:text-gray-400 font-mono">
                {pronunciation}
            </div>
        </div>
    )
}

export default AudioButton