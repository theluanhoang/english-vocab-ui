import React from 'react'

interface VolumeBarProps {
    value: number;
    formId: string;
    handleVolumeChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
    left: number;
    right: number;
}

function VolumeBar({ value, formId, handleVolumeChange, left, right }: VolumeBarProps) {
    return (
        <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={value}
            onClick={(e) => e.stopPropagation()}
            onChange={(e) => handleVolumeChange(e, formId)}
            className={`w-full h-1 bg-background-slider-track-light dark:bg-background-slider-track-dark rounded-full appearance-none cursor-pointer transition-all duration-200
                              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-background-slider-thumb-light [&::-webkit-slider-thumb]:dark:bg-background-slider-thumb-dark [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-0 [&::-webkit-slider-thumb]:transition-all hover:[&::-webkit-slider-thumb]:scale-110 
                              [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-background-slider-thumb-light [&::-moz-range-thumb]:dark:bg-background-slider-thumb-dark [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:transition-all hover:[&::-moz-range-thumb]:scale-110
                              group-hover:shadow-lg`}
            style={{
                background: `linear-gradient(to right, #f59e42 0%, #f59e42 ${left}%, #e5e7eb ${right}%, #e5e7eb 100%)`
            }}
        />
    )
}

export default VolumeBar