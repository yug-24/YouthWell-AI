// Secure Gemini service that calls backend endpoints
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface MoodAnalysis {
  mood: 'happy' | 'neutral' | 'sad' | 'anxious' | 'angry';
  confidence: number;
  suggestions: string[];
  supportiveMessage: string;
}

export interface ChatResponse {
  message: string;
  mood?: MoodAnalysis;
}

class GeminiService {
  async generateChatResponse(userMessage: string, conversationContext?: string[]): Promise<ChatResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat/ai-chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          conversationHistory: conversationContext
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating chat response:', error);
      return {
        message: "I'm here to listen and support you. Sometimes I might have trouble responding, but please know that your feelings matter and you're not alone."
      };
    }
  }

  async generateJournalInsights(entries: Array<{ content: string; mood: string; date: string }>): Promise<string> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/chat/journal-insights`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ entries })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data.insight;
    } catch (error) {
      console.error('Error generating journal insights:', error);
      return "You're doing great by taking time to reflect on your feelings. Keep writing - it's a powerful tool for understanding yourself better.";
    }
  }

  // Deprecated - this is now handled server-side
  async analyzeMood(text: string): Promise<MoodAnalysis> {
    return {
      mood: 'neutral',
      confidence: 0.5,
      suggestions: ['Take a moment to breathe', 'Consider talking to someone you trust'],
      supportiveMessage: 'Thank you for sharing your thoughts. Your feelings are valid.'
    };
  }
}

export default new GeminiService();