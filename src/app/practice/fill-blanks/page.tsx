'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, Volume2 } from 'lucide-react';
import { collectionService } from '@/app/services/collection.service';
import { useSessionExpired } from '@/contexts/SessionExpiredContext';
import { Button } from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import Heading from '@/components/atoms/Heading';
import IntroductionSection from '@/components/molecules/IntroductionSection';

interface FillBlankQuestion {
  id: string;
  sentence: string;
  correctWord: string;
  options: string[];
  explanation?: string;
}

interface GameState {
  questions: FillBlankQuestion[];
  currentQuestionIndex: number;
  selectedAnswer: string | null;
  score: number;
  totalQuestions: number;
  isAnswered: boolean;
  isCorrect: boolean;
  isGameComplete: boolean;
}

export default function FillBlanksPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const collectionId = searchParams.get('collectionId');
  const { open: isSessionExpired } = useSessionExpired();
  
  const [gameState, setGameState] = useState<GameState>({
    questions: [],
    currentQuestionIndex: 0,
    selectedAnswer: null,
    score: 0,
    totalQuestions: 0,
    isAnswered: false,
    isCorrect: false,
    isGameComplete: false
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
        
        // Tạo câu hỏi từ collection vocabularies
        const vocabularies = collection.collectionVocabularies.map((cv: any) => cv.vocabulary);
        const questions: FillBlankQuestion[] = vocabularies.map((vocab: any, index: number) => {
          // Tạo câu mẫu với từ cần điền
          const sentence = `The word "${vocab.word}" means "${vocab.meaning}".`;
          const blankSentence = sentence.replace(vocab.word, '_____');
          
          // Tạo các lựa chọn (bao gồm từ đúng và 3 từ khác)
          const otherWords = vocabularies
            .filter((v: any, i: number) => i !== index)
            .slice(0, 3)
            .map((v: any) => v.word);
          
          const options = [vocab.word, ...otherWords].sort(() => Math.random() - 0.5);
          
          return {
            id: `question-${index}`,
            sentence: blankSentence,
            correctWord: vocab.word,
            options,
            explanation: `"${vocab.word}" có nghĩa là "${vocab.meaning}"`
          };
        });

        // Shuffle questions
        const shuffledQuestions = questions.sort(() => Math.random() - 0.5);

        setGameState(prev => ({
          ...prev,
          questions: shuffledQuestions,
          totalQuestions: shuffledQuestions.length
        }));
      } catch (err) {
        console.error('Failed to fetch collection:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCollectionData();
  }, [collectionId, isSessionExpired]);

  const handleAnswerSelect = (answer: string) => {
    if (gameState.isAnswered) return;

    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctWord;

    setGameState(prev => ({
      ...prev,
      selectedAnswer: answer,
      isAnswered: true,
      isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score
    }));
  };

  const handleNextQuestion = () => {
    const nextIndex = gameState.currentQuestionIndex + 1;
    const isComplete = nextIndex >= gameState.questions.length;

    setGameState(prev => ({
      ...prev,
      currentQuestionIndex: nextIndex,
      selectedAnswer: null,
      isAnswered: false,
      isCorrect: false,
      isGameComplete: isComplete
    }));
  };

  const resetGame = () => {
    const shuffledQuestions = [...gameState.questions].sort(() => Math.random() - 0.5);
    setGameState(prev => ({
      ...prev,
      questions: shuffledQuestions,
      currentQuestionIndex: 0,
      selectedAnswer: null,
      score: 0,
      isAnswered: false,
      isCorrect: false,
      isGameComplete: false
    }));
  };

  const playAudio = (word: string) => {
    // Tạo audio từ text-to-speech (có thể sử dụng Web Speech API)
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
    }
  };

  if (isSessionExpired) return null;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Text>Đang tải dữ liệu...</Text>
      </div>
    );
  }

  if (gameState.isGameComplete) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="card text-center max-w-md mx-auto">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <Heading as="h2" className="text-2xl font-bold mb-2 text-text-primary">
              Hoàn thành!
            </Heading>
            <Text className="text-text-secondary mb-4">
              Bạn đã hoàn thành tất cả {gameState.totalQuestions} câu hỏi
            </Text>
            <Text className="text-lg font-semibold text-text-primary mb-6">
              Điểm: {gameState.score}/{gameState.totalQuestions}
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
      </div>
    );
  }

  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
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
            title="Điền Từ Vào Câu" 
            description={`Luyện tập với bộ sưu tập: ${collectionName}`}
            icon={CheckCircle}
          />
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <Text className="text-lg font-semibold text-text-primary">
              Câu hỏi {gameState.currentQuestionIndex + 1}/{gameState.totalQuestions}
            </Text>
            <Text className="text-lg font-semibold text-text-primary">
              Điểm: {gameState.score}
            </Text>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${((gameState.currentQuestionIndex + 1) / gameState.totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="card mb-8">
          <div className="flex items-center justify-between mb-4">
            <Heading as="h3" className="text-xl font-semibold text-text-primary">
              Điền từ thích hợp vào chỗ trống:
            </Heading>
            <Button
              variant="outline"
              onClick={() => playAudio(currentQuestion.correctWord)}
              className="p-2"
            >
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-6">
            <Text className="text-xl text-text-primary leading-relaxed">
              {currentQuestion.sentence}
            </Text>
          </div>

          {/* Answer Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={gameState.isAnswered}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  gameState.isAnswered
                    ? option === currentQuestion.correctWord
                      ? 'border-green-500 bg-green-50'
                      : option === gameState.selectedAnswer && option !== currentQuestion.correctWord
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 bg-gray-50'
                    : gameState.selectedAnswer === option
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/30 hover:bg-primary/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Text className="text-lg font-semibold text-text-primary">
                    {option}
                  </Text>
                  {gameState.isAnswered && option === currentQuestion.correctWord && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {gameState.isAnswered && option === gameState.selectedAnswer && option !== currentQuestion.correctWord && (
                    <XCircle className="w-5 h-5 text-red-500" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Feedback */}
          {gameState.isAnswered && (
            <div className={`mt-6 p-4 rounded-lg ${
              gameState.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <Text className={`font-semibold mb-2 ${
                gameState.isCorrect ? 'text-green-700' : 'text-red-700'
              }`}>
                {gameState.isCorrect ? 'Chính xác!' : 'Không đúng!'}
              </Text>
              <Text className="text-text-secondary">
                {currentQuestion.explanation}
              </Text>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={resetGame}
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Chơi lại
          </Button>
          
          {gameState.isAnswered && (
            <Button onClick={handleNextQuestion}>
              {gameState.currentQuestionIndex === gameState.questions.length - 1 ? 'Kết thúc' : 'Câu tiếp theo'}
            </Button>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-8 card bg-blue-50 border-blue-200">
          <Heading as="h4" className="text-lg font-semibold mb-2 text-text-primary">
            Hướng dẫn chơi:
          </Heading>
          <Text className="text-text-secondary">
            1. Đọc câu có chỗ trống (_____)<br/>
            2. Chọn từ tiếng Anh phù hợp từ các lựa chọn<br/>
            3. Xem kết quả và giải thích<br/>
            4. Tiếp tục với câu hỏi tiếp theo
          </Text>
        </div>
      </div>
    </div>
  );
} 