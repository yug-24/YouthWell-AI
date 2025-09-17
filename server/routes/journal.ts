// Journal API Routes for YouthWell AI
import express from 'express';
import { storage } from '../storage';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';
import { validateRequest, journalSchema, journalUpdateSchema } from '../middleware/validation';

const router = express.Router();

// Get all journals for authenticated user
router.get('/', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const limit = parseInt(req.query.limit as string) || 50;
    const journals = await storage.getJournalsByUserId(req.user!.id, limit);

    res.json({
      journals: journals.map(journal => ({
        id: journal.id,
        title: journal.title,
        content: journal.content,
        mood: journal.mood,
        moodScore: journal.moodScore,
        tags: journal.tags,
        isPrivate: journal.isPrivate,
        createdAt: journal.createdAt,
        updatedAt: journal.updatedAt,
      })),
    });
  } catch (error) {
    console.error('Journals fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get specific journal by ID
router.get('/:id', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const journalId = parseInt(req.params.id);
    const journal = await storage.getJournal(journalId, req.user!.id);

    if (!journal) {
      return res.status(404).json({ error: 'Journal not found' });
    }

    res.json({
      journal: {
        id: journal.id,
        title: journal.title,
        content: journal.content,
        mood: journal.mood,
        moodScore: journal.moodScore,
        tags: journal.tags,
        isPrivate: journal.isPrivate,
        createdAt: journal.createdAt,
        updatedAt: journal.updatedAt,
      },
    });
  } catch (error) {
    console.error('Journal fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new journal entry
router.post('/', authenticateToken, validateRequest(journalSchema), async (req: AuthenticatedRequest, res) => {
  try {
    const { title, content, mood, moodScore, tags, isPrivate } = req.body;

    const journal = await storage.createJournal({
      userId: req.user!.id,
      title,
      content,
      mood,
      moodScore,
      tags,
      isPrivate: isPrivate !== undefined ? isPrivate : true,
    });

    res.status(201).json({
      message: 'Journal entry created successfully',
      journal: {
        id: journal.id,
        title: journal.title,
        content: journal.content,
        mood: journal.mood,
        moodScore: journal.moodScore,
        tags: journal.tags,
        isPrivate: journal.isPrivate,
        createdAt: journal.createdAt,
        updatedAt: journal.updatedAt,
      },
    });
  } catch (error) {
    console.error('Journal creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update journal entry
router.put('/:id', authenticateToken, validateRequest(journalUpdateSchema), async (req: AuthenticatedRequest, res) => {
  try {
    const journalId = parseInt(req.params.id);
    const updates = req.body;

    const updatedJournal = await storage.updateJournal(journalId, req.user!.id, updates);

    if (!updatedJournal) {
      return res.status(404).json({ error: 'Journal not found' });
    }

    res.json({
      message: 'Journal entry updated successfully',
      journal: {
        id: updatedJournal.id,
        title: updatedJournal.title,
        content: updatedJournal.content,
        mood: updatedJournal.mood,
        moodScore: updatedJournal.moodScore,
        tags: updatedJournal.tags,
        isPrivate: updatedJournal.isPrivate,
        createdAt: updatedJournal.createdAt,
        updatedAt: updatedJournal.updatedAt,
      },
    });
  } catch (error) {
    console.error('Journal update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete journal entry
router.delete('/:id', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const journalId = parseInt(req.params.id);
    const deleted = await storage.deleteJournal(journalId, req.user!.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Journal not found' });
    }

    res.json({
      message: 'Journal entry deleted successfully',
    });
  } catch (error) {
    console.error('Journal deletion error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get mood analytics for user
router.get('/analytics/mood', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const days = parseInt(req.query.days as string) || 30;
    const journals = await storage.getJournalsByUserId(req.user!.id, 1000);

    // Filter journals from the last N days with mood scores
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const moodData = journals
      .filter(journal => 
        journal.createdAt >= cutoffDate && 
        journal.moodScore !== null && 
        journal.moodScore !== undefined
      )
      .map(journal => ({
        date: journal.createdAt.toISOString().split('T')[0],
        mood: journal.mood,
        score: journal.moodScore,
      }));

    // Calculate average mood score
    const avgMoodScore = moodData.length > 0 
      ? moodData.reduce((sum, entry) => sum + entry.score!, 0) / moodData.length
      : null;

    // Count mood types
    const moodCounts = moodData.reduce((counts, entry) => {
      if (entry.mood) {
        counts[entry.mood] = (counts[entry.mood] || 0) + 1;
      }
      return counts;
    }, {} as Record<string, number>);

    res.json({
      analytics: {
        periodDays: days,
        totalEntries: moodData.length,
        averageMoodScore: avgMoodScore,
        moodDistribution: moodCounts,
        dailyMoods: moodData,
      },
    });
  } catch (error) {
    console.error('Mood analytics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;