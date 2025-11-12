import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../lib/prisma';

export const register = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password, phone, address, role } = req.body;

    console.log('📝 Registration attempt for:', email);

    // Validate required fields
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields: firstname, lastname, email, password' 
      });
    }

    // Check if user exists
    const existingClient = await prisma.client.findUnique({
      where: { email }
    });

    if (existingClient) {
      return res.status(400).json({ 
        success: false,
        error: 'Email already registered' 
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create client
    const client = await prisma.client.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashedPassword,
        phone: phone || null,
        address: address || null,
        role: role || 'NORMALCLIENT'
      },
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

    // Generate token
    const token = jwt.sign(
      { userId: client.id, role: client.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    console.log('✅ User registered successfully:', email);

    res.status(201).json({
      success: true,
      message: 'Registration successful',
      client,
      token
    });
  } catch (error) {
    console.error('❌ Registration error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    console.log('🔐 Login attempt for:', email);

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
      return res.status(400).json({ 
        success: false,
        error: 'Invalid email or password' 
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, client.password);
    if (!isValidPassword) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid email or password' 
      });
    }

    // Generate token
    const token = jwt.sign(
      { userId: client.id, role: client.role },
      process.env.JWT_SECRET!,
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
  } catch (error) {
    console.error('❌ Login error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error' 
    });
  }
};