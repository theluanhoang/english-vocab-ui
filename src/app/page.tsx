'use client';
import LoginForm from "@/components/organisms/LoginForm";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Master English Vocabulary
        </h1>
        <p className="text-lg text-text-secondary max-w-2xl mx-auto mb-8">
          Learn smarter, remember longer with our innovative spaced repetition system.
          Join thousands of successful learners today!
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
        <div className="card text-center p-6">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📚</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Rich Content</h3>
          <p className="text-text-secondary">Access thousands of carefully curated vocabulary lists</p>
        </div>
        <div className="card text-center p-6">
          <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🎯</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Smart Learning</h3>
          <p className="text-text-secondary">Personalized learning path based on your progress</p>
        </div>
        <div className="card text-center p-6">
          <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🏆</span>
          </div>
          <h3 className="text-xl font-semibold mb-2">Track Progress</h3>
          <p className="text-text-secondary">Monitor your improvement with detailed statistics</p>
        </div>
      </div>

      {/* Login Form */}
      <div className="w-full max-w-md">
        <LoginForm />
      </div>

      {/* Trust Indicators */}
      <div className="mt-16 text-center">
        <p className="text-sm text-text-secondary mb-4">Trusted by students and professionals worldwide</p>
        <div className="flex justify-center space-x-8">
          <div className="flex items-center">
            <span className="text-2xl mr-2">👥</span>
            <div>
              <p className="font-bold">10K+</p>
              <p className="text-sm text-text-secondary">Active Users</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-2xl mr-2">📖</span>
            <div>
              <p className="font-bold">50K+</p>
              <p className="text-sm text-text-secondary">Words Learned</p>
            </div>
          </div>
          <div className="flex items-center">
            <span className="text-2xl mr-2">⭐</span>
            <div>
              <p className="font-bold">4.9/5</p>
              <p className="text-sm text-text-secondary">User Rating</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
