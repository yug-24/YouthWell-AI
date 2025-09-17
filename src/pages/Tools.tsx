import React, { useState, useEffect } from 'react';
import { Wind, Heart, Volume2, VolumeX, Play, Pause, SkipBack, SkipForward, Image, Music, Sparkles } from 'lucide-react';

const Tools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'breathing' | 'meditation' | 'sleep' | 'cultural'>('breathing');
  const [meditationSubTab, setMeditationSubTab] = useState<'general' | 'om' | 'visualization'>('general');
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingCount, setBreathingCount] = useState(0);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Breathing Exercise Logic
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (breathingActive) {
      interval = setInterval(() => {
        setBreathingCount(prev => {
          const newCount = prev + 1;
          
          if (newCount <= 4) {
            setBreathingPhase('inhale');
          } else if (newCount <= 11) {
            setBreathingPhase('hold');
          } else if (newCount <= 19) {
            setBreathingPhase('exhale');
          } else {
            return 0; // Reset cycle
          }
          
          return newCount;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [breathingActive]);

  const getBreathingInstructions = () => {
    switch (breathingPhase) {
      case 'inhale': return `Breathe in... ${4 - (breathingCount % 20)}`;
      case 'hold': return `Hold... ${12 - (breathingCount % 20)}`;
      case 'exhale': return `Breathe out... ${20 - (breathingCount % 20)}`;
      default: return 'Get ready...';
    }
  };

  const meditations = [
    {
      id: '1',
      title: '5-Minute Morning Calm',
      duration: '5:00',
      description: 'Start your day with gentle mindfulness',
      color: 'from-blue-400 to-blue-600'
    },
    {
      id: '2',
      title: 'Anxiety Relief',
      duration: '10:00',
      description: 'Techniques to ease worried thoughts',
      color: 'from-emerald-400 to-emerald-600'
    },
    {
      id: '3',
      title: 'Body Scan Relaxation',
      duration: '15:00',
      description: 'Release tension throughout your body',
      color: 'from-purple-400 to-purple-600'
    }
  ];
  
  const omChantings = [
    {
      id: 'om1',
      title: 'Basic OM Meditation',
      duration: '5:00',
      description: 'Simple guided OM chanting for beginners',
      color: 'from-indigo-400 to-indigo-600'
    },
    {
      id: 'om2',
      title: 'Deep OM Practice',
      duration: '10:00',
      description: 'Extended session with breathing techniques',
      color: 'from-purple-400 to-purple-600'
    },
    {
      id: 'om3',
      title: 'OM Sound Bath',
      duration: '15:00',
      description: 'Immersive experience with multiple OM frequencies',
      color: 'from-blue-400 to-blue-600'
    }
  ];
  
  const visualizations = [
    {
      id: 'vis1',
      title: 'Himalayan Mountains',
      location: 'Rishikesh',
      duration: '10:00',
      description: 'Peaceful meditation in the sacred mountains',
      color: 'from-blue-400 to-blue-600',
      image: 'https://images.unsplash.com/photo-1506038634487-60a69ae4b7b1?q=80&w=2066&auto=format&fit=crop'
    },
    {
      id: 'vis2',
      title: 'Western Ghats Forest',
      location: 'Western Ghats',
      duration: '8:00',
      description: 'Walk through ancient forests with guided imagery',
      color: 'from-green-400 to-green-600',
      image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'vis3',
      title: 'Dal Lake Serenity',
      location: 'Kashmir',
      duration: '12:00',
      description: 'Floating meditation on the calm waters',
      color: 'from-cyan-400 to-cyan-600',
      image: 'https://images.unsplash.com/photo-1566837497312-7be4c0605afc?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'vis4',
      title: 'Ganges River Flow',
      location: 'Varanasi',
      duration: '10:00',
      description: 'Connect with the sacred waters and ancient traditions',
      color: 'from-indigo-400 to-indigo-600',
      image: 'https://images.unsplash.com/photo-1561361058-c24e021e2591?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'vis5',
      title: 'Goa Beach Sunset',
      location: 'Goa',
      duration: '15:00',
      description: 'Calming ocean waves and golden sunset visualization',
      color: 'from-orange-400 to-orange-600',
      image: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=2074&auto=format&fit=crop'
    },
    {
      id: 'vis6',
      title: 'Thar Desert Stillness',
      location: 'Rajasthan',
      duration: '12:00',
      description: 'Find peace in the vast desert landscape',
      color: 'from-amber-400 to-amber-600',
      image: 'https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=2070&auto=format&fit=crop'
    }
  ];

  const sleepSounds = [
    {
      id: '1',
      title: 'Ocean Waves',
      duration: '30:00',
      description: 'Gentle waves for peaceful sleep',
      color: 'from-teal-400 to-teal-600'
    },
    {
      id: '2',
      title: 'Forest Rain',
      duration: '45:00',
      description: 'Soothing raindrops in nature',
      color: 'from-green-400 to-green-600'
    },
    {
      id: '3',
      title: 'Bedtime Affirmations',
      duration: '10:00',
      description: 'Positive thoughts for restful sleep',
      color: 'from-indigo-400 to-indigo-600'
    }
  ];
  
  const yogaPoses = [
    {
      id: 'yoga1',
      title: 'Tadasana (Mountain Pose)',
      duration: '5:00',
      description: 'Foundation for all standing poses, improves posture',
      difficulty: 'Beginner',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=2022&auto=format&fit=crop'
    },
    {
      id: 'yoga2',
      title: 'Vrikshasana (Tree Pose)',
      duration: '3:00',
      description: 'Improves balance and concentration',
      difficulty: 'Beginner',
      image: 'https://images.unsplash.com/photo-1566501206188-5dd0cf160a0e?q=80&w=1974&auto=format&fit=crop'
    },
    {
      id: 'yoga3',
      title: 'Bhujangasana (Cobra Pose)',
      duration: '4:00',
      description: 'Strengthens spine and opens chest',
      difficulty: 'Beginner',
      image: 'https://images.unsplash.com/photo-1599447421416-3414500d18a5?q=80&w=1974&auto=format&fit=crop'
    },
    {
      id: 'yoga4',
      title: 'Adho Mukha Svanasana (Downward Dog)',
      duration: '5:00',
      description: 'Stretches and strengthens the entire body',
      difficulty: 'Intermediate',
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1820&auto=format&fit=crop'
    }
  ];
  
  const mantras = [
    {
      id: 'mantra1',
      title: 'Gayatri Mantra',
      duration: '10:00',
      description: 'Sacred verse for wisdom and enlightenment',
      color: 'from-amber-400 to-amber-600',
      text: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात्'
    },
    {
      id: 'mantra2',
      title: 'Maha Mrityunjaya Mantra',
      duration: '8:00',
      description: 'Healing mantra for overcoming fears',
      color: 'from-red-400 to-red-600',
      text: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् उर्वारुकमिव बन्धनान्मृत्योर्मुक्षीय मामृतात्'
    },
    {
      id: 'mantra3',
      title: 'Shanti Mantra',
      duration: '5:00',
      description: 'Peace mantra for inner calm',
      color: 'from-blue-400 to-blue-600',
      text: 'ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः। सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत्। ॐ शान्तिः शान्तिः शान्तिः॥'
    }
  ];
  
  const festivals = [
    {
      id: 'fest1',
      title: 'Holi Color Visualization',
      duration: '12:00',
      description: 'Vibrant color meditation inspired by the festival of colors',
      color: 'from-pink-400 to-purple-600',
      image: 'https://images.unsplash.com/photo-1592547097938-7942b22df3db?q=80&w=1931&auto=format&fit=crop'
    },
    {
      id: 'fest2',
      title: 'Diwali Light Meditation',
      duration: '10:00',
      description: 'Focus on inner light and hope inspired by the festival of lights',
      color: 'from-yellow-400 to-orange-600',
      image: 'https://images.unsplash.com/photo-1605021303432-9a961c7c4a1f?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 'fest3',
      title: 'Navratri Energy Flow',
      duration: '15:00',
      description: 'Nine-stage energy meditation based on the nine nights festival',
      color: 'from-red-400 to-red-600',
      image: 'https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?q=80&w=2070&auto=format&fit=crop'
    }
  ];

  const handleAudioToggle = (audioId: string) => {
    if (currentAudio === audioId && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentAudio(audioId);
      setIsPlaying(true);
    }
  };

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Tab Navigation */}
      <div className="card p-0">
        <div className="flex border-b border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setActiveTab('breathing')}
            className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'breathing'
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Wind className="h-5 w-5 mx-auto mb-1" />
            Breathing
          </button>
          <button
            onClick={() => setActiveTab('meditation')}
            className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'meditation'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Heart className="h-5 w-5 mx-auto mb-1" />
            Meditation
          </button>
          <button
            onClick={() => setActiveTab('cultural')}
            className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'cultural'
                ? 'border-purple-500 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Sparkles className="h-5 w-5 mx-auto mb-1" />
            Cultural
          </button>
          <button
            onClick={() => setActiveTab('sleep')}
            className={`flex-1 px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'sleep'
                ? 'border-purple-500 text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <Volume2 className="h-5 w-5 mx-auto mb-1" />
            Sleep Aids
          </button>
        </div>

        <div className="p-6">
          {/* Breathing Exercise */}
          {activeTab === 'breathing' && (
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                4-7-8 Breathing Technique
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                This technique helps calm your nervous system and reduce anxiety
              </p>

              {/* Breathing Animation */}
              <div className="relative mx-auto mb-8" style={{ width: '200px', height: '200px' }}>
                <div
                  className={`w-full h-full rounded-full bg-gradient-to-r from-indigo-400 to-purple-500 flex items-center justify-center transition-transform duration-1000 ${
                    breathingActive && breathingPhase === 'inhale' ? 'scale-110' : 
                    breathingActive && breathingPhase === 'exhale' ? 'scale-90' : 'scale-100'
                  }`}
                >
                  <div className="text-white font-medium text-center">
                    <div className="text-2xl mb-2">
                      {breathingActive ? Math.ceil((breathingCount % 20) || 20) : '●'}
                    </div>
                    <div className="text-sm">
                      {breathingActive ? getBreathingInstructions() : 'Ready to begin'}
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <button
                  onClick={() => setBreathingActive(!breathingActive)}
                  className={`btn-primary w-48 ${breathingActive ? 'bg-red-600 hover:bg-red-700' : ''}`}
                >
                  {breathingActive ? 'Stop Exercise' : 'Start Breathing'}
                </button>

                <div className="grid grid-cols-3 gap-4 max-w-md mx-auto text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">4</div>
                    <div className="text-gray-500 dark:text-gray-400">seconds inhale</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">7</div>
                    <div className="text-gray-500 dark:text-gray-400">seconds hold</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">8</div>
                    <div className="text-gray-500 dark:text-gray-400">seconds exhale</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Meditation */}
          {activeTab === 'meditation' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Guided Meditations
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Find peace and clarity with our guided meditation sessions
              </p>
              
              {/* Meditation Sub-tabs */}
              <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
                <button
                  onClick={() => setMeditationSubTab('general')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    meditationSubTab === 'general'
                      ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  General
                </button>
                <button
                  onClick={() => setMeditationSubTab('om')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    meditationSubTab === 'om'
                      ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  OM Chanting
                </button>
                <button
                  onClick={() => setMeditationSubTab('visualization')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    meditationSubTab === 'visualization'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  Visualization
                </button>
              </div>

              {/* General Meditations */}
              {meditationSubTab === 'general' && (
                <div className="grid gap-4">
                  {meditations.map((meditation) => (
                    <div key={meditation.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${meditation.color} flex items-center justify-center`}>
                          {currentAudio === meditation.id && isPlaying ? (
                            <Pause className="h-6 w-6 text-white" />
                          ) : (
                            <Play className="h-6 w-6 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {meditation.title}
                          </h3>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            {meditation.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              {meditation.duration}
                            </span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleAudioToggle(meditation.id)}
                                className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                              >
                                {currentAudio === meditation.id && isPlaying ? (
                                  <Pause className="h-4 w-4" />
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {currentAudio === meditation.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                            <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 h-2 rounded-full" style={{ width: '25%' }}></div>
                          </div>
                          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>1:15</span>
                            <span>{meditation.duration}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
              
              {/* OM Chanting */}
              {meditationSubTab === 'om' && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      OM Chanting Meditation
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Experience the sacred sound of OM (ॐ), known as the primordial sound of the universe. 
                      These guided sessions help reduce stress, improve concentration, and promote inner peace.
                    </p>
                  </div>
                  
                  <div className="grid gap-4">
                    {omChantings.map((meditation) => (
                      <div key={meditation.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                          <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${meditation.color} flex items-center justify-center`}>
                            {currentAudio === meditation.id && isPlaying ? (
                              <Pause className="h-6 w-6 text-white" />
                            ) : (
                              <Play className="h-6 w-6 text-white" />
                            )}
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {meditation.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                              {meditation.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                {meditation.duration}
                              </span>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleAudioToggle(meditation.id)}
                                  className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                >
                                  {currentAudio === meditation.id && isPlaying ? (
                                    <Pause className="h-4 w-4" />
                                  ) : (
                                    <Play className="h-4 w-4" />
                                  )}
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {currentAudio === meditation.id && (
                          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-4">
                                <button className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                                  <SkipBack className="h-4 w-4" />
                                </button>
                                <button
                                  onClick={() => handleAudioToggle(meditation.id)}
                                  className="p-3 bg-indigo-100 dark:bg-indigo-900/50 hover:bg-indigo-200 dark:hover:bg-indigo-800 rounded-full transition-colors"
                                >
                                  {currentAudio === meditation.id && isPlaying ? (
                                    <Pause className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                  ) : (
                                    <Play className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                  )}
                                </button>
                                <button className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                                  <SkipForward className="h-4 w-4" />
                                </button>
                              </div>
                              <div>
                                <button className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline">
                                  Repeat
                                </button>
                              </div>
                            </div>
                            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                              <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                              <span>1:45</span>
                              <span>{meditation.duration}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Visualization Meditations */}
              {meditationSubTab === 'visualization' && (
                <div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Indian Visualization Meditations
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Experience guided meditations that transport you to beautiful locations across India. 
                      Each session combines visual imagery with mindfulness techniques for a deeply immersive experience.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {visualizations.map((item) => (
                      <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <div className="relative h-48 overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.title} 
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                            <div>
                              <h3 className="text-white font-semibold mb-1">{item.title}</h3>
                              <p className="text-white/80 text-sm">{item.location}</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-4">
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                            {item.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              {item.duration}
                            </span>
                            <button
                              onClick={() => handleAudioToggle(item.id)}
                              className={`px-4 py-2 rounded-lg transition-colors ${currentAudio === item.id && isPlaying ? 
                                'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 
                                'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'}`}
                            >
                              <div className="flex items-center space-x-2">
                                {currentAudio === item.id && isPlaying ? (
                                  <>
                                    <Pause className="h-4 w-4" />
                                    <span>Pause</span>
                                  </>
                                ) : (
                                  <>
                                    <Play className="h-4 w-4" />
                                    <span>Play</span>
                                  </>
                                )}
                              </div>
                            </button>
                          </div>
                          
                          {currentAudio === item.id && (
                            <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                                <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                              </div>
                              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                                <span>1:30</span>
                                <span>{item.duration}</span>
                              </div>
                              <button className="mt-2 w-full py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors text-sm font-medium">
                                Enter Full Screen
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Sleep Aids */}
          {activeTab === 'sleep' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Sleep Aids & Affirmations
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Relax your mind and prepare for restful sleep
              </p>

              <div className="grid gap-4">
                {sleepSounds.map((sound) => (
                  <div key={sound.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${sound.color} flex items-center justify-center`}>
                        {currentAudio === sound.id && isPlaying ? (
                          <VolumeX className="h-6 w-6 text-white" />
                        ) : (
                          <Volume2 className="h-6 w-6 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {sound.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                          {sound.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {sound.duration}
                          </span>
                          <div className="flex items-center space-x-2">
                            <button className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                              <SkipBack className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleAudioToggle(sound.id)}
                              className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                            >
                              {currentAudio === sound.id && isPlaying ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </button>
                            <button className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors">
                              <SkipForward className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-xl">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                  Tonight's Affirmation
                </h3>
                <blockquote className="text-lg italic text-gray-700 dark:text-gray-300">
                  "I release the day's worries and embrace peaceful rest. My mind is calm, 
                  my body is relaxed, and I am ready for healing sleep."
                </blockquote>
              </div>
            </div>
          )}
          
          {/* Cultural Activities */}
          {activeTab === 'cultural' && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Indian Cultural Activities
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Explore traditional Indian practices for mental wellness and mindfulness
              </p>
              
              {/* Yoga Section */}
              <div className="mb-10">
                <div className="flex items-center mb-4">
                  <Sparkles className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Yoga Poses
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Practice these traditional yoga poses to improve physical and mental wellbeing
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {yogaPoses.map((pose) => (
                    <div key={pose.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="relative h-48 overflow-hidden">
                        <img 
                          src={pose.image} 
                          alt={pose.title} 
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 text-xs font-medium px-2 py-1 rounded-full">
                          {pose.difficulty}
                        </div>
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {pose.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          {pose.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {pose.duration} hold
                          </span>
                          <button className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg text-sm font-medium">
                            Start Timer
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Mantra Chanting Section */}
              <div className="mb-10">
                <div className="flex items-center mb-4">
                  <Music className="h-5 w-5 text-amber-600 dark:text-amber-400 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Mantra Chanting
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Experience the healing power of traditional Sanskrit mantras
                </p>
                
                <div className="grid gap-4">
                  {mantras.map((mantra) => (
                    <div key={mantra.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center space-x-4">
                        <div className={`w-16 h-16 rounded-lg bg-gradient-to-r ${mantra.color} flex items-center justify-center`}>
                          {currentAudio === mantra.id && isPlaying ? (
                            <Pause className="h-6 w-6 text-white" />
                          ) : (
                            <Play className="h-6 w-6 text-white" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                            {mantra.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                            {mantra.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              {mantra.duration}
                            </span>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleAudioToggle(mantra.id)}
                                className="p-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                              >
                                {currentAudio === mantra.id && isPlaying ? (
                                  <Pause className="h-4 w-4" />
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
                        <p className="text-center font-medium text-amber-800 dark:text-amber-300">
                          {mantra.text}
                        </p>
                      </div>
                      
                      {currentAudio === mantra.id && (
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-2">
                            <div className="bg-gradient-to-r from-amber-500 to-amber-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                          </div>
                          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                            <span>3:00</span>
                            <span>{mantra.duration}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Festival-Inspired Mindfulness */}
              <div>
                <div className="flex items-center mb-4">
                  <Sparkles className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Festival-Inspired Mindfulness
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Mindfulness practices inspired by traditional Indian festivals
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {festivals.map((festival) => (
                    <div key={festival.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                      <div className="relative h-40 overflow-hidden">
                        <img 
                          src={festival.image} 
                          alt={festival.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {festival.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          {festival.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {festival.duration}
                          </span>
                          <button
                            onClick={() => handleAudioToggle(festival.id)}
                            className="px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg text-sm font-medium"
                          >
                            Begin Practice
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl">
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                    Cultural Note
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    Indian festivals celebrate important cultural and spiritual traditions. These mindfulness 
                    practices are inspired by the core values of these celebrations - joy, light, renewal, and 
                    community - and adapted to support mental wellness regardless of cultural background.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Tools;