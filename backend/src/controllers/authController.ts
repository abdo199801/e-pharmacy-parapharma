import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

// Simple test function to check database connection
const testDatabase = async () => {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
    return true;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    return false;
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    console.log('=== REGISTRATION START ===');
    const { firstname, lastname, email, password, phone, address, role } = req.body;

    console.log('📝 Registration data received:', { email, firstname, lastname, phone, role });

    // Test database connection first
    const dbConnected = await testDatabase();
    if (!dbConnected) {
      return res.status(500).json({
        success: false,
        error: 'Database connection failed'
      });
    }

    // Check if JWT secret exists
    if (!process.env.JWT_SECRET) {
      console.error('❌ JWT_SECRET is missing!');
      return res.status(500).json({
        success: false,
        error: 'Server configuration error: JWT_SECRET not set'
      });
    }

    // Validate required fields
    if (!firstname || !lastname || !email || !password) {
      console.log('❌ Missing required fields');
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields: firstname, lastname, email, password' 
      });
    }

    console.log('🔍 Checking if user exists...');

    // Check if user exists
    const existingClient = await prisma.client.findUnique({
      where: { email }
    });

    if (existingClient) {
      console.log('❌ Email already exists:', email);
      return res.status(400).json({ 
        success: false,
        error: 'Email already registered' 
      });
    }

    console.log('🔐 Hashing password...');

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    console.log('👤 Creating client in database...');

    // Create client - using only fields that definitely exist
    const clientData: any = {
      firstname,
      lastname,
      email,
      password: hashedPassword,
      role: role || 'NORMALCLIENT',
    };

    // Only add optional fields if they exist
    if (phone) clientData.phone = phone;
    if (address) clientData.address = address;

    const client = await prisma.client.create({
      data: clientData,
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true
      }
    });

    console.log('✅ Client created successfully:', client.id);

    console.log('🎫 Generating JWT token...');

    // Generate token
    const token = jwt.sign(
      { 
        userId: client.id, 
        role: client.role,
        email: client.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('✅ Registration completed successfully for:', email);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      client,
      token
    });

  } catch (error: any) {
    console.error('❌ REGISTRATION ERROR DETAILS:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error code:', error.code);
    
    // Handle specific Prisma errors
    if (error.code === 'P2002') {
      return res.status(400).json({
        success: false,
        error: 'A user with this email or phone already exists'
      });
    }

    if (error.code === 'P1001') {
      return res.status(500).json({
        success: false,
        error: 'Cannot connect to database. Please check if database is running.'
      });
    }

    res.status(500).json({ 
      success: false,
      error: 'Registration failed: ' + (error.message || 'Unknown error')
    });
  } finally {
    console.log('=== REGISTRATION END ===');
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    console.log('=== LOGIN START ===');
    const { email, password } = req.body;

    console.log('🔐 Login attempt for:', email);

    // Test database connection
    const dbConnected = await testDatabase();
    if (!dbConnected) {
      return res.status(500).json({
        success: false,
        error: 'Database connection failed'
      });
    }

    // Check JWT secret
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        error: 'Server configuration error'
      });
    }

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Email and password are required' 
      });
    }

    // Find client
    const client = await prisma.client.findUnique({
      where: { email }
    });

    if (!client) {
      console.log('❌ Client not found:', email);
      return res.status(400).json({ 
        success: false,
        error: 'Invalid email or password' 
      });
    }

    console.log('🔑 Checking password...');

    // Check password
    const isValidPassword = await bcrypt.compare(password, client.password);
    if (!isValidPassword) {
      console.log('❌ Invalid password for:', email);
      return res.status(400).json({ 
        success: false,
        error: 'Invalid email or password' 
      });
    }

    // Generate token
    const token = jwt.sign(
      { 
        userId: client.id, 
        role: client.role,
        email: client.email 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log('✅ Login successful for:', email);

    res.json({
      success: true,
      message: 'Login successful',
      client: {
        id: client.id,
        firstname: client.firstname,
        lastname: client.lastname,
        email: client.email,
        phone: client.phone,
        role: client.role
      },
      token
    });

  } catch (error: any) {
    console.error('❌ LOGIN ERROR:', error);
    res.status(500).json({ 
      success: false,
      error: 'Login failed: ' + (error.message || 'Unknown error')
    });
  } finally {
    console.log('=== LOGIN END ===');
  }
};