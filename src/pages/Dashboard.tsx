import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Heart, 
  MessageCircle, 
  Wind, 
  BookOpen, 
  Moon, 
  TrendingUp,
  Award,
  Smile,
  Phone,
  PhoneOutgoing,
  LifeBuoy,
  Mail,
  AlertCircle,
  ArrowRight
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const [todayMood, setTodayMood] = useState<number>(3);

  const moodEmojis = ['😢', '😔', '😐', '🙂', '😊'];
  const moodLabels = ['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy'];

  const quickActions = [
    {
      title: 'Chat with AI',
      description: 'Talk to your AI companion',
      icon: MessageCircle,
      href: '/chat',
      color: 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400'
    },
    {
      title: 'Breathing Exercise',
      description: '5-minute calming session',
      icon: Wind,
      href: '/tools',
      color: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400'
    },
    {
      title: 'Daily Journal',
      description: 'Write your thoughts',
      icon: BookOpen,
      href: '/journal',
      color: 'bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400'
    },
    {
      title: 'Sleep Sounds',
      description: 'Peaceful audio for rest',
      icon: Moon,
      href: '/tools',
      color: 'bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400'
    }
  ];

  const weeklyStats = [
    { label: 'Meditations', value: 3, target: 5 },
    { label: 'Journal Entries', value: 4, target: 7 },
    { label: 'Mood Check-ins', value: 6, target: 7 },
  ];

  return (
    <div className="space-y-8 pb-20 lg:pb-0">
      {/* Welcome Section */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome Back! 👋
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              How are you feeling today?
            </p>
          </div>
          <Award className="h-8 w-8 text-yellow-500" />
        </div>

        {/* Daily Mood Check-in */}
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-6">
          <div className="flex items-center mb-4">
            <Heart className="h-5 w-5 text-red-500 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              Daily Mood Check-in
            </h3>
          </div>
          
          <div className="flex justify-center space-x-4 mb-4">
            {moodEmojis.map((emoji, index) => (
              <button
                key={index}
                onClick={() => setTodayMood(index)}
                className={`text-4xl p-3 rounded-full transition-all duration-200 ${
                  todayMood === index
                    ? 'bg-indigo-100 dark:bg-indigo-900/50 scale-110 ring-2 ring-indigo-500'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-600 hover:scale-105'
                }`}
                aria-label={moodLabels[index]}
              >
                {emoji}
              </button>
            ))}
          </div>
          
          <p className="text-center text-gray-600 dark:text-gray-300 font-medium">
            {moodLabels[todayMood]}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <Link
              key={action.title}
              to={action.href}
              className="card hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center mb-4`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {action.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {action.description}
              </p>
            </Link>
          );
        })}
      </div>

      {/* Weekly Progress */}
      <div className="card">
        <div className="flex items-center mb-6">
          <TrendingUp className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            This Week's Progress
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {weeklyStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="relative w-20 h-20 mx-auto mb-3">
                <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    className="text-gray-200 dark:text-gray-700"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-indigo-600 dark:text-indigo-400"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray={`${(stat.value / stat.target) * 100}, 100`}
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </span>
                </div>
              </div>
              <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                {stat.label}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {stat.value} of {stat.target} this week
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="card bg-gradient-to-r from-indigo-50 to-emerald-50 dark:from-indigo-900/20 dark:to-emerald-900/20">
        <div className="flex items-start">
          <Smile className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mr-3 mt-1 flex-shrink-0" />
          <div>
            <blockquote className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              "You are braver than you believe, stronger than you seem, and smarter than you think."
            </blockquote>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              — A.A. Milne
            </p>
          </div>
        </div>
      </div>
      
      {/* Help & Contact Section with Indian Mental Health Resources */}
      <div className="mt-8">
        <div className="flex items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Help & Contact
          </h2>
          <span className="ml-2 px-2 py-0.5 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 rounded-full">
            Important
          </span>
        </div>
        
        <div className="card p-6 border-l-4 border-red-500 dark:border-red-700">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            For immediate help, contact these professional mental health resources — confidential and free.
          </p>
          
          <div className="space-y-4">
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Tele MANAS</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">24/7 multilingual mental health helpline</p>
                  <a href="tel:14416" className="mt-1 inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
                    14416
                    <PhoneOutgoing className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                  <LifeBuoy className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">iCALL</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Professional counseling service</p>
                  <div className="mt-1 space-y-1">
                    <a href="tel:18602662345" className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
                      1860-266-2345
                      <PhoneOutgoing className="ml-1 h-4 w-4" />
                    </a>
                    <div className="block">
                      <a href="mailto:help@icallhelpline.org" className="inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
                        help@icallhelpline.org
                        <Mail className="ml-1 h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Vandrevala Foundation</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Mental health support and crisis intervention</p>
                  <a href="tel:9999666555" className="mt-1 inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
                    9999666555
                    <PhoneOutgoing className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
            
            <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Sneha</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Suicide prevention and emotional support</p>
                  <a href="tel:04424640050" className="mt-1 inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
                    044-24640050
                    <PhoneOutgoing className="ml-1 h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-between items-center">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <span className="inline-flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                In case of emergency, please call local emergency services
              </span>
            </div>
            <Link to="/resources" className="btn-primary flex items-center">
              More Resources
              <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;