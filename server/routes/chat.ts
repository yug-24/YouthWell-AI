// Chat API Routes for YouthWell AI
import express from 'express';
import { storage } from '../storage';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';
import { validateRequest, chatSessionSchema, chatMessageSchema } from '../middleware/validation';

const router = express.Router();

// Get all chat sessions for authenticated user
router.get('/sessions', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const sessions = await storage.getChatSessionsByUserId(req.user!.id);

    res.json({
      sessions: sessions.map(session => ({
        id: session.id,
        sessionTitle: session.sessionTitle,
        isActive: session.isActive,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
      })),
    });
  } catch (error) {
    console.error('Chat sessions fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new chat session
router.post('/sessions', authenticateToken, validateRequest(chatSessionSchema), async (req: AuthenticatedRequest, res) => {
  try {
    const { sessionTitle } = req.body;

    const session = await storage.createChatSession({
      userId: req.user!.id,
      sessionTitle: sessionTitle || `Chat Session ${new Date().toLocaleString()}`,
      isActive: true,
    });

    res.status(201).json({
      message: 'Chat session created successfully',
      session: {
        id: session.id,
        sessionTitle: session.sessionTitle,
        isActive: session.isActive,
        createdAt: session.createdAt,
        updatedAt: session.updatedAt,
      },
    });
  } catch (error) {
    console.error('Chat session creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get messages for a specific chat session
router.get('/sessions/:sessionId/messages', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const sessionId = parseInt(req.params.sessionId);
    const messages = await storage.getChatMessages(sessionId, req.user!.id);

    res.json({
      sessionId,
      messages: messages.map(message => ({
        id: message.id,
        role: message.role,
        content: message.content,
        metadata: message.metadata,
        createdAt: message.createdAt,
      })),
    });
  } catch (error) {
    console.error('Chat messages fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Send message to chat session (placeholder for AI integration)
router.post('/sessions/:sessionId/messages', authenticateToken, validateRequest(chatMessageSchema), async (req: AuthenticatedRequest, res) => {
  try {
    const sessionId = parseInt(req.params.sessionId);
    const { content, role } = req.body;

    // Verify user owns the session
    const session = await storage.getChatSession(sessionId, req.user!.id);
    if (!session) {
      return res.status(404).json({ error: 'Chat session not found' });
    }

    // Save user message
    const userMessage = await storage.createChatMessage({
      sessionId,
      role: 'user',
      content,
      metadata: { timestamp: new Date().toISOString() },
    });

    // Generate AI response (placeholder - in production, integrate with AI service)
    const aiResponse = generateAIResponse(content);
    
    const assistantMessage = await storage.createChatMessage({
      sessionId,
      role: 'assistant',
      content: aiResponse,
      metadata: { 
        timestamp: new Date().toISOString(),
        model: 'placeholder-ai-model',
        confidence: 0.95
      },
    });

    res.status(201).json({
      message: 'Messages sent successfully',
      userMessage: {
        id: userMessage.id,
        role: userMessage.role,
        content: userMessage.content,
        createdAt: userMessage.createdAt,
      },
      assistantMessage: {
        id: assistantMessage.id,
        role: assistantMessage.role,
        content: assistantMessage.content,
        createdAt: assistantMessage.createdAt,
      },
    });
  } catch (error) {
    console.error('Chat message creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update chat session
router.put('/sessions/:sessionId', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const sessionId = parseInt(req.params.sessionId);
    const { sessionTitle, isActive } = req.body;

    // Verify user owns the session
    const session = await storage.getChatSession(sessionId, req.user!.id);
    if (!session) {
      return res.status(404).json({ error: 'Chat session not found' });
    }

    // For now, we'll simulate updating by returning the updated data
    // In a real implementation, you'd add an updateChatSession method to storage
    const updatedSession = {
      ...session,
      sessionTitle: sessionTitle || session.sessionTitle,
      isActive: isActive !== undefined ? isActive : session.isActive,
      updatedAt: new Date(),
    };

    res.json({
      message: 'Chat session updated successfully',
      session: {
        id: updatedSession.id,
        sessionTitle: updatedSession.sessionTitle,
        isActive: updatedSession.isActive,
        createdAt: updatedSession.createdAt,
        updatedAt: updatedSession.updatedAt,
      },
    });
  } catch (error) {
    console.error('Chat session update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Simple AI Chat endpoint for frontend (non-authenticated)
router.post('/ai-chat', async (req: express.Request, res: express.Response) => {
  try {
    const { message, conversationHistory } = req.body;
    
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Use Gemini AI if available, otherwise fallback
    if (process.env.GEMINI_API_KEY) {
      const aiResponse = await generateGeminiResponse(message, conversationHistory);
      return res.json(aiResponse);
    }

    // Fallback to simple responses
    const fallbackResponse = generateAIResponse(message);
    const moodAnalysis = {
      mood: detectSimpleMood(message),
      confidence: 0.7,
      suggestions: ['Take a moment to breathe', 'Consider talking to someone you trust'],
      supportiveMessage: 'Thank you for sharing your thoughts with me.'
    };

    res.json({
      message: fallbackResponse,
      mood: moodAnalysis
    });

  } catch (error) {
    console.error('AI Chat error:', error);
    res.status(500).json({
      error: 'AI service error',
      message: "I'm here to listen and support you. Sometimes I might have trouble responding, but please know that your feelings matter and you're not alone."
    });
  }
});

// Journal insights endpoint (non-authenticated)  
router.post('/journal-insights', async (req: express.Request, res: express.Response) => {
  try {
    const { entries } = req.body;
    
    if (!entries || !Array.isArray(entries)) {
      return res.status(400).json({ error: 'Entries array is required' });
    }

    let insight = "You're doing great by taking time to reflect on your feelings. Keep writing - it's a powerful tool for understanding yourself better.";

    if (process.env.GEMINI_API_KEY) {
      try {
        const { GoogleGenerativeAI } = await import('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
        
        const recentEntries = entries.slice(-7);
        const entriesText = recentEntries.map((entry: any) => 
          `Date: ${entry.date}, Mood: ${entry.mood}, Content: ${entry.content.substring(0, 200)}...`
        ).join('\n');

        const prompt = `
          Based on these recent journal entries from a teenager, provide a supportive insight about their emotional journey.
          
          Entries:
          ${entriesText}
          
          Provide a brief, encouraging insight (2-3 sentences) that:
          - Acknowledges their emotional patterns
          - Highlights any positive trends or strengths
          - Offers gentle encouragement
          - Remains supportive and non-clinical
        `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        insight = response.text();
      } catch (geminiError) {
        console.error('Gemini insight generation error:', geminiError);
        // Fall back to default insight
      }
    }

    res.json({ insight });

  } catch (error) {
    console.error('Journal insights error:', error);
    res.json({
      insight: "You're doing great by taking time to reflect on your feelings. Keep writing - it's a powerful tool for understanding yourself better."
    });
  }
});

// Generate Gemini response
async function generateGeminiResponse(message: string, conversationHistory?: string[]) {
  try {
    const { GoogleGenerativeAI } = await import('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });
    
    // Generate AI response
    const context = conversationHistory ? conversationHistory.slice(-6).join('\n') : '';
    const prompt = `
      You are a supportive AI companion for teenagers (13-18 years old) focused on mental wellness. 
      You are empathetic, non-judgmental, and provide emotional support.
      
      IMPORTANT GUIDELINES:
      - You are NOT a therapist or medical professional
      - Always remind users in crisis to contact emergency services or a trusted adult
      - Be warm, understanding, and age-appropriate
      - Validate their feelings without minimizing them
      - Offer gentle coping strategies when appropriate
      - Keep responses conversational and supportive (2-3 sentences)
      
      Previous conversation context:
      ${context}
      
      User's current message: "${message}"
      
      Respond with empathy and support. If they express severe distress, gently encourage them to reach out for professional help.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const aiMessage = response.text();

    // Analyze mood
    const moodAnalysis = await analyzeGeminiMood(message, model);

    return {
      message: aiMessage,
      mood: moodAnalysis
    };

  } catch (error) {
    console.error('Gemini response error:', error);
    throw error;
  }
}

// Analyze mood with Gemini
async function analyzeGeminiMood(text: string, model: any) {
  try {
    const prompt = `
      Analyze the emotional content of this text and provide a mood assessment for a teenager (13-18 years old).
      
      Text: "${text}"
      
      Please respond with a JSON object containing:
      {
        "mood": "happy" | "neutral" | "sad" | "anxious" | "angry",
        "confidence": number between 0-1,
        "suggestions": array of 2-3 helpful suggestions,
        "supportiveMessage": a warm, empathetic message for the user
      }
      
      Be supportive, understanding, and age-appropriate. Focus on validation and gentle guidance.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text_response = response.text();
    
    // Clean the response to extract JSON
    const jsonMatch = text_response.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // Fallback if JSON parsing fails
    return {
      mood: 'neutral',
      confidence: 0.5,
      suggestions: ['Take a moment to breathe', 'Consider talking to someone you trust'],
      supportiveMessage: 'Thank you for sharing your thoughts. Your feelings are valid.'
    };
  } catch (error) {
    console.error('Mood analysis error:', error);
    return {
      mood: 'neutral',
      confidence: 0,
      suggestions: ['Take care of yourself', 'Remember that you matter'],
      supportiveMessage: 'I appreciate you sharing with me. You\'re not alone in this.'
    };
  }
}

// Simple mood detection fallback
function detectSimpleMood(text: string): 'happy' | 'neutral' | 'sad' | 'anxious' | 'angry' {
  const lowerText = text.toLowerCase();
  
  if (lowerText.includes('anxious') || lowerText.includes('worry') || lowerText.includes('nervous')) {
    return 'anxious';
  }
  if (lowerText.includes('sad') || lowerText.includes('depressed') || lowerText.includes('upset')) {
    return 'sad';
  }
  if (lowerText.includes('angry') || lowerText.includes('mad') || lowerText.includes('frustrated')) {
    return 'angry';
  }
  if (lowerText.includes('happy') || lowerText.includes('good') || lowerText.includes('great')) {
    return 'happy';
  }
  
  return 'neutral';
}

// Placeholder AI response generator
function generateAIResponse(userInput: string): string {
  // This is a placeholder. In production, integrate with OpenAI, Claude, or other AI services
  const responses = [
    "I understand you're sharing something important with me. How are you feeling about this?",
    "Thank you for opening up. It takes courage to share your thoughts and feelings.",
    "I hear you. What would be most helpful for you right now?",
    "That sounds challenging. Have you tried any coping strategies that have worked for you before?",
    "Your feelings are valid. Would you like to explore some mindfulness techniques together?",
    "I'm here to support you. What's one small step you could take today for your wellbeing?",
    "It's important to acknowledge what you're going through. How can we work together on this?",
    "Thank you for trusting me with this. What would make you feel more supported right now?",
  ];

  // Simple keyword-based responses
  const lowerInput = userInput.toLowerCase();
  
  if (lowerInput.includes('anxious') || lowerInput.includes('anxiety')) {
    return "I understand you're feeling anxious. Anxiety is very common and manageable. Would you like to try a breathing exercise together? Remember to take slow, deep breaths and focus on the present moment.";
  }
  
  if (lowerInput.includes('sad') || lowerInput.includes('depressed')) {
    return "I hear that you're feeling down. It's okay to feel sad sometimes. Have you been able to do any activities that usually bring you joy? Even small steps can make a difference.";
  }
  
  if (lowerInput.includes('stress') || lowerInput.includes('overwhelmed')) {
    return "Feeling overwhelmed is a sign that you might be taking on a lot right now. Let's break things down into smaller, manageable pieces. What's the most pressing thing on your mind?";
  }
  
  if (lowerInput.includes('happy') || lowerInput.includes('good') || lowerInput.includes('great')) {
    return "I'm so glad to hear you're feeling positive! It's wonderful when we can recognize and celebrate the good moments. What's contributing to these good feelings?";
  }

  // Default response
  return responses[Math.floor(Math.random() * responses.length)];
}

export default router;