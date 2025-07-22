import express from 'express';
import User from '../models/User.js';
import { requireAuth } from '@clerk/express';

const router = express.Router();

// Protected route — only accessible if logged in via Clerk
router.get('/', requireAuth(), async (req, res) => {
  try {
    const userId = req.auth.userId;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found in DB' });
    }

    res.json(user);
  } catch (error) {
    console.error('❌ Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
