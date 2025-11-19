import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export interface CreateSubscriptionData {
  clientId: string;
  packId: string;
  startDate: string;
  endDate: string;
  status?: string;
}

export interface UpdateSubscriptionData {
  packId?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}

export const getSubscriptions = async (req: Request, res: Response) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      clientId = '',
      packId = '',
      status = '',
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

    if (packId) {
      where.packId = packId;
    }

    if (status) {
      where.status = status;
    }

    const [subscriptions, total] = await Promise.all([
      prisma.subscription.findMany({
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
          pack: {
            select: {
              id: true,
              name: true,
              price: true,
              durationMonths: true
            }
          }
        }
      }),
      prisma.subscription.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        subscriptions,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        }
      }
    });
  } catch (error) {
    console.error('❌ Error fetching subscriptions:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const subscription = await prisma.subscription.findUnique({
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
        pack: {
          include: {
            dashboards: {
              include: {
                _count: {
                  select: {
                    products: true,
                    pages: true
                  }
                }
              }
            }
          }
        }
      }
    });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        error: 'Subscription not found'
      });
    }

    res.json({
      success: true,
      data: subscription
    });
  } catch (error) {
    console.error('❌ Error fetching subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const createSubscription = async (req: Request, res: Response) => {
  try {
    const { clientId, packId, startDate, endDate, status }: CreateSubscriptionData = req.body;

    console.log('📝 Creating new subscription:', { clientId, packId });

    // Validate required fields
    if (!clientId || !packId || !startDate || !endDate) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: clientId, packId, startDate, endDate'
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

    // Check if pack exists
    const pack = await prisma.packAbonnement.findUnique({
      where: { id: packId }
    });

    if (!pack) {
      return res.status(404).json({
        success: false,
        error: 'Pack not found'
      });
    }

    // Create subscription
    const subscription = await prisma.subscription.create({
      data: {
        clientId,
        packId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: status || 'active'
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
        pack: {
          select: {
            id: true,
            name: true,
            price: true,
            durationMonths: true
          }
        }
      }
    });

    console.log('✅ Subscription created successfully:', subscription.id);

    res.status(201).json({
      success: true,
      message: 'Subscription created successfully',
      data: subscription
    });
  } catch (error) {
    console.error('❌ Error creating subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const updateSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: UpdateSubscriptionData = req.body;

    console.log('📝 Updating subscription:', id, updateData);

    // Check if subscription exists
    const existingSubscription = await prisma.subscription.findUnique({
      where: { id }
    });

    if (!existingSubscription) {
      return res.status(404).json({
        success: false,
        error: 'Subscription not found'
      });
    }

    // Check if pack exists if packId is being updated
    if (updateData.packId && updateData.packId !== existingSubscription.packId) {
      const pack = await prisma.packAbonnement.findUnique({
        where: { id: updateData.packId }
      });

      if (!pack) {
        return res.status(404).json({
          success: false,
          error: 'Pack not found'
        });
      }
    }

    // Prepare update data
    const data: any = { ...updateData };
    if (updateData.startDate) data.startDate = new Date(updateData.startDate);
    if (updateData.endDate) data.endDate = new Date(updateData.endDate);

    // Update subscription
    const subscription = await prisma.subscription.update({
      where: { id },
      data,
      include: {
        client: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true
          }
        },
        pack: {
          select: {
            id: true,
            name: true,
            price: true
          }
        }
      }
    });

    console.log('✅ Subscription updated successfully:', id);

    res.json({
      success: true,
      message: 'Subscription updated successfully',
      data: subscription
    });
  } catch (error) {
    console.error('❌ Error updating subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const deleteSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    console.log('🗑️ Deleting subscription:', id);

    // Check if subscription exists
    const existingSubscription = await prisma.subscription.findUnique({
      where: { id }
    });

    if (!existingSubscription) {
      return res.status(404).json({
        success: false,
        error: 'Subscription not found'
      });
    }

    // Delete subscription
    await prisma.subscription.delete({
      where: { id }
    });

    console.log('✅ Subscription deleted successfully:', id);

    res.json({
      success: true,
      message: 'Subscription deleted successfully'
    });
  } catch (error) {
    console.error('❌ Error deleting subscription:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getClientSubscriptions = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;

    const subscriptions = await prisma.subscription.findMany({
      where: { clientId },
      include: {
        pack: {
          select: {
            id: true,
            name: true,
            price: true,
            durationMonths: true,
            description: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json({
      success: true,
      data: subscriptions
    });
  } catch (error) {
    console.error('❌ Error fetching client subscriptions:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getSubscriptionStats = async (req: Request, res: Response) => {
  try {
    const totalSubscriptions = await prisma.subscription.count();
    const activeSubscriptions = await prisma.subscription.count({
      where: { status: 'active' }
    });
    const expiredSubscriptions = await prisma.subscription.count({
      where: { 
        endDate: { lt: new Date() },
        status: 'active'
      }
    });

    const subscriptionsByPack = await prisma.subscription.groupBy({
      by: ['packId'],
      _count: {
        id: true
      }
    });

    // Get pack details for subscriptions by pack
    const subscriptionsByPackWithDetails = await Promise.all(
      subscriptionsByPack.map(async (item) => {
        const pack = await prisma.packAbonnement.findUnique({
          where: { id: item.packId },
          select: {
            name: true,
            price: true
          }
        });

        return {
          packId: item.packId,
          packName: pack?.name,
          packPrice: pack?.price,
          subscriptionCount: item._count.id
        };
      })
    );

    const recentSubscriptions = await prisma.subscription.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        client: {
          select: {
            firstname: true,
            lastname: true,
            email: true
          }
        },
        pack: {
          select: {
            name: true,
            price: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: {
        totalSubscriptions,
        activeSubscriptions,
        expiredSubscriptions,
        subscriptionsByPack: subscriptionsByPackWithDetails,
        recentSubscriptions
      }
    });
  } catch (error) {
    console.error('❌ Error fetching subscription stats:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};