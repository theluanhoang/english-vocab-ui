'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, XCircle, RotateCcw, Volume2, Mic, MicOff } from 'lucide-react';
import { collectionService } from '@/app/services/collection.service';
import { useSessionExpired } from '@/contexts/SessionExpiredContext';
import { Button } from '@/components/atoms/Button';
import Text from '@/components/atoms/Text';
import Heading from '@/components/atoms/Heading';
import IntroductionSection from '@/components/molecules/IntroductionSection';
import { ListenWriteGameState, ListenWriteQuestion } from '@/types/practice';

export default function ListenWritePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const collectionId = searchParams.get('collectionId');
  const { open: isSessionExpired } = useSessionExpired();
  
  const [gameState, setGameState] = useState<ListenWriteGameState>({
    questions: [],
    currentQuestionIndex: 0,
    userAnswer: '',
    score: 0,
    totalQuestions: 0,
    isAnswered: false,
    isCorrect: false,
    isGameComplete: false,
    isListening: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [collectionName, setCollectionName] = useState('');
  const [recognition, setRecognition] = useState<any>(null);

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
        const questions: ListenWriteQuestion[] = vocabularies.map((vocab: any, index: number) => ({
          id: `question-${index}`,
          word: vocab.word,
          meaning: vocab.meaning,
          pronunciation: vocab.pronunciation,
          definition: vocab.definition,
          example: vocab.exampleSentence
        }));

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

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';
      
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript.toLowerCase().trim();
        setGameState(prev => ({
          ...prev,
          userAnswer: transcript,
          isListening: false
        }));
      };
      
      recognition.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setGameState(prev => ({
          ...prev,
          isListening: false
        }));
      };
      
      recognition.onend = () => {
        setGameState(prev => ({
          ...prev,
          isListening: false
        }));
      };
      
      setRecognition(recognition);
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setGameState(prev => ({
        ...prev,
        isListening: true
      }));
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setGameState(prev => ({
        ...prev,
        isListening: false
      }));
    }
  };

  const handleAnswerSubmit = () => {
    if (!gameState.userAnswer.trim()) return;

    const currentQuestion = gameState.questions[gameState.currentQuestionIndex];
    const isCorrect = gameState.userAnswer.toLowerCase().trim() === currentQuestion.word.toLowerCase();

    setGameState(prev => ({
      ...prev,
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
      userAnswer: '',
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
      userAnswer: '',
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
            title="Nghe Và Viết" 
            description={`Luyện tập với bộ sưu tập: ${collectionName}`}
            icon={Volume2}
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
          <Heading as="h3" className="text-xl font-semibold mb-6 text-text-primary text-center">
            Nghe từ và viết lại cho đúng
          </Heading>

          {/* Audio Controls */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant="outline"
              onClick={() => playAudio(currentQuestion.word)}
              className="flex items-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              Nghe từ
            </Button>
            
            {recognition && (
              <Button
                variant={gameState.isListening ? "primary" : "outline"}
                onClick={gameState.isListening ? stopListening : startListening}
                className="flex items-center gap-2"
              >
                {gameState.isListening ? (
                  <>
                    <MicOff className="w-4 h-4" />
                    Dừng ghi âm
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4" />
                    Ghi âm
                  </>
                )}
              </Button>
            )}
          </div>

          {/* Answer Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-text-primary mb-2">
              Câu trả lời của bạn:
            </label>
            <input
              type="text"
              value={gameState.userAnswer}
              onChange={(e) => setGameState(prev => ({ ...prev, userAnswer: e.target.value }))}
              placeholder="Nhập từ bạn nghe được..."
              className="w-full p-4 border-2 border-gray-200 rounded-lg text-lg font-semibold text-text-primary focus:border-primary focus:outline-none transition-colors"
              disabled={gameState.isAnswered}
            />
          </div>

          {/* Submit Button */}
          {!gameState.isAnswered && (
            <div className="text-center mb-6">
              <Button
                onClick={handleAnswerSubmit}
                disabled={!gameState.userAnswer.trim()}
                className="px-8"
              >
                Kiểm tra
              </Button>
            </div>
          )}

          {/* Feedback */}
          {gameState.isAnswered && (
            <div className={`p-4 rounded-lg mb-6 ${
              gameState.isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {gameState.isCorrect ? (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
                <Text className={`font-semibold ${
                  gameState.isCorrect ? 'text-green-700' : 'text-red-700'
                }`}>
                  {gameState.isCorrect ? 'Chính xác!' : 'Không đúng!'}
                </Text>
              </div>
              
              <div className="space-y-2">
                <Text className="text-text-secondary">
                  <strong>Từ đúng:</strong> {currentQuestion.word}
                </Text>
                <Text className="text-text-secondary">
                  <strong>Nghĩa:</strong> {currentQuestion.meaning}
                </Text>
                {currentQuestion.pronunciation && (
                  <Text className="text-text-secondary">
                    <strong>Phát âm:</strong> /{currentQuestion.pronunciation}/
                  </Text>
                )}
                {currentQuestion.definition && (
                  <Text className="text-text-secondary text-sm">
                    <strong>Định nghĩa:</strong> {currentQuestion.definition}
                  </Text>
                )}
                {currentQuestion.example && (
                  <Text className="text-text-secondary text-sm">
                    <strong>Ví dụ:</strong> {currentQuestion.example}
                  </Text>
                )}
              </div>
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
            1. Click "Nghe từ" để nghe phát âm từ tiếng Anh<br/>
            2. Hoặc click "Ghi âm" để nói từ bạn nghe được<br/>
            3. Nhập từ tiếng Anh vào ô trả lời<br/>
            4. Click "Kiểm tra" để xem kết quả<br/>
            5. Xem thông tin chi tiết về từ vựng<br/>
            6. Tiếp tục với câu hỏi tiếp theo
          </Text>
        </div>

        {/* Speech Recognition Notice */}
        {!recognition && (
          <div className="mt-4 card bg-yellow-50 border-yellow-200">
            <Text className="text-yellow-700 text-sm">
              <strong>Lưu ý:</strong> Tính năng ghi âm có thể không khả dụng trên một số trình duyệt. 
              Bạn vẫn có thể sử dụng tính năng "Nghe từ" để luyện tập.
            </Text>
          </div>
        )}
      </div>
    </div>
  );
} 