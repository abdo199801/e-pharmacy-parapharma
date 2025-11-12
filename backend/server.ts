import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Load env vars
dotenv.config();

// Import routes
import authRoutes from './app/src/routes/auth';

const app = express();

const PORT = process.env.PORT || 5000;
// Détermine l'environnement : si NODE_ENV n'est pas 'production', c'est du développement
const isProduction = process.env.NODE_ENV === 'production'; 

// --- Configuration CORS Sécurisée et Flexible ---
// Les origines autorisées en DEV (pour localhost, l'IP, et le port du backend)
const devAllowedOrigins = [
  // L'URL utilisée pour accéder au frontend (via IP)
  'http://172.24.224.1:3000', 
  // L'URL standard de développement du frontend
  'http://localhost:3000',
  // L'URL du backend (pour les tests internes)
  `http://localhost:${PORT}`,
  // Support pour variable d'environnement
  process.env.CORS_ORIGIN || '' 
].filter(Boolean);

// Définit l'origine : '*' en dev, ou une liste blanche stricte en production
const finalOrigin = isProduction 
    ? process.env.CORS_PRODUCTION_URL // Assurez-vous que cette variable est définie en production
    : devAllowedOrigins;

// Middleware CORS
app.use(cors({
  // Utilise les origines étendues en dev, et l'URL de production en prod
  origin: finalOrigin,
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// /api/auth inclura maintenant /api/auth/refresh (que nous devons ajouter)
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    success: true,
    message: 'Server is running', 
    environment: isProduction ? 'production' : 'development',
    timestamp: new Date().toISOString() 
  });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ 
    success: true,
    message: 'Test route working!'
  });
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT} in ${isProduction ? 'PRODUCTION' : 'DEVELOPMENT'} mode.`);
  console.log(`🔗 Health: http://localhost:${PORT}/api/health`);
  console.log(`🔗 Auth routes enabled: /api/auth/{login, register, refresh}`);
});