import React, { useState, useEffect } from 'react';
import { Calendar, Save, Plus, Edit3, Smile, Meh, Frown } from 'lucide-react';

interface JournalEntry {
  id: string;
  date: string;
  content: string;
  mood: 'happy' | 'neutral' | 'sad';
  prompt: string;
}

const Journal: React.FC = () => {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [currentEntry, setCurrentEntry] = useState('');
  const [currentMood, setCurrentMood] = useState<'happy' | 'neutral' | 'sad'>('neutral');
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [isEditing, setIsEditing] = useState(false);

  const dailyPrompts = [
    "What made you smile today?",
    "What are three things you're grateful for right now?",
    "Describe a moment when you felt proud of yourself.",
    "What's something new you learned today?",
    "How did you show kindness to yourself or others today?",
    "What challenged you today and how did you handle it?",
    "What are you looking forward to tomorrow?",
    "Describe a person who made your day better.",
    "What's something you'd like to let go of?",
    "What makes you feel most like yourself?",
    "What's a small victory you had today?",
    "How are you feeling right now, and that's okay because...?",
    "What would you tell a friend who was having the same day as you?",
    "What's something beautiful you noticed today?",
    "How did you take care of your mental health today?"
  ];

  const getTodaysPrompt = () => {
    const dayOfYear = Math.floor((new Date().getTime() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
    return dailyPrompts[dayOfYear % dailyPrompts.length];
  };

  useEffect(() => {
    const savedEntries = localStorage.getItem('youthwell_journal_entries');
    if (savedEntries) {
      setEntries(JSON.parse(savedEntries));
    }
  }, []);

  useEffect(() => {
    const todaysEntry = entries.find(entry => entry.date === selectedDate);
    if (todaysEntry) {
      setCurrentEntry(todaysEntry.content);
      setCurrentMood(todaysEntry.mood);
      setIsEditing(true);
    } else {
      setCurrentEntry('');
      setCurrentMood('neutral');
      setIsEditing(false);
    }
  }, [selectedDate, entries]);

  const saveEntry = () => {
    const entryData: JournalEntry = {
      id: selectedDate,
      date: selectedDate,
      content: currentEntry,
      mood: currentMood,
      prompt: getTodaysPrompt()
    };

    const updatedEntries = entries.filter(entry => entry.date !== selectedDate);
    updatedEntries.push(entryData);
    updatedEntries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setEntries(updatedEntries);
    localStorage.setItem('youthwell_journal_entries', JSON.stringify(updatedEntries));
    
    alert('Entry saved successfully!');
  };

  const getMoodIcon = (mood: 'happy' | 'neutral' | 'sad') => {
    switch (mood) {
      case 'happy': return <Smile className="h-5 w-5 text-green-500" />;
      case 'neutral': return <Meh className="h-5 w-5 text-yellow-500" />;
      case 'sad': return <Frown className="h-5 w-5 text-red-500" />;
    }
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Header */}
      <div className="card">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Private Journal
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              Your thoughts are safe here. Write freely and authentically.
            </p>
          </div>
          <Edit3 className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
        </div>

        {/* Date Selector */}
        <div className="flex items-center mb-4">
          <Calendar className="h-5 w-5 text-gray-500 mr-2" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            max={new Date().toISOString().split('T')[0]}
          />
        </div>

        {/* Daily Prompt */}
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 p-4 rounded-lg mb-6">
          <h3 className="font-medium text-gray-900 dark:text-white mb-2">
            Today's Reflection Prompt:
          </h3>
          <p className="text-gray-700 dark:text-gray-300 italic">
            "{getTodaysPrompt()}"
          </p>
        </div>

        {/* Mood Selector */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            How are you feeling today?
          </label>
          <div className="flex space-x-4">
            {[
              { mood: 'happy' as const, label: 'Good', icon: Smile, color: 'text-green-500' },
              { mood: 'neutral' as const, label: 'Okay', icon: Meh, color: 'text-yellow-500' },
              { mood: 'sad' as const, label: 'Struggling', icon: Frown, color: 'text-red-500' }
            ].map(({ mood, label, icon: Icon, color }) => (
              <button
                key={mood}
                onClick={() => setCurrentMood(mood)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all ${
                  currentMood === mood
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
              >
                <Icon className={`h-5 w-5 ${color}`} />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Text Editor */}
        <div className="mb-6">
          <textarea
            value={currentEntry}
            onChange={(e) => setCurrentEntry(e.target.value)}
            placeholder="Start writing your thoughts... Remember, this is your private space. Be honest with yourself."
            className="w-full h-64 px-4 py-3 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
          />
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {currentEntry.length} characters
            </span>
            <button
              onClick={saveEntry}
              disabled={!currentEntry.trim()}
              className="btn-primary disabled:bg-gray-300 dark:disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>{isEditing ? 'Update Entry' : 'Save Entry'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Entries */}
      {entries.length > 0 && (
        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
            Recent Entries
          </h2>
          
          <div className="space-y-4">
            {entries.slice(0, 5).map((entry) => (
              <div
                key={entry.id}
                className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-colors"
                onClick={() => setSelectedDate(entry.date)}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {new Date(entry.date).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                    {getMoodIcon(entry.mood)}
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {entry.content.length} characters
                  </span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                  {entry.content.substring(0, 150)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Privacy Notice */}
      <div className="card bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700">
        <div className="flex items-start">
          <div className="w-6 h-6 bg-green-100 dark:bg-green-900/50 rounded-full flex items-center justify-center mr-3 mt-0.5">
            <span className="text-green-600 dark:text-green-400 text-sm">🔒</span>
          </div>
          <div>
            <h3 className="font-medium text-green-900 dark:text-green-100 mb-1">
              Your Privacy is Protected
            </h3>
            <p className="text-sm text-green-700 dark:text-green-300">
              All journal entries are stored locally on your device. They are not shared with anyone 
              or stored on external servers. Your thoughts remain completely private.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journal;