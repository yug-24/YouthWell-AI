// Progress API Routes for YouthWell AI
import express from 'express';
import { storage } from '../storage';
import { authenticateToken, AuthenticatedRequest } from '../middleware/auth';
import { validateRequest, progressSchema, progressUpdateSchema } from '../middleware/validation';

const router = express.Router();

// Get all progress goals for authenticated user
router.get('/', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const progressItems = await storage.getProgressByUserId(req.user!.id);

    res.json({
      progress: progressItems.map(item => ({
        id: item.id,
        goalType: item.goalType,
        goalTitle: item.goalTitle,
        goalDescription: item.goalDescription,
        targetValue: item.targetValue,
        currentValue: item.currentValue,
        unit: item.unit,
        status: item.status,
        startDate: item.startDate,
        targetDate: item.targetDate,
        completedAt: item.completedAt,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        progressPercentage: item.targetValue && item.targetValue > 0 
          ? Math.min(100, Math.round((item.currentValue / item.targetValue) * 100))
          : null,
      })),
    });
  } catch (error) {
    console.error('Progress fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get specific progress goal by ID
router.get('/:id', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const progressId = parseInt(req.params.id);
    const progressItem = await storage.getProgress(progressId, req.user!.id);

    if (!progressItem) {
      return res.status(404).json({ error: 'Progress goal not found' });
    }

    res.json({
      progress: {
        id: progressItem.id,
        goalType: progressItem.goalType,
        goalTitle: progressItem.goalTitle,
        goalDescription: progressItem.goalDescription,
        targetValue: progressItem.targetValue,
        currentValue: progressItem.currentValue,
        unit: progressItem.unit,
        status: progressItem.status,
        startDate: progressItem.startDate,
        targetDate: progressItem.targetDate,
        completedAt: progressItem.completedAt,
        createdAt: progressItem.createdAt,
        updatedAt: progressItem.updatedAt,
        progressPercentage: progressItem.targetValue && progressItem.targetValue > 0 
          ? Math.min(100, Math.round((progressItem.currentValue / progressItem.targetValue) * 100))
          : null,
      },
    });
  } catch (error) {
    console.error('Progress fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new progress goal
router.post('/', authenticateToken, validateRequest(progressSchema), async (req: AuthenticatedRequest, res) => {
  try {
    const { goalType, goalTitle, goalDescription, targetValue, unit, targetDate } = req.body;

    const progressItem = await storage.createProgress({
      userId: req.user!.id,
      goalType,
      goalTitle,
      goalDescription,
      targetValue,
      currentValue: 0,
      unit,
      status: 'active',
      startDate: new Date(),
      targetDate: targetDate ? new Date(targetDate) : undefined,
    });

    res.status(201).json({
      message: 'Progress goal created successfully',
      progress: {
        id: progressItem.id,
        goalType: progressItem.goalType,
        goalTitle: progressItem.goalTitle,
        goalDescription: progressItem.goalDescription,
        targetValue: progressItem.targetValue,
        currentValue: progressItem.currentValue,
        unit: progressItem.unit,
        status: progressItem.status,
        startDate: progressItem.startDate,
        targetDate: progressItem.targetDate,
        createdAt: progressItem.createdAt,
        updatedAt: progressItem.updatedAt,
      },
    });
  } catch (error) {
    console.error('Progress creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update progress goal
router.put('/:id', authenticateToken, validateRequest(progressUpdateSchema), async (req: AuthenticatedRequest, res) => {
  try {
    const progressId = parseInt(req.params.id);
    const updates = req.body;

    // If status is being set to completed, set completedAt
    if (updates.status === 'completed') {
      updates.completedAt = new Date();
    }

    const updatedProgress = await storage.updateProgress(progressId, req.user!.id, updates);

    if (!updatedProgress) {
      return res.status(404).json({ error: 'Progress goal not found' });
    }

    res.json({
      message: 'Progress goal updated successfully',
      progress: {
        id: updatedProgress.id,
        goalType: updatedProgress.goalType,
        goalTitle: updatedProgress.goalTitle,
        goalDescription: updatedProgress.goalDescription,
        targetValue: updatedProgress.targetValue,
        currentValue: updatedProgress.currentValue,
        unit: updatedProgress.unit,
        status: updatedProgress.status,
        startDate: updatedProgress.startDate,
        targetDate: updatedProgress.targetDate,
        completedAt: updatedProgress.completedAt,
        createdAt: updatedProgress.createdAt,
        updatedAt: updatedProgress.updatedAt,
        progressPercentage: updatedProgress.targetValue && updatedProgress.targetValue > 0 
          ? Math.min(100, Math.round((updatedProgress.currentValue / updatedProgress.targetValue) * 100))
          : null,
      },
    });
  } catch (error) {
    console.error('Progress update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update progress value (increment/decrement)
router.patch('/:id/value', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const progressId = parseInt(req.params.id);
    const { increment, value } = req.body;

    const currentProgress = await storage.getProgress(progressId, req.user!.id);
    if (!currentProgress) {
      return res.status(404).json({ error: 'Progress goal not found' });
    }

    let newValue: number;
    if (value !== undefined) {
      newValue = Math.max(0, value);
    } else if (increment !== undefined) {
      newValue = Math.max(0, currentProgress.currentValue + increment);
    } else {
      return res.status(400).json({ error: 'Either value or increment must be provided' });
    }

    // Check if goal is completed
    const isCompleted = currentProgress.targetValue && newValue >= currentProgress.targetValue;
    const updates: any = {
      currentValue: newValue,
    };

    if (isCompleted && currentProgress.status === 'active') {
      updates.status = 'completed';
      updates.completedAt = new Date();
    }

    const updatedProgress = await storage.updateProgress(progressId, req.user!.id, updates);

    res.json({
      message: 'Progress value updated successfully',
      progress: {
        id: updatedProgress!.id,
        currentValue: updatedProgress!.currentValue,
        status: updatedProgress!.status,
        completedAt: updatedProgress!.completedAt,
        progressPercentage: updatedProgress!.targetValue && updatedProgress!.targetValue > 0 
          ? Math.min(100, Math.round((updatedProgress!.currentValue / updatedProgress!.targetValue) * 100))
          : null,
      },
    });
  } catch (error) {
    console.error('Progress value update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete progress goal
router.delete('/:id', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const progressId = parseInt(req.params.id);
    const deleted = await storage.deleteProgress(progressId, req.user!.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Progress goal not found' });
    }

    res.json({
      message: 'Progress goal deleted successfully',
    });
  } catch (error) {
    console.error('Progress deletion error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get progress analytics
router.get('/analytics/summary', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const progressItems = await storage.getProgressByUserId(req.user!.id);

    const totalGoals = progressItems.length;
    const completedGoals = progressItems.filter(item => item.status === 'completed').length;
    const activeGoals = progressItems.filter(item => item.status === 'active').length;
    const pausedGoals = progressItems.filter(item => item.status === 'paused').length;

    // Calculate overall completion rate
    const completionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

    // Group by goal type
    const goalsByType = progressItems.reduce((groups, item) => {
      const type = item.goalType;
      if (!groups[type]) {
        groups[type] = {
          total: 0,
          completed: 0,
          active: 0,
          paused: 0,
        };
      }
      groups[type].total++;
      groups[type][item.status as keyof typeof groups[typeof type]]++;
      return groups;
    }, {} as Record<string, any>);

    res.json({
      analytics: {
        summary: {
          totalGoals,
          completedGoals,
          activeGoals,
          pausedGoals,
          completionRate,
        },
        goalsByType,
      },
    });
  } catch (error) {
    console.error('Progress analytics error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;