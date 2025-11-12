const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

console.log('🚀 STARTING GUARANTEED SERVER...');

// Health check - ALWAYS WORKS
app.get('/api/health', (req, res) => {
  console.log('✅ Health check called');
  res.json({ 
    success: true, 
    message: 'Guaranteed server is running!',
    timestamp: new Date().toISOString()
  });
});

// Register route - ALWAYS WORKS
app.post('/api/auth/register', (req, res) => {
  console.log('📝 REGISTRATION RECEIVED:', req.body);
  
  // Simulate successful registration
  res.json({
    success: true,
    message: 'User registered successfully via guaranteed server!',
    client: {
      id: 'user-' + Date.now(),
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone || '0612345678',
      role: 'NORMALCLIENT'
    },
    token: 'jwt-token-' + Date.now()
  });
});

app.listen(PORT, () => {
  console.log('='.repeat(60));
  console.log('🚀 GUARANTEED SERVER STARTED!');
  console.log('='.repeat(60));
  console.log(`📍 Port: ${PORT}`);
  console.log(`🔗 Health: http://localhost:${PORT}/api/health`);
  console.log(`🔗 Register: POST http://localhost:${PORT}/api/auth/register`);
  console.log('='.repeat(60));
});