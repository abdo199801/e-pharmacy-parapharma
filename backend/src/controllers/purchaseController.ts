import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export interface CreatePurchaseData {
  clientId: string;
  productId: string;
  quantity: number;
  total: number;
}

export interface UpdatePurchaseData {
  quantity?: number;
  total?: number;
}

export const getPurchases = async (req: Request, res: Response) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      clientId = '',
      startDate = '',
      endDate = '',
      sortBy = 'createdAt',
      sortOrder = 'desc'
    } = req.query;

    const pageNum = Number(page);
    const limitNum = Number(limit);
    const skip = (pageNum - 1) * limitNum;

    // Build where clause
    const where: any = {};

    if (clientId) {
      where.clientId = clientId;
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) where.createdAt.gte = new Date(startDate as string);
      if (endDate) where.createdAt.lte = new Date(endDate as string);
    }

    const [purchases, total] = await Promise.all([
      prisma.purchase.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: {
          [sortBy as string]: sortOrder
        },
        include: {
          client: {
            select: {
              id: true,
              firstname: true,
              lastname: true,
              email: true
            }
          },
          product: {
            select: {
              id: true,
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
      }),
      prisma.purchase.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        purchases,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        }
      }
    });
  } catch (error) {
    console.error('❌ Error fetching purchases:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getPurchase = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const purchase = await prisma.purchase.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            phone: true
          }
        },
        product: {
          include: {
            category: true,
            dashboard: {
              include: {
                pack: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!purchase) {
      return res.status(404).json({
        success: false,
        error: 'Purchase not found'
      });
    }

    res.json({
      success: true,
      data: purchase
    });
  } catch (error) {
    console.error('❌ Error fetching purchase:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const createPurchase = async (req: Request, res: Response) => {
  try {
    const { clientId, productId, quantity, total }: CreatePurchaseData = req.body;

    console.log('📝 Creating new purchase:', { clientId, productId });

    // Validate required fields
    if (!clientId || !productId || !quantity || !total) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: clientId, productId, quantity, total'
      });
    }

    // Check if client exists
    const client = await prisma.client.findUnique({
      where: { id: clientId }
    });

    if (!client) {
      return res.status(404).json({
        success: false,
        error: 'Client not found'
      });
    }

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found'
      });
    }

    // Create purchase
    const purchase = await prisma.purchase.create({
      data: {
        clientId,
        productId,
        quantity: parseInt(quantity as any),
        total: parseFloat(total as any)
      },
      include: {
        client: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true
          }
        },
        product: {
          select: {
            id: true,
            name: true,
            price: true
          }
        }
      }
    });

    console.log('✅ Purchase created successfully:', purchase.id);

    res.status(201).json({
      success: true,
      message: 'Purchase created successfully',
      data: purchase
    });
  } catch (error) {
    console.error('❌ Error creating purchase:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const updatePurchase = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: UpdatePurchaseData = req.body;

    console.log('📝 Updating purchase:', id, updateData);

    // Check if purchase exists
    const existingPurchase = await prisma.purchase.findUnique({
      where: { id }
    });

    if (!existingPurchase) {
      return res.status(404).json({
        success: false,
        error: 'Purchase not found'
      });
    }

    // Update purchase
    const purchase = await prisma.purchase.update({
      where: { id },
      data: updateData,
      include: {
        client: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true
          }
        },
        product: {
          select: {
            id: true,
            name: true,
            price: true
          }
        }
      }
    });

    console.log('✅ Purchase updated successfully:', id);

    res.json({
      success: true,
      message: 'Purchase updated successfully',
      data: purchase
    });
  } catch (error) {
    console.error('❌ Error updating purchase:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const deletePurchase = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    console.log('🗑️ Deleting purchase:', id);

    // Check if purchase exists
    const existingPurchase = await prisma.purchase.findUnique({
      where: { id }
    });

    if (!existingPurchase) {
      return res.status(404).json({
        success: false,
        error: 'Purchase not found'
      });
    }

    // Delete purchase
    await prisma.purchase.delete({
      where: { id }
    });

    console.log('✅ Purchase deleted successfully:', id);

    res.json({
      success: true,
      message: 'Purchase deleted successfully'
    });
  } catch (error) {
    console.error('❌ Error deleting purchase:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getPurchaseStats = async (req: Request, res: Response) => {
  try {
    const totalPurchases = await prisma.purchase.count();
    const totalRevenue = await prisma.purchase.aggregate({
      _sum: { total: true }
    });
    const averagePurchase = await prisma.purchase.aggregate({
      _avg: { total: true }
    });
    const totalItemsSold = await prisma.purchase.aggregate({
      _sum: { quantity: true }
    });

    // Monthly revenue for current year
    const monthlyRevenue = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('month', "createdAt") as month,
        SUM(total) as revenue,
        COUNT(*) as orders
      FROM "Purchase"
      WHERE EXTRACT(YEAR FROM "createdAt") = EXTRACT(YEAR FROM NOW())
      GROUP BY DATE_TRUNC('month', "createdAt")
      ORDER BY month ASC
    `;

    // Top products by revenue
    const topProducts = await prisma.purchase.groupBy({
      by: ['productId'],
      _sum: {
        quantity: true,
        total: true
      },
      _count: {
        id: true
      },
      orderBy: {
        _sum: {
          total: 'desc'
        }
      },
      take: 5
    });

    // Get product details for top products
    const topProductsWithDetails = await Promise.all(
      topProducts.map(async (product) => {
        const productDetails = await prisma.product.findUnique({
          where: { id: product.productId },
          select: {
            name: true,
            price: true,
            category: {
              select: {
                name: true
              }
            }
          }
        });

        return {
          ...product,
          product: productDetails
        };
      })
    );

    res.json({
      success: true,
      data: {
        totalPurchases,
        totalRevenue: totalRevenue._sum.total || 0,
        averagePurchase: averagePurchase._avg.total || 0,
        totalItemsSold: totalItemsSold._sum.quantity || 0,
        monthlyRevenue,
        topProducts: topProductsWithDetails
      }
    });
  } catch (error) {
    console.error('❌ Error fetching purchase stats:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};