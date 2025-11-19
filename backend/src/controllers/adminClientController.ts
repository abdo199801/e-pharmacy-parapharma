import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import bcrypt from 'bcryptjs';

export interface CreateClientData {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  role?: 'NORMALCLIENT' | 'ADMINISTRATORCLIENT';
}

export interface UpdateClientData {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  address?: string;
  role?: 'NORMALCLIENT' | 'ADMINISTRATORCLIENT';
  status?: 'ACTIVE' | 'INACTIVE';
}

export const getClients = async (req: Request, res: Response) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '',
      role = '',
      status = '',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {};

    if (search) {
      where.OR = [
        { firstname: { contains: search, mode: 'insensitive' } },
        { lastname: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (role) {
      where.role = role;
    }

    if (status) {
      where.status = status;
    }

    const [clients, total] = await Promise.all([
      prisma.client.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: {
          [sortBy as string]: sortOrder
        },
        select: {
          id: true,
          firstname: true,
          lastname: true,
          email: true,
          phone: true,
          address: true,
          role: true,
          status: true,
          createdAt: true,
          updatedAt: true,
          pharmacyInfo: {
            select: {
              pharmacyName: true,
              licenseNumber: true
            }
          },
          _count: {
            select: {
              purchases: true,
              subscriptions: true
            }
          }
        }
      }),
      prisma.client.count({ where })
    ]);

    // Calculate total spent for each client
    const clientsWithStats = await Promise.all(
      clients.map(async (client) => {
        const purchaseStats = await prisma.purchase.aggregate({
          where: { clientId: client.id },
          _sum: { total: true },
          _count: { id: true }
        });

        const activeSubscription = await prisma.subscription.findFirst({
          where: { 
            clientId: client.id,
            status: 'active'
          },
          include: {
            pack: {
              select: {
                name: true,
                price: true
              }
            }
          }
        });

        return {
          ...client,
          totalOrders: purchaseStats._count.id,
          totalSpent: purchaseStats._sum.total || 0,
          hasPharmacy: !!client.pharmacyInfo,
          activeSubscription: activeSubscription ? {
            packName: activeSubscription.pack.name,
            price: activeSubscription.pack.price,
            endDate: activeSubscription.endDate
          } : null
        };
      })
    );

    res.json({
      success: true,
      data: {
        clients: clientsWithStats,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        }
      }
    });
  } catch (error) {
    console.error('❌ Error fetching clients:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const client = await prisma.client.findUnique({
      where: { id },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        phone: true,
        address: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
        pharmacyInfo: {
          select: {
            pharmacyName: true,
            address: true,
            city: true,
            country: true,
            licenseNumber: true,
            phone: true,
            website: true
          }
        },
        purchases: {
          orderBy: {
            createdAt: 'desc'
          },
          include: {
            product: {
              select: {
                name: true,
                price: true,
                category: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        },
        subscriptions: {
          orderBy: { createdAt: 'desc' },
          include: {
            pack: {
              select: {
                name: true,
                price: true,
                durationMonths: true
              }
            }
          }
        }
      }
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        error: 'Client not found'
      });
    }

    // Calculate client statistics
    const purchaseStats = await prisma.purchase.aggregate({
      where: { clientId: id },
      _sum: { total: true, quantity: true },
      _count: { id: true },
      _avg: { total: true }
    });

    const subscriptionStats = await prisma.subscription.aggregate({
      where: { clientId: id },
      _count: { id: true }
    });

    // Get recent activity (purchases)
    const recentActivity = await prisma.purchase.findMany({
      where: { clientId: id },
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        total: true,
        quantity: true,
        createdAt: true,
        product: {
          select: {
            name: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: {
        ...client,
        stats: {
          totalOrders: purchaseStats._count.id,
          totalSpent: purchaseStats._sum.total || 0,
          totalItems: purchaseStats._sum.quantity || 0,
          averageOrder: purchaseStats._avg.total || 0,
          totalSubscriptions: subscriptionStats._count.id,
          activeSubscriptions: client.subscriptions.filter(s => s.status === 'active').length,
          hasPharmacy: !!client.pharmacyInfo,
          lastOrder: client.purchases[0]?.createdAt || null
        },
        recentActivity
      }
    });
  } catch (error) {
    console.error('❌ Error fetching client:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const { firstname, lastname, email, password, phone, address, role }: CreateClientData = req.body;

    console.log('📝 Creating new client:', { email });

    // Validate required fields
    if (!firstname || !lastname || !email || !password) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: firstname, lastname, email, password'
      });
    }

    // Check if client already exists
    const existingClient = await prisma.client.findUnique({
      where: { email }
    });

    if (existingClient) {
      return res.status(400).json({
        success: false,
        error: 'Client with this email already exists'
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
        role: role || 'NORMALCLIENT',
        status: 'ACTIVE'
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        phone: true,
        address: true,
        role: true,
        status: true,
        createdAt: true
      }
    });

    console.log('✅ Client created successfully:', client.id);

    res.status(201).json({
      success: true,
      message: 'Client created successfully',
      data: client
    });
  } catch (error) {
    console.error('❌ Error creating client:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: UpdateClientData = req.body;

    console.log('📝 Updating client:', id, updateData);

    // Check if client exists
    const existingClient = await prisma.client.findUnique({
      where: { id }
    });

    if (!existingClient) {
      return res.status(404).json({
        success: false,
        error: 'Client not found'
      });
    }

    // Check for duplicate email if email is being updated
    if (updateData.email && updateData.email !== existingClient.email) {
      const duplicateClient = await prisma.client.findUnique({
        where: { email: updateData.email }
      });

      if (duplicateClient) {
        return res.status(400).json({
          success: false,
          error: 'Client with this email already exists'
        });
      }
    }

    // Update client
    const client = await prisma.client.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        phone: true,
        address: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true
      }
    });

    console.log('✅ Client updated successfully:', id);

    res.json({
      success: true,
      message: 'Client updated successfully',
      data: client
    });
  } catch (error) {
    console.error('❌ Error updating client:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    console.log('🗑️ Deleting client:', id);

    // Check if client exists
    const existingClient = await prisma.client.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            purchases: true,
            subscriptions: true
          }
        },
        pharmacyInfo: true
      }
    });

    if (!existingClient) {
      return res.status(404).json({
        success: false,
        error: 'Client not found'
      });
    }

    // Check if client has purchases or subscriptions
    if (existingClient._count.purchases > 0 || existingClient._count.subscriptions > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete client with purchase or subscription history'
      });
    }

    // Delete related pharmacy info if exists
    if (existingClient.pharmacyInfo) {
      await prisma.pharmacyBusinessInformation.delete({
        where: { clientId: id }
      });
    }

    // Delete client
    await prisma.client.delete({
      where: { id }
    });

    console.log('✅ Client deleted successfully:', id);

    res.json({
      success: true,
      message: 'Client deleted successfully'
    });
  } catch (error) {
    console.error('❌ Error deleting client:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const updateClientStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    if (!['ACTIVE', 'INACTIVE'].includes(status)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid status. Must be ACTIVE or INACTIVE'
      });
    }

    console.log('📝 Updating client status:', id, status);

    // Check if client exists
    const existingClient = await prisma.client.findUnique({
      where: { id }
    });

    if (!existingClient) {
      return res.status(404).json({
        success: false,
        error: 'Client not found'
      });
    }

    // Update client status
    const client = await prisma.client.update({
      where: { id },
      data: { status },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        status: true,
        updatedAt: true
      }
    });

    console.log('✅ Client status updated successfully:', id);

    res.json({
      success: true,
      message: `Client ${status === 'ACTIVE' ? 'activated' : 'deactivated'} successfully`,
      data: client
    });
  } catch (error) {
    console.error('❌ Error updating client status:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getClientStats = async (req: Request, res: Response) => {
  try {
    const totalClients = await prisma.client.count();
    const totalAdmins = await prisma.client.count({
      where: { role: 'ADMINISTRATORCLIENT' }
    });
    const clientsWithPharmacy = await prisma.client.count({
      where: { pharmacyInfo: { isNot: null } }
    });

    const totalRevenue = await prisma.purchase.aggregate({
      _sum: { total: true }
    });

    const recentClients = await prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
        createdAt: true,
        _count: {
          select: {
            purchases: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: {
        totalClients,
        totalAdmins,
        clientsWithPharmacy,
        totalRevenue: totalRevenue._sum.total || 0,
        recentClients
      }
    });
  } catch (error) {
    console.error('❌ Error fetching client stats:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};