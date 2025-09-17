import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Heart, Shield, Users, Brain } from 'lucide-react';

const Home: React.FC = () => {
  const { login } = useAuth();

  const handleAnonymousLogin = () => {
    login();
  };

  const handleEmailLogin = () => {
    const email = prompt('Enter your email (optional):');
    login(email || undefined);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 pb-16">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              <span className="text-indigo-600 dark:text-indigo-400">YouthWell AI</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
              Your Safe Space for Mental Wellness
            </p>
            <p className="text-lg text-gray-500 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
              A confidential, AI-powered platform designed specifically for teens aged 13-18. 
              Get support, practice mindfulness, and build healthy coping strategies in a safe environment.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button
                onClick={handleAnonymousLogin}
                className="btn-primary text-lg px-8 py-4"
              >
                Start Anonymously
              </button>
              <button
                onClick={handleEmailLogin}
                className="btn-secondary text-lg px-8 py-4"
              >
                Sign Up with Email
              </button>
            </div>
          </div>
        </div>

        {/* Animated Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg
            className="waves"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
            shapeRendering="auto"
          >
            <defs>
              <path
                id="gentle-wave"
                d="m-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <g className="parallax">
              <use xlinkHref="#gentle-wave" x="48" y="0" fill="rgba(79, 70, 229, 0.1)" />
              <use xlinkHref="#gentle-wave" x="48" y="3" fill="rgba(16, 185, 129, 0.1)" />
              <use xlinkHref="#gentle-wave" x="48" y="5" fill="rgba(79, 70, 229, 0.05)" />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="rgba(255, 255, 255, 0.8)" />
            </g>
          </svg>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white dark:bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose YouthWell AI?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              We understand that being a teenager can be challenging. Our platform provides 
              the tools and support you need, when you need them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                100% Confidential
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Your privacy is our priority. Use anonymously or with minimal personal information.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Brain className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                AI-Powered Support
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Get personalized guidance and support from our empathetic AI companion, available 24/7.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Evidence-Based Tools
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Access proven techniques like CBT, mindfulness, and breathing exercises.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-pink-100 dark:bg-pink-900/50 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                Teen-Focused
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Designed specifically for teens by mental health experts who understand your world.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              © 2025 YouthWell AI. Your mental health matters.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              This platform is not a replacement for professional mental health care. 
              If you're in crisis, please contact emergency services or a crisis hotline immediately.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .waves {
          position: relative;
          width: 100%;
          height: 15vh;
          margin-bottom: -7px;
          min-height: 100px;
          max-height: 150px;
        }
        
        .parallax > use {
          animation: move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite;
        }
        
        .parallax > use:nth-child(1) {
          animation-delay: -2s;
          animation-duration: 7s;
        }
        
        .parallax > use:nth-child(2) {
          animation-delay: -3s;
          animation-duration: 10s;
        }
        
        .parallax > use:nth-child(3) {
          animation-delay: -4s;
          animation-duration: 13s;
        }
        
        .parallax > use:nth-child(4) {
          animation-delay: -5s;
          animation-duration: 20s;
        }
        
        @keyframes move-forever {
          0% { transform: translate3d(-90px,0,0); }
          100% { transform: translate3d(85px,0,0); }
        }
      `}</style>
    </div>
  );
};

export default Home;