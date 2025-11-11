'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw } from 'lucide-react';
import { collectionService } from '@/app/services/collection.service';
import { useSessionExpired } from '@/contexts/SessionExpiredContext';
import { Button } from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import Heading from '@/components/atoms/Heading';
import IntroductionSection from '@/components/molecules/IntroductionSection';
import { WordPair, WordPairGameState } from '@/types/practice';


export default function MatchWordsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const collectionId = searchParams.get('collectionId');
  const { open: isSessionExpired } = useSessionExpired();
  
  const [gameState, setGameState] = useState<WordPairGameState>({
    words: [],
    meanings: [],
    selectedWord: null,
    selectedMeaning: null,
    matchedPairs: [],
    score: 0,
    totalPairs: 0,
    isGameComplete: false,
    wrongAttempts: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const [collectionName, setCollectionName] = useState('');

  useEffect(() => {
    if (isSessionExpired || !collectionId) return;

    const fetchCollectionData = async () => {
      try {
        setIsLoading(true);
        const collections = await collectionService.getAllCollections({ collectionId });
        const collection = collections[0];
        
        if (!collection) {
          throw new Error('Collection not found');
        }
        
        setCollectionName(collection.name);
        
        // Tạo danh sách từ vựng từ collection
        const vocabularies = collection.collectionVocabularies.map((cv: any) => cv.vocabulary);
        const wordPairs: WordPair[] = vocabularies.map((vocab: any, index: number) => ({
          id: `word-${index}`,
          word: vocab.word,
          meaning: vocab.meaning,
          isMatched: false,
          isSelected: false,
          isWrong: false
        }));

        // Tạo danh sách nghĩa (shuffled)
        const meaningPairs: WordPair[] = wordPairs.map((pair: WordPair, index: number) => ({
          id: `meaning-${index}`,
          word: pair.word,
          meaning: pair.meaning,
          isMatched: false,
          isSelected: false,
          isWrong: false
        }));

        // Shuffle meanings
        const shuffledMeanings = [...meaningPairs].sort(() => Math.random() - 0.5);

        setGameState(prev => ({
          ...prev,
          words: wordPairs,
          meanings: shuffledMeanings,
          totalPairs: wordPairs.length
        }));
      } catch (err) {
        console.error('Failed to fetch collection:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollectionData();
  }, [collectionId, isSessionExpired]);
  const resetWrongStates = (items: WordPair[]) => 
        items.map(item => ({ ...item, isWrong: false }));
  const handleWordClick = (word: WordPair) => {
    if (word.isMatched) return;
    const newState: WordPairGameState = {
      ...gameState,
      selectedWord: gameState.selectedWord == word ? null : word
    }

    setGameState(newState);
    

    // words: WordPair[];
    // meanings: WordPair[];
    // selectedWord: WordPair | null;
    // selectedMeaning: WordPair | null;
    // matchedPairs: string[];
    // score: number;
    // totalPairs: number;
    // isGameComplete: boolean;
    // wrongAttempts: number;
  };

  const handleMeaningClick = (meaning: WordPair) => {
    if (meaning.isMatched) return;

    setGameState((prev) => {

      let newState: WordPairGameState = {
        ...prev,
        selectedMeaning: gameState.selectedMeaning == meaning ? null : meaning
      }

      if (!prev.selectedWord) return newState;

      const correctWord = prev.words.filter((word, _) => word.meaning === meaning.meaning)[0].word;

      const isCorrect = prev.selectedWord.word === correctWord;

      if (isCorrect) {
        const matchedPairs = [...prev.matchedPairs, correctWord, meaning.meaning];
        newState = {
          ...gameState,
          selectedMeaning: gameState.selectedMeaning == meaning ? null : meaning,
          matchedPairs
        }
      }

      console.log("correctWord:::", correctWord);
      console.log("isCorrect:::", isCorrect);
      console.log("NEW STATE:::", newState);
      

      return newState;
    });
  };

  const checkPair = (newState: WordPairGameState) => {
    setGameState();
  }

  const resetGame = () => {
    const shuffledMeanings = [...gameState.meanings].sort(() => Math.random() - 0.5);
    setGameState(prev => ({
      ...prev,
      words: prev.words.map(w => ({ 
        ...w, 
        isMatched: false, 
        isSelected: false, 
        isWrong: false 
      })),
      meanings: shuffledMeanings.map(m => ({ 
        ...m, 
        isMatched: false, 
        isSelected: false, 
        isWrong: false 
      })),
      selectedWord: null,
      selectedMeaning: null,
      matchedPairs: [],
      score: 0,
      isGameComplete: false,
      wrongAttempts: 0
    }));
  };

  const getCardStyle = (item: WordPair, isSelected: boolean) => {
    if (item.isMatched) {
      return 'bg-game-matched-bg border-game-matched-border shadow-lg animate-correct-pop opacity-60 cursor-default';
    }
    
    if (item.isWrong) {
      return 'bg-game-wrong-bg border-game-wrong-border shadow-lg animate-shake';
    }
    
    if (isSelected) {
      return 'bg-game-selected-bg border-game-selected-border shadow-lg transform scale-105 transition-all duration-300';
    }
    
    return 'bg-bg-card border-border-light hover:border-game-selected-border hover:bg-game-selected-bg hover:shadow-md transition-all duration-200';
  };

  if (isSessionExpired) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Text>Đang tải dữ liệu...</Text>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => router.back()}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Quay lại
          </Button>
          <IntroductionSection 
            title="Ghép Từ Và Nghĩa" 
            description={`Luyện tập với bộ sưu tập: ${collectionName}`}
            icon={CheckCircle}
          />
        </div>

        {/* Score và Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <div className="text-center">
              <Text className="text-lg font-semibold text-text-primary">
                Điểm: {gameState.score}/{gameState.totalPairs}
              </Text>
              <Text className="text-sm text-text-secondary">
                Lần thử sai: {gameState.wrongAttempts}
              </Text>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${(gameState.score / gameState.totalPairs) * 100}%` }}
                />
              </div>
            </div>
            <Button onClick={resetGame} variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" />
              Chơi lại
            </Button>
          </div>
        </div>

        {/* Game Complete Modal */}
        {gameState.isGameComplete && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
            <div className="card max-w-md mx-4 text-center animate-scale-in">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4 animate-bounce" />
              <Heading as="h2" className="text-2xl font-bold mb-2 text-text-primary">
                Chúc mừng!
              </Heading>
              <Text className="text-text-secondary mb-4">
                Bạn đã hoàn thành tất cả {gameState.totalPairs} cặp từ vựng!
              </Text>
              <Text className="text-sm text-text-secondary mb-6">
                Điểm: {gameState.score}/{gameState.totalPairs} | Lần thử sai: {gameState.wrongAttempts}
              </Text>
              <div className="flex gap-4">
                <Button onClick={resetGame} className="flex-1">
                  Chơi lại
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => router.back()}
                  className="flex-1"
                >
                  Quay lại
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Game Board */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Words Column */}
          <div>
            <Heading as="h3" className="text-xl font-semibold mb-4 text-text-primary text-center">
              Từ Tiếng Anh
            </Heading>
            <div className="space-y-3">
              {gameState.words.map((word) => (
                <div
                  key={word.id}
                  onClick={() => handleWordClick(word)}
                  className={`card cursor-pointer border-2 ${getCardStyle(word, gameState.selectedWord?.id === word.id)}`}
                >
                  <div className="flex items-center justify-between">
                    <Text className="text-lg font-semibold text-text-primary text-center flex-1">
                      {word.word}
                    </Text>
                    {word.isMatched && (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                    )}
                    {word.isWrong && (
                      <XCircle className="w-5 h-5 text-red-500 ml-2" />
                    )}
                    {gameState.selectedWord?.id === word.id && !word.isMatched && !word.isWrong && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full ml-2 animate-pulse" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Meanings Column */}
          <div>
            <Heading as="h3" className="text-xl font-semibold mb-4 text-text-primary text-center">
              Nghĩa Tiếng Việt
            </Heading>
            <div className="space-y-3">
              {gameState.meanings.map((meaning) => (
                <div
                  key={meaning.id}
                  onClick={() => handleMeaningClick(meaning)}
                  className={`card cursor-pointer border-2 ${getCardStyle(meaning, gameState.selectedMeaning?.id === meaning.id)}`}
                >
                  <div className="flex items-center justify-between">
                    <Text className="text-lg font-semibold text-text-primary text-center flex-1">
                      {meaning.meaning}
                    </Text>
                    {meaning.isMatched && (
                      <CheckCircle className="w-5 h-5 text-green-500 ml-2" />
                    )}
                    {meaning.isWrong && (
                      <XCircle className="w-5 h-5 text-red-500 ml-2" />
                    )}
                    {gameState.selectedMeaning?.id === meaning.id && !meaning.isMatched && !meaning.isWrong && (
                      <div className="w-3 h-3 bg-blue-500 rounded-full ml-2 animate-pulse" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="mt-8 card bg-info-bg border-info-border">
          <Heading as="h4" className="text-lg font-semibold mb-2 text-text-primary">
            Hướng dẫn chơi:
          </Heading>
          <Text className="text-text-secondary">
            1. Click vào một từ tiếng Anh ở cột bên trái<br/>
            2. Click vào nghĩa tiếng Việt tương ứng ở cột bên phải<br/>
            3. Nếu đúng, cặp từ sẽ được ghép và chuyển sang màu xanh<br/>
            4. Nếu sai, các từ sẽ hiển thị màu đỏ và reset sau 1.5 giây<br/>
            5. Tiếp tục cho đến khi ghép hết tất cả các cặp từ
          </Text>
        </div>

        {/* Legend */}
        <div className="mt-4 card bg-subtle-bg border-subtle-border">
          <Heading as="h4" className="text-sm font-semibold mb-2 text-text-primary">
            Chú thích:
          </Heading>
          <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-100 border-2 border-blue-400 rounded"></div>
              <span>Đang chọn</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border-2 border-green-400 rounded"></div>
              <span>Ghép đúng</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-100 border-2 border-red-400 rounded"></div>
              <span>Ghép sai</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 