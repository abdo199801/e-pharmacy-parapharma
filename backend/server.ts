import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

// Import routes
import authRoutes from './app/src/routes/auth';
import clientRoutes from './app/src/routes/clients';
import dashboardRoutes from './app/src/routes/dashboards';
import categoryRoutes from './app/src/routes/categories';
import productRoutes from './app/src/routes/products';
import purchaseRoutes from './app/src/routes/purchases';
import subscriptionRoutes from './app/src/routes/subscriptions';
import packRoutes from './app/src/routes/packs';
import pageRoutes from './app/src/routes/pages';
import pharmacyRoutes from './app/src/routes/pharmacy';
import testRoutes from './app/src/routes/test';

// Import middleware
import { errorHandler } from './app/src/middleware/errorHandler';
import { logger } from './app/src/middleware/logger';
import { rateLimiter } from './app/src/middleware/rateLimit';
import { securityMiddleware } from './app/src/middleware/security';

const app = express();

const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === 'production'; 

// --- Configuration CORS Sécurisée et Flexible ---
const devAllowedOrigins = [
  'http://172.24.224.1:3000', 
  'http://localhost:3000',
  `http://localhost:${PORT}`,
  process.env.CORS_ORIGIN || '' 
].filter(Boolean);

const finalOrigin = isProduction 
    ? process.env.CORS_PRODUCTION_URL 
    : devAllowedOrigins;

// Security middleware
app.use(securityMiddleware);

// CORS middleware
app.use(cors({
  origin: finalOrigin,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
app.use(logger);

// Rate limiting (applied to all routes)
app.use(rateLimiter);

// Health check (no rate limiting)
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true,
    message: 'Server is running', 
    environment: isProduction ? 'production' : 'development',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true,
    message: 'Test route working!',
    data: {
      server: 'Express.js',
      status: 'OK',
      time: new Date().toISOString()
    }
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/products', productRoutes);
app.use('/api/purchases', purchaseRoutes);
app.use('/api/subscriptions', subscriptionRoutes);
app.use('/api/packs', packRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/pharmacy', pharmacyRoutes);
app.use('/api/test', testRoutes);

// 404 Handler for undefined routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Global error handler (must be last)
app.use(errorHandler);

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('\n🛑 Server shutting down gracefully...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Server shutting down gracefully...');
  process.exit(0);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode.`);
  console.log(`🔗 Health: http://localhost:${PORT}/api/health`);
  console.log(`🔗 Test: http://localhost:${PORT}/api/test`);
  console.log(`📊 API Routes:`);
  console.log(`   - Auth: /api/auth`);
  console.log(`   - Clients: /api/clients`);
  console.log(`   - Dashboard: /api/dashboard`);
  console.log(`   - Products: /api/products`);
  console.log(`   - Categories: /api/categories`);
  console.log(`   - Purchases: /api/purchases`);
  console.log(`   - Subscriptions: /api/subscriptions`);
  console.log(`   - Packs: /api/packs`);
  console.log(`   - Pages: /api/pages`);
  console.log(`   - Pharmacy: /api/pharmacy`);
});