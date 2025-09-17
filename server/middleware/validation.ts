// Input Validation Middleware using Joi
import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validateRequest = (schema: Joi.ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.details.map(detail => detail.message)
      });
    }
    next();
  };
};

// User validation schemas
export const userRegistrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  displayName: Joi.string().max(100).optional(),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const anonymousUserSchema = Joi.object({
  displayName: Joi.string().max(100).optional(),
});

// Journal validation schemas
export const journalSchema = Joi.object({
  title: Joi.string().max(200).optional(),
  content: Joi.string().required(),
  mood: Joi.string().max(50).optional(),
  moodScore: Joi.number().integer().min(1).max(10).optional(),
  tags: Joi.array().items(Joi.string().max(50)).optional(),
  isPrivate: Joi.boolean().default(true),
});

export const journalUpdateSchema = Joi.object({
  title: Joi.string().max(200).optional(),
  content: Joi.string().optional(),
  mood: Joi.string().max(50).optional(),
  moodScore: Joi.number().integer().min(1).max(10).optional(),
  tags: Joi.array().items(Joi.string().max(50)).optional(),
  isPrivate: Joi.boolean().optional(),
});

// Progress validation schemas
export const progressSchema = Joi.object({
  goalType: Joi.string().max(100).required(),
  goalTitle: Joi.string().max(200).required(),
  goalDescription: Joi.string().optional(),
  targetValue: Joi.number().positive().optional(),
  unit: Joi.string().max(50).optional(),
  targetDate: Joi.date().optional(),
});

export const progressUpdateSchema = Joi.object({
  goalTitle: Joi.string().max(200).optional(),
  goalDescription: Joi.string().optional(),
  targetValue: Joi.number().positive().optional(),
  currentValue: Joi.number().min(0).optional(),
  unit: Joi.string().max(50).optional(),
  status: Joi.string().valid('active', 'completed', 'paused').optional(),
  targetDate: Joi.date().optional(),
});

// Chat validation schemas
export const chatSessionSchema = Joi.object({
  sessionTitle: Joi.string().max(200).optional(),
});

export const chatMessageSchema = Joi.object({
  content: Joi.string().required(),
  role: Joi.string().valid('user', 'assistant').required(),
  metadata: Joi.object().optional(),
});