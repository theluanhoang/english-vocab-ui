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
import { MultipleChoiceGameState, MultipleChoiceQuestion } from '@/types/practice';

export default function MultipleChoicePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const collectionId = searchParams.get('collectionId');
  const { open: isSessionExpired } = useSessionExpired();
  
  const [gameState, setGameState] = useState<MultipleChoiceGameState>({
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
        const questions: MultipleChoiceQuestion[] = vocabularies.map((vocab: any, index: number) => {
          // Tạo các lựa chọn nghĩa (bao gồm nghĩa đúng và 3 nghĩa khác)
          const otherMeanings = vocabularies
            .filter((v: any, i: number) => i !== index)
            .slice(0, 3)
            .map((v: any) => v.meaning);
          
          const options = [vocab.meaning, ...otherMeanings].sort(() => Math.random() - 0.5);
          
          return {
            id: `question-${index}`,
            word: vocab.word,
            correctMeaning: vocab.meaning,
            options,
            pronunciation: vocab.pronunciation,
            definition: vocab.definition,
            example: vocab.exampleSentence
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
    const isCorrect = answer === currentQuestion.correctMeaning;

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
            title="Trắc Nghiệm Từ Vựng" 
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
          <div className="flex items-center justify-between mb-6">
            <Heading as="h3" className="text-xl font-semibold text-text-primary">
              Nghĩa của từ "{currentQuestion.word}" là gì?
            </Heading>
            <Button
              variant="outline"
              onClick={() => playAudio(currentQuestion.word)}
              className="p-2"
            >
              <Volume2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Word Display */}
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-lg mb-6 text-center">
            <Text className="text-3xl font-bold text-text-primary mb-2">
              {currentQuestion.word}
            </Text>
            {currentQuestion.pronunciation && (
              <Text className="text-lg text-text-secondary">
                /{currentQuestion.pronunciation}/
              </Text>
            )}
          </div>

          {/* Answer Options */}
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(option)}
                disabled={gameState.isAnswered}
                className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  gameState.isAnswered
                    ? option === currentQuestion.correctMeaning
                      ? 'border-green-500 bg-green-50'
                      : option === gameState.selectedAnswer && option !== currentQuestion.correctMeaning
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 bg-gray-50'
                    : gameState.selectedAnswer === option
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary/30 hover:bg-primary/5'
                }`}
              >
                <div className="flex items-center justify-between">
                  <Text className="text-lg font-semibold text-text-primary">
                    {String.fromCharCode(65 + index)}. {option}
                  </Text>
                  {gameState.isAnswered && option === currentQuestion.correctMeaning && (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  )}
                  {gameState.isAnswered && option === gameState.selectedAnswer && option !== currentQuestion.correctMeaning && (
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
              <Text className="text-text-secondary mb-2">
                Đáp án đúng: {currentQuestion.correctMeaning}
              </Text>
              {currentQuestion.definition && (
                <Text className="text-text-secondary text-sm">
                  <strong>Định nghĩa:</strong> {currentQuestion.definition}
                </Text>
              )}
              {currentQuestion.example && (
                <Text className="text-text-secondary text-sm mt-1">
                  <strong>Ví dụ:</strong> {currentQuestion.example}
                </Text>
              )}
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
            1. Đọc từ tiếng Anh được hiển thị<br/>
            2. Click vào nút loa để nghe phát âm<br/>
            3. Chọn nghĩa tiếng Việt đúng từ các lựa chọn<br/>
            4. Xem kết quả và thông tin chi tiết<br/>
            5. Tiếp tục với câu hỏi tiếp theo
          </Text>
        </div>
      </div>
    </div>
  );
} 