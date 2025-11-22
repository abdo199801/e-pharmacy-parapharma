import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import routes
import authRoutes from './routes/auth';
// Import other routes as needed...

const app = express();

// **FIXED CORS CONFIGURATION**
app.use(
  cors({
    origin: [
      'http://localhost:3000', 
      'http://localhost:3001', 
      'http://172.24.224.1:3000',
      'http://172.17.112.1:3000',
      'http://172.31.224.1:3000', // ← ADD THIS LINE
      'http://127.0.0.1:3000'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
  })
);

// Or use this more permissive CORS for development:
// app.use(cors({
//   origin: true, // Allow all origins in development
//   credentials: true
// }));

// Body parsers
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Simple request logger
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
// Add other routes...

// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server is running perfectly!',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    cors: 'Enabled'
  });
});

// Test endpoint with CORS headers
app.get('/api/test-cors', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'CORS test successful!',
    origin: req.headers.origin,
    cors: 'Working'
  });
});

// Global error handler
app.use((err: any, req: Request, res: Response, next: Function) => {
  console.error('🔥 Server Error:', err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3001;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Frontend URL: http://172.31.224.1:3000`);
  console.log(`🔗 Health: http://localhost:${PORT}/api/health`);
  console.log(`🔗 CORS Test: http://localhost:${PORT}/api/test-cors`);
  console.log(`🔐 Auth: http://localhost:${PORT}/api/auth`);
});