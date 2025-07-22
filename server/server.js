import dotenv from 'dotenv';
dotenv.config(); // Load env vars

import express from 'express';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import { serve } from 'inngest/express';
import connectDB from './configs/db.js';
import * as inngestModule from './inngest/index.js';
import userRoutes from './routes/userRoutes.js'; // ✅ Added this line

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

// Health Check
app.get('/', (req, res) => res.send('✅ API Running'));

// ✅ Mount the /api/user route
app.use('/api/user', userRoutes);

// Inngest webhook endpoint
app.use(
  '/api/inngest',
  serve({
    client: inngestModule.inngest,
    functions: inngestModule.functions,
  })
);

// Catch-all 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint not found" });
});

// Start the server
app.listen(PORT, () =>
  console.log(`🚀 Server running at http://localhost:${PORT}`)
);
