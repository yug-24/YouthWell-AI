import React from 'react';
import { Phone, ExternalLink, Heart, BookOpen, Users, AlertTriangle } from 'lucide-react';

const Resources: React.FC = () => {
  const emergencyContacts = [
    {
      name: '988 Suicide & Crisis Lifeline',
      phone: '988',
      description: 'Free and confidential emotional support 24/7',
      available: '24/7'
    },
    {
      name: 'Crisis Text Line',
      phone: 'Text HOME to 741741',
      description: 'Free, 24/7 support for people in crisis',
      available: '24/7'
    },
    {
      name: 'Teen Line',
      phone: '1-800-852-8336',
      description: 'Teens helping teens through difficult times',
      available: '6PM-10PM PST'
    },
    {
      name: 'National Child Abuse Hotline',
      phone: '1-800-4-A-CHILD (1-800-422-4453)',
      description: 'Professional crisis counselors',
      available: '24/7'
    }
  ];

  const educationalResources = [
    {
      title: 'Understanding Mental Health',
      description: 'Learn about common mental health conditions affecting teens',
      category: 'Education',
      icon: BookOpen,
      links: [
        { text: 'NIMH Teen Mental Health', url: 'https://www.nimh.nih.gov/health/topics/child-and-adolescent-mental-health' },
        { text: 'Mental Health First Aid', url: 'https://www.mentalhealthfirstaid.org/mental-health-resources/' }
      ]
    },
    {
      title: 'Coping Strategies',
      description: 'Practical techniques for managing stress and difficult emotions',
      category: 'Self-Help',
      icon: Heart,
      links: [
        { text: 'Mindfulness Exercises', url: 'https://www.headspace.com/meditation/mindfulness' },
        { text: 'Breathing Techniques', url: 'https://www.healthline.com/health/breathing-exercises-for-anxiety' }
      ]
    },
    {
      title: 'Support Communities',
      description: 'Safe spaces to connect with others who understand',
      category: 'Community',
      icon: Users,
      links: [
        { text: 'Mental Health America', url: 'https://www.mhanational.org/finding-help' },
        { text: 'NAMI (National Alliance on Mental Illness)', url: 'https://www.nami.org/Home' }
      ]
    }
  ];

  const warningSign = [
    'Persistent sadness or hopelessness',
    'Withdrawal from friends, family, and activities',
    'Significant changes in sleep patterns',
    'Loss of interest in things you used to enjoy',
    'Difficulty concentrating or making decisions',
    'Changes in appetite or weight',
    'Increased irritability or anger',
    'Thoughts of death or suicide',
    'Engaging in risky behaviors',
    'Physical symptoms without clear medical cause'
  ];

  return (
    <div className="space-y-6 pb-20 lg:pb-0">
      {/* Emergency Section */}
      <div className="card bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-700">
        <div className="flex items-start mb-4">
          <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400 mr-3 mt-1 flex-shrink-0" />
          <div>
            <h1 className="text-2xl font-bold text-red-900 dark:text-red-100 mb-2">
              Crisis Resources
            </h1>
            <p className="text-red-800 dark:text-red-200">
              If you're having thoughts of suicide or self-harm, or if you're in immediate danger, 
              please reach out for help right away. You are not alone.
            </p>
          </div>
        </div>

        <div className="grid gap-4 mt-6">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-red-200 dark:border-red-700">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {contact.name}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                  {contact.available}
                </span>
              </div>
              <div className="flex items-center mb-2">
                <Phone className="h-4 w-4 text-red-600 dark:text-red-400 mr-2" />
                <span className="font-mono text-lg font-semibold text-red-600 dark:text-red-400">
                  {contact.phone}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {contact.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Warning Signs */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          When to Seek Professional Help
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          It's important to reach out to a trusted adult, counselor, or mental health professional 
          if you or someone you know is experiencing any of these warning signs:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {warningSign.map((sign, index) => (
            <div key={index} className="flex items-start p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
              <span className="text-sm text-gray-700 dark:text-gray-300">{sign}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <p className="text-blue-800 dark:text-blue-200 font-medium">
            Remember: Asking for help is a sign of strength, not weakness. 
            Mental health professionals are trained to help you navigate difficult times.
          </p>
        </div>
      </div>

      {/* Educational Resources */}
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Educational Resources
        </h2>

        <div className="space-y-6">
          {educationalResources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-start mb-4">
                  <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/50 rounded-lg flex items-center justify-center mr-4">
                    <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mr-3">
                        {resource.title}
                      </h3>
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded">
                        {resource.category}
                      </span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {resource.description}
                    </p>
                    <div className="space-y-2">
                      {resource.links.map((link, linkIndex) => (
                        <a
                          key={linkIndex}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 text-sm font-medium"
                        >
                          {link.text}
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mental Health Stigma */}
      <div className="card bg-gradient-to-r from-purple-50 to-indigo-50 dark:from-purple-900/20 dark:to-indigo-900/20">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Breaking the Stigma
        </h2>
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Mental health is just as important as physical health. It's normal to struggle sometimes, 
            and seeking help is a brave and healthy choice. Here are some important truths:
          </p>
          <ul className="space-y-2 text-gray-600 dark:text-gray-300">
            <li>• 1 in 5 teens experience a mental health condition</li>
            <li>• Mental health conditions are medical conditions, not character flaws</li>
            <li>• Treatment works and people recover</li>
            <li>• You deserve support and compassion</li>
            <li>• Your feelings are valid and important</li>
          </ul>
        </div>
      </div>

      {/* Footer */}
      <div className="card bg-gray-50 dark:bg-gray-800">
        <div className="text-center">
          <Heart className="h-8 w-8 text-red-500 mx-auto mb-3" />
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
            You Matter
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Your life has value, your feelings matter, and there are people who want to help. 
            Don't hesitate to reach out when you need support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Resources;