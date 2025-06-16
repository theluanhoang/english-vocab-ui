'use client';
import Link from 'next/link';
import Image from 'next/image';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Home() {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col bg-background">
      <div className="container mx-auto px-4 flex-1 w-full">
        {/* Slideshow Section with Overlay */}
        <div className="relative w-full mb-16" style={{minHeight: '400px'}}>
          {/* Overlay cố định */}
          <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center h-[400px] md:h-[600px] w-full pointer-events-none">
            <div className="w-full flex flex-col items-center justify-center">
              <div className="max-w-4xl w-full text-text-primary text-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 text-text-primary text-center pointer-events-auto">
                  Master English Vocabulary
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-text-secondary pointer-events-auto">
                  Learn smarter, remember longer with our innovative spaced repetition system.
                  Join thousands of successful learners today!
                </p>
                <div className="flex gap-6 justify-center mb-16 pointer-events-auto">
                  <Link 
                    href="/login" 
                    className="inline-block bg-transparent shadow-2xl hover:bg-[var(--color-yellow-500)] active:bg-[var(--color-yellow-500)] text-white font-extrabold py-3 px-8 rounded-full text-lg border-2 border-transparent hover:border-[var(--color-yellow-500)] active:border-[var(--color-yellow-500)] hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[var(--color-yellow-500)]/50 drop-shadow-lg"
                  >
                    Sign up now
                  </Link>
                  <Link 
                    href="/about" 
                    className="inline-block bg-transparent shadow-2xl hover:bg-[var(--color-yellow-500)] active:bg-[var(--color-yellow-500)] text-white font-extrabold py-3 px-8 rounded-full text-lg border-2 border-transparent hover:border-[var(--color-yellow-500)] active:border-[var(--color-yellow-500)] hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[var(--color-yellow-500)]/30 drop-shadow-lg"
                  >
                    About us
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Slider chỉ chứa ảnh */}
          <Slider {...sliderSettings} className="w-full">
            <div className="relative h-[400px] md:h-[600px] w-full">
              <Image
                src="https://images.unsplash.com/photo-1546410531-bb4caa6b424d?q=80&w=2071&auto=format&fit=crop"
                alt="Learning English"
                fill
                className="object-cover"
                priority
              />
              {/* Overlay gradient để làm tối ảnh */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
            </div>
            <div className="relative h-[400px] md:h-[600px] w-full">
              <Image
                src="https://images.unsplash.com/photo-1516979187457-637abb4f9353?q=80&w=2070&auto=format&fit=crop"
                alt="Practice English"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
            </div>
            <div className="relative h-[400px] md:h-[600px] w-full">
              <Image
                src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=2022&auto=format&fit=crop"
                alt="Track Progress"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
            </div>
          </Slider>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          <div className="card text-center p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📚</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-text-primary">Rich Content</h3>
            <p className="text-text-secondary">Access thousands of carefully curated vocabulary lists and learning materials</p>
          </div>
          <div className="card text-center p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-text-primary">Smart Learning</h3>
            <p className="text-text-secondary">AI-powered learning path that adapts to your progress and learning style</p>
          </div>
          <div className="card text-center p-6 hover:shadow-lg transition-shadow duration-200">
            <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🏆</span>
            </div>
            <h3 className="text-xl font-semibold mb-2 text-text-primary">Track Progress</h3>
            <p className="text-text-secondary">Detailed analytics and progress tracking to monitor your improvement</p>
          </div>
        </div>

        {/* Learning Methods Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Learning Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4">Spaced Repetition</h3>
              <p className="text-text-secondary mb-4">
                Our scientifically proven spaced repetition system helps you remember words longer by reviewing them at optimal intervals.
              </p>
              <ul className="list-disc list-inside text-text-secondary">
                <li>Smart review scheduling</li>
                <li>Adaptive learning intervals</li>
                <li>Long-term memory retention</li>
              </ul>
            </div>
            <div className="card p-6">
              <h3 className="text-xl font-semibold mb-4">Contextual Learning</h3>
              <p className="text-text-secondary mb-4">
                Learn words in context with real-world examples, making it easier to understand and remember their usage.
              </p>
              <ul className="list-disc list-inside text-text-secondary">
                <li>Real-world examples</li>
                <li>Usage in sentences</li>
                <li>Practical application</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center mb-16">
          <p className="text-sm text-text-secondary mb-4">Trusted by students and professionals worldwide</p>
          <div className="flex justify-center space-x-8">
            <div className="flex items-center">
              <span className="text-2xl mr-2">👥</span>
              <div>
                <p className="font-bold text-text-primary">10K+</p>
                <p className="text-sm text-text-secondary">Active Users</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">📖</span>
              <div>
                <p className="font-bold text-text-primary">50K+</p>
                <p className="text-sm text-text-secondary">Words Learned</p>
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-2xl mr-2">⭐</span>
              <div>
                <p className="font-bold text-text-primary">4.9/5</p>
                <p className="text-sm text-text-secondary">User Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
