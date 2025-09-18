import React, { useState, useEffect } from 'react';
import { Wind, Heart, Volume2, VolumeX, Play, Pause, SkipBack, SkipForward, Image, Music, Sparkles } from 'lucide-react';
import AudioPlayer from '../components/AudioPlayer';
import morningCalmImage from '@assets/generated_images/Indian_meditation_morning_calm_46a7515d.png';
import anxietyReliefImage from '@assets/generated_images/Indian_anxiety_relief_meditation_5da3d691.png';
import bodyScanImage from '@assets/generated_images/Indian_body_scan_relaxation_27242aeb.png';
import omChantingImage from '@assets/generated_images/Sacred_Om_chanting_meditation_7bbcd4c0.png';
import interstellarImage from '@assets/generated_images/Interstellar_cosmic_meditation_9168f41d.png';

const Tools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'breathing' | 'meditation' | 'sleep' | 'cultural'>('breathing');
  const [meditationSubTab, setMeditationSubTab] = useState<'general' | 'om' | 'visualization' | 'interstellar'>('general');
  const [breathingPhase, setBreathingPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [breathingActive, setBreathingActive] = useState(false);
  const [breathingCount, setBreathingCount] = useState(0);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);

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
      id: 'morning-calm',
      title: '5-Minute Morning Calm',
      duration: '5:00',
      description: 'Start your day with gentle mindfulness',
      color: 'from-blue-400 to-blue-600',
      audioFile: '5 Minute Peaceful Morning Meditation Music_1758182528871.mp3',
      image: morningCalmImage
    },
    {
      id: 'anxiety-relief',
      title: 'Anxiety Relief',
      duration: '5:00',
      description: 'Techniques to ease worried thoughts',
      color: 'from-emerald-400 to-emerald-600',
      audioFile: '5 Minute Stress Relief Guided Meditation_1758182528872.mp3',
      image: anxietyReliefImage
    },
    {
      id: 'body-scan',
      title: 'Body Scan Relaxation',
      duration: '5:00',
      description: 'Release tension throughout your body',
      color: 'from-purple-400 to-purple-600',
      audioFile: 'Relax Your Body & Your Mind ~ 5 Minute Guided Meditation_1758182528870.mp3',
      image: bodyScanImage
    }
  ];
  
  const omChantings = [
    {
      id: 'om-chanting',
      title: 'OM Meditation - 432Hz',
      duration: '5:00',
      description: 'Sacred OM chanting at 432Hz frequency for deep relaxation',
      color: 'from-indigo-400 to-indigo-600',
      audioFile: 'Om Chanting for 5 Mins@432Hz,Relax Mind & Body, Connects your soul with universe! #omchanting #om_1758182528868.mp3',
      image: omChantingImage
    }
  ];
  
  const interstellarMeditations = [
    {
      id: 'interstellar-calm',
      title: 'Interstellar Calm – 5 Minutes',
      duration: '5:00',
      description: 'Cosmic meditation journey through space and time',
      color: 'from-purple-600 to-blue-800',
      audioFile: 'Interstellar Main Theme - Hans Zimmer_1758182528872.mp3',
      image: interstellarImage
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
      id: 'ocean-waves',
      title: 'Ocean Waves',
      duration: '5:00',
      description: 'Gentle waves for peaceful sleep',
      color: 'from-teal-400 to-teal-600',
      audioFile: 'Relax _ 5 minutes of Sand and Sea _ Sounds of Nature _ Sleep Sounds_1758182528869.mp3'
    },
    {
      id: 'forest-rain',
      title: 'Forest Rain',
      duration: '5:00',
      description: 'Soothing raindrops in nature',
      color: 'from-green-400 to-green-600',
      audioFile: 'JUST 5 MINUTES Rain Forest Thunder & Rain Sleep Sounds Forest Sounds  Ambience Bird  BE WITH NATURE❤_1758182528863.mp3'
    },
    {
      id: 'bedtime-affirmations',
      title: 'Bedtime Affirmations',
      duration: '5:00',
      description: 'Positive thoughts for restful sleep',
      color: 'from-indigo-400 to-indigo-600',
      audioFile: 'Bedtime Affirmations _ Listen Every Night for Peaceful Sleep 🌙_1758182528872.mp3'
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
    setCurrentAudio(audioId);
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
                  Meditations
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
                  onClick={() => setMeditationSubTab('interstellar')}
                  className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
                    meditationSubTab === 'interstellar'
                      ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  General Meditation
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
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                      Guided Meditations
                    </h3>
                    <div className="grid gap-6">
                      {meditations.map((meditation) => (
                        <div key={meditation.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                          <div className="flex items-center space-x-4 p-4">
                            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                              <img 
                                src={meditation.image} 
                                alt={meditation.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                                {meditation.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                                {meditation.description}
                              </p>
                              <AudioPlayer
                                audioSrc={`/uploads/${encodeURIComponent(meditation.audioFile)}`}
                                title={meditation.title}
                                duration={meditation.duration}
                                isActive={currentAudio === meditation.id}
                                onToggle={() => handleAudioToggle(meditation.id)}
                                className="mb-2"
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* OM Chanting */}
              {meditationSubTab === 'om' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      OM Chanting Meditation
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Experience the sacred sound of OM (ॐ), known as the primordial sound of the universe. 
                      This guided session helps reduce stress, improve concentration, and promote inner peace.
                    </p>
                  </div>
                  
                  <div className="grid gap-6">
                    {omChantings.map((meditation) => (
                      <div key={meditation.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <div className="flex items-center space-x-4 p-4">
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={meditation.image} 
                              alt={meditation.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {meditation.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                              {meditation.description}
                            </p>
                            <AudioPlayer
                              audioSrc={`/uploads/${encodeURIComponent(meditation.audioFile)}`}
                              title={meditation.title}
                              duration={meditation.duration}
                              isActive={currentAudio === meditation.id}
                              onToggle={() => handleAudioToggle(meditation.id)}
                              className="mb-2"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interstellar Meditation */}
              {meditationSubTab === 'interstellar' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      General Meditation - Interstellar
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Journey through cosmic spaces with ethereal meditation music that transcends earthly boundaries.
                    </p>
                  </div>
                  
                  <div className="grid gap-6">
                    {interstellarMeditations.map((meditation) => (
                      <div key={meditation.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <div className="flex items-center space-x-4 p-4">
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={meditation.image} 
                              alt={meditation.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                              {meditation.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                              {meditation.description}
                            </p>
                            <AudioPlayer
                              audioSrc={`/uploads/${encodeURIComponent(meditation.audioFile)}`}
                              title={meditation.title}
                              duration={meditation.duration}
                              isActive={currentAudio === meditation.id}
                              onToggle={() => handleAudioToggle(meditation.id)}
                              className="mb-2"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Visualization */}
              {meditationSubTab === 'visualization' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      Indian Cultural Visualizations
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Immerse yourself in the serene landscapes and sacred places of India through guided visualization.
                    </p>
                  </div>
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    {visualizations.map((visualization) => (
                      <div key={visualization.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                        <div className="aspect-video relative overflow-hidden">
                          <img 
                            src={visualization.image} 
                            alt={visualization.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => handleAudioToggle(visualization.id)}
                              className="p-4 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"
                            >
                              <Play className="h-8 w-8 text-gray-800 ml-1" />
                            </button>
                          </div>
                        </div>
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                              {visualization.title}
                            </h3>
                            <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                              {visualization.location}
                            </span>
                          </div>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">
                            {visualization.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                              {visualization.duration}
                            </span>
                            <button
                              onClick={() => handleAudioToggle(visualization.id)}
                              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                            >
                              Start Session
                            </button>
                          </div>
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
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Sleep Aids
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Soothing sounds and affirmations to help you drift into peaceful sleep
                </p>
              </div>

              <div className="grid gap-6">
                {sleepSounds.map((sound) => (
                  <div key={sound.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                    <div className="flex items-center space-x-4 p-4">
                      <div className={`w-20 h-20 rounded-lg bg-gradient-to-r ${sound.color} flex items-center justify-center flex-shrink-0`}>
                        <Volume2 className="h-8 w-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {sound.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                          {sound.description}
                        </p>
                        <AudioPlayer
                          audioSrc={`/uploads/${encodeURIComponent(sound.audioFile)}`}
                          title={sound.title}
                          duration={sound.duration}
                          isActive={currentAudio === sound.id}
                          onToggle={() => handleAudioToggle(sound.id)}
                          className="mb-2"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cultural Activities */}
          {activeTab === 'cultural' && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Indian Cultural Wellness Activities
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  Explore traditional Indian practices for mental wellness and spiritual growth
                </p>
              </div>

              {/* Yoga Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Traditional Yoga Poses
                </h3>
                <div className="grid gap-6 md:grid-cols-2">
                  {yogaPoses.map((pose) => (
                    <div key={pose.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={pose.image} 
                          alt={pose.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-4 right-4">
                          <span className="bg-white bg-opacity-90 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
                            {pose.difficulty}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {pose.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {pose.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {pose.duration}
                          </span>
                          <button className="px-4 py-2 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-300 rounded-lg text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800 transition-colors">
                            Try Pose
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mantras Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Sacred Mantras
                </h3>
                <div className="grid gap-6">
                  {mantras.map((mantra) => (
                    <div key={mantra.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                      <div className={`w-full h-2 bg-gradient-to-r ${mantra.color} rounded-full mb-4`}></div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {mantra.title}
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {mantra.description}
                      </p>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
                        <p className="text-center text-lg font-medium text-gray-900 dark:text-white leading-relaxed">
                          {mantra.text}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                          Recommended: {mantra.duration}
                        </span>
                        <button className="px-4 py-2 bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 rounded-lg text-sm font-medium hover:bg-amber-200 dark:hover:bg-amber-800 transition-colors">
                          Start Chanting
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Festival Meditations Section */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Festival-Inspired Meditations
                </h3>
                <div className="grid gap-6 md:grid-cols-3">
                  {festivals.map((festival) => (
                    <div key={festival.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                      <div className="aspect-video relative overflow-hidden">
                        <img 
                          src={festival.image} 
                          alt={festival.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                          <button className="p-4 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all">
                            <Play className="h-8 w-8 text-gray-800 ml-1" />
                          </button>
                        </div>
                      </div>
                      <div className="p-6">
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                          {festival.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {festival.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {festival.duration}
                          </span>
                          <button className="px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                            Experience
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
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