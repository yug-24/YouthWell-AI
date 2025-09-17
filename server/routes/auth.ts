// Authentication API Routes for YouthWell AI
import express from 'express';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import { storage } from '../storage';
import { generateToken, authenticateToken, AuthenticatedRequest } from '../middleware/auth';
import { validateRequest, userRegistrationSchema, userLoginSchema, anonymousUserSchema } from '../middleware/validation';

const router = express.Router();

// Register new user with email and password
router.post('/register', validateRequest(userRegistrationSchema), async (req, res) => {
  try {
    const { email, password, displayName } = req.body;

    // Check if user already exists
    const existingUser = await storage.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User with this email already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await storage.createUser({
      email,
      password: hashedPassword,
      displayName,
      isAnonymous: false,
      isActive: true,
    });

    // Generate JWT token
    const token = generateToken(user);

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: user.id,
        uuid: user.uuid,
        email: user.email,
        displayName: user.displayName,
        isAnonymous: user.isAnonymous,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login existing user
router.post('/login', validateRequest(userLoginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await storage.getUserByEmail(email);
    if (!user || user.isAnonymous) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password!);
    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Update last login
    await storage.updateUser(user.id, { lastLoginAt: new Date() });

    // Generate JWT token
    const token = generateToken(user);

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        uuid: user.uuid,
        email: user.email,
        displayName: user.displayName,
        isAnonymous: user.isAnonymous,
        lastLoginAt: user.lastLoginAt,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create anonymous user session
router.post('/anonymous', validateRequest(anonymousUserSchema), async (req, res) => {
  try {
    const { displayName } = req.body;

    // Create anonymous user
    const user = await storage.createUser({
      displayName: displayName || 'Anonymous User',
      isAnonymous: true,
      isActive: true,
    });

    // Generate JWT token
    const token = generateToken(user);

    res.status(201).json({
      message: 'Anonymous session created',
      token,
      user: {
        id: user.id,
        uuid: user.uuid,
        displayName: user.displayName,
        isAnonymous: user.isAnonymous,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error('Anonymous user creation error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get current user profile
router.get('/profile', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const user = await storage.getUser(req.user!.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      user: {
        id: user.id,
        uuid: user.uuid,
        email: user.email,
        displayName: user.displayName,
        isAnonymous: user.isAnonymous,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
      },
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile
router.put('/profile', authenticateToken, async (req: AuthenticatedRequest, res) => {
  try {
    const { displayName } = req.body;
    
    const updatedUser = await storage.updateUser(req.user!.id, {
      displayName,
      updatedAt: new Date(),
    });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({
      message: 'Profile updated successfully',
      user: {
        id: updatedUser.id,
        uuid: updatedUser.uuid,
        email: updatedUser.email,
        displayName: updatedUser.displayName,
        isAnonymous: updatedUser.isAnonymous,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Convert anonymous user to registered user
router.post('/convert', authenticateToken, validateRequest(userRegistrationSchema), async (req: AuthenticatedRequest, res) => {
  try {
    const { email, password } = req.body;

    if (!req.user!.isAnonymous) {
      return res.status(400).json({ error: 'User is already registered' });
    }

    // Check if email is already taken
    const existingUser = await storage.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update user to registered
    const updatedUser = await storage.updateUser(req.user!.id, {
      email,
      password: hashedPassword,
      isAnonymous: false,
      updatedAt: new Date(),
    });

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Generate new token
    const token = generateToken(updatedUser);

    res.json({
      message: 'Account converted successfully',
      token,
      user: {
        id: updatedUser.id,
        uuid: updatedUser.uuid,
        email: updatedUser.email,
        displayName: updatedUser.displayName,
        isAnonymous: updatedUser.isAnonymous,
        updatedAt: updatedUser.updatedAt,
      },
    });
  } catch (error) {
    console.error('Account conversion error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Verify token endpoint
router.get('/verify', authenticateToken, (req: AuthenticatedRequest, res) => {
  res.json({
    valid: true,
    user: req.user,
  });
});

export default router;