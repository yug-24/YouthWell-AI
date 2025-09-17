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