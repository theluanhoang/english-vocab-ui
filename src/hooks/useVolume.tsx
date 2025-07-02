import { useState, useCallback } from 'react';

/**
 * useVolume - A reusable hook for managing volume state for vocabulary items.
 * @param initialIds - Optional array of vocabulary ids to initialize volume state (default 1 for each)
 * @returns { volumes, setVolumes, handleVolumeChange }
 */
export function useVolume(initialIds?: string[]) {
  const [volumes, setVolumes] = useState<{ [id: string]: number }>(() => {
    if (!initialIds) return {};
    const obj: { [id: string]: number } = {};
    initialIds.forEach(id => { obj[id] = 1; });
    return obj;
  });

  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, id: string) => {
    const newVolume = parseFloat(e.target.value);
    setVolumes(prev => ({
      ...prev,
      [id]: newVolume
    }));
  }, []);

  return { volumes, setVolumes, handleVolumeChange };
} 