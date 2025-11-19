// src/admin/controllers/adminTestController.ts
import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const testDatabaseConnection = async (req: Request, res: Response) => {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test raw SQL query to see if table exists
    const tableExists = await prisma.$queryRaw`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'clients'
      );
    `;
    
    console.log('📊 Table exists result:', tableExists);
    
    // Count clients
    const clientCount = await prisma.client.count();
    console.log('👥 Total clients in database:', clientCount);
    
    // Get all table names
    const allTables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;
    
    res.json({
      success: true,
      data: {
        tableExists,
        clientCount,
        allTables,
        connection: 'Database connection successful'
      }
    });
  } catch (error) {
    console.error('❌ Database connection test failed:', error);
    res.status(500).json({
      success: false,
      error: 'Database connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};