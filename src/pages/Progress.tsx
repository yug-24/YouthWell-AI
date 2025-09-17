import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { TrendingUp, Target, Calendar, Award, Heart } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Progress: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'quarter'>('week');

  // Mock data for mood tracking
  const moodData = {
    week: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [
        {
          label: 'Mood Score',
          data: [3, 4, 2, 4, 5, 4, 3],
          borderColor: 'rgb(79, 70, 229)',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    },
    month: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      datasets: [
        {
          label: 'Average Mood Score',
          data: [3.5, 3.8, 3.2, 4.1],
          borderColor: 'rgb(79, 70, 229)',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    },
    quarter: {
      labels: ['Month 1', 'Month 2', 'Month 3'],
      datasets: [
        {
          label: 'Average Mood Score',
          data: [3.2, 3.6, 3.9],
          borderColor: 'rgb(79, 70, 229)',
          backgroundColor: 'rgba(79, 70, 229, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    },
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
      },
      y: {
        display: true,
        min: 1,
        max: 5,
        ticks: {
          stepSize: 1,
          callback: function(value: any) {
            const moods = ['', 'Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy'];
            return moods[value];
          }
        },
      },
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false,
    },
  };

  const goals = [
    {
      id: 1,
      title: 'Daily Mood Check-in',
      description: 'Track your mood every day',
      progress: 6,
      target: 7,
      color: 'bg-red-500',
      icon: Heart
    },
    {
      id: 2,
      title: 'Weekly Meditation',
      description: 'Complete 5 meditation sessions',
      progress: 3,
      target: 5,
      color: 'bg-emerald-500',
      icon: Target
    },
    {
      id: 3,
      title: 'Journal Entries',
      description: 'Write in your journal daily',
      progress: 4,
      target: 7,
      color: 'bg-purple-500',
      icon: Calendar
    },
  ];

  const achievements = [
    {
      id: 1,
      title: 'First Week Complete',
      description: 'You completed your first week of mood tracking!',
      date: '2024-12-15',
      icon: '🎉',
      earned: true
    },
    {
      id: 2,
      title: 'Meditation Master',
      description: 'Completed 10 meditation sessions',
      date: '2024-12-10',
      icon: '🧘',
      earned: true
    },
    {
      id: 3,
      title: 'Consistent Journaler',
      description: 'Write for 7 days in a row',
      date: null,
      icon: '📝',
      earned: false
    },
    {
      id: 4,
      title: 'Wellness Warrior',
      description: 'Use the app for 30 days straight',
      date: null,
      icon: '⚡',
      earned: false
    },
  ];

  const stats = [
    {
      label: 'Days Active',
      value: '12',
      change: '+3 this week',
      color: 'text-green-600 dark:text-green-400'
    },
    {
      label: 'Avg. Mood',
      value: '3.8/5',
      change: '+0.3 from last week',
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      label: 'Meditations',
      value: '15',
      change: '+5 this week',
      color: 'text-purple-600 dark:text-purple-400'
    },
    {
      label: 'Journal Entries',
      value: '8',
      change: '+2 this week',
      color: 'text-orange-600 dark:text-orange-400'
    },
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Your Progress
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Track your mental wellness journey and celebrate your achievements
            </p>
          </div>
          <TrendingUp className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                {stat.label}
              </div>
              <div className={`text-xs font-medium ${stat.color}`}>
                {stat.change}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mood Tracking Chart */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            Mood Trends
          </h2>
          <div className="flex space-x-2">
            {['week', 'month', 'quarter'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeRange(range as any)}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  timeRange === range
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {range.charAt(0).toUpperCase() + range.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64">
          <Line data={moodData[timeRange]} options={chartOptions} />
        </div>

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-sm text-blue-800 dark:text-blue-200">
            <strong>Insight:</strong> Your mood has been trending upward over the past week! 
            Keep up the great work with your wellness practices.
          </p>
        </div>
      </div>

      {/* Goals */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          This Week's Goals
        </h2>

        <div className="space-y-4">
          {goals.map((goal) => {
            const Icon = goal.icon;
            const progressPercentage = (goal.progress / goal.target) * 100;
            
            return (
              <div key={goal.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex items-center mb-3">
                  <div className={`w-10 h-10 ${goal.color} rounded-full flex items-center justify-center mr-3`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {goal.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {goal.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {goal.progress}/{goal.target}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {Math.round(progressPercentage)}%
                    </div>
                  </div>
                </div>
                
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${goal.color}`}
                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Achievements */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Achievements
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`p-4 border rounded-lg transition-all ${
                achievement.earned
                  ? 'border-yellow-300 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-600'
                  : 'border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 opacity-60'
              }`}
            >
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-3">{achievement.icon}</span>
                <div className="flex-1">
                  <h3 className={`font-semibold ${
                    achievement.earned 
                      ? 'text-yellow-800 dark:text-yellow-200' 
                      : 'text-gray-600 dark:text-gray-400'
                  }`}>
                    {achievement.title}
                  </h3>
                  {achievement.earned && (
                    <div className="flex items-center text-xs text-yellow-600 dark:text-yellow-400 mt-1">
                      <Award className="h-3 w-3 mr-1" />
                      Earned on {new Date(achievement.date!).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </div>
              <p className={`text-sm ${
                achievement.earned 
                  ? 'text-yellow-700 dark:text-yellow-300' 
                  : 'text-gray-500 dark:text-gray-400'
              }`}>
                {achievement.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Progress;