import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    console.log('📊 Fetching dashboard statistics...');

    // Get counts for all major entities
    const [
      totalClients,
      totalProducts,
      totalPurchases,
      totalPharmacies,
      totalCategories,
      totalSubscriptions,
      totalPages,
      totalPacks,
      activeSubscriptions
    ] = await Promise.all([
      prisma.client.count(),
      prisma.product.count(),
      prisma.purchase.count(),
      prisma.pharmacyBusinessInformation.count(),
      prisma.category.count(),
      prisma.subscription.count(),
      prisma.page.count(),
      prisma.packAbonnement.count(),
      prisma.subscription.count({
        where: { status: 'active' }
      })
    ]);

    // Get revenue statistics
    const revenueStats = await prisma.purchase.aggregate({
      _sum: { total: true },
      _avg: { total: true },
      _count: { id: true }
    });

    // Get recent activities (last 10 activities across different entities)
    const recentPurchases = await prisma.purchase.findMany({
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
        product: {
          select: {
            name: true,
            price: true
          }
        }
      }
    });

    const recentSubscriptions = await prisma.subscription.findMany({
      orderBy: { createdAt: 'desc' },
      take: 3,
      include: {
        client: {
          select: {
            firstname: true,
            lastname: true
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

    const recentClients = await prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
      take: 2,
      select: {
        firstname: true,
        lastname: true,
        email: true,
        createdAt: true
      }
    });

    // Combine recent activities
    const recentActivities = [
      ...recentPurchases.map(purchase => ({
        type: 'purchase' as const,
        description: `New purchase from ${purchase.client.firstname} ${purchase.client.lastname}`,
        time: purchase.createdAt,
        amount: `$${purchase.total}`,
        details: `Product: ${purchase.product.name}`
      })),
      ...recentSubscriptions.map(subscription => ({
        type: 'subscription' as const,
        description: `New subscription for ${subscription.client.firstname} ${subscription.client.lastname}`,
        time: subscription.createdAt,
        amount: `$${subscription.pack.price}`,
        details: `Pack: ${subscription.pack.name}`
      })),
      ...recentClients.map(client => ({
        type: 'client' as const,
        description: `New client registration: ${client.firstname} ${client.lastname}`,
        time: client.createdAt,
        amount: '',
        details: `Email: ${client.email}`
      }))
    ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
     .slice(0, 8);

    // Get category distribution
    const categoryDistribution = await prisma.category.findMany({
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    // Get subscription plan distribution
    const subscriptionByPack = await prisma.subscription.groupBy({
      by: ['packId'],
      _count: {
        id: true
      }
    });

    const subscriptionPlans = await Promise.all(
      subscriptionByPack.map(async (item) => {
        const pack = await prisma.packAbonnement.findUnique({
          where: { id: item.packId },
          select: {
            name: true,
            price: true
          }
        });

        return {
          plan: pack?.name || 'Unknown',
          count: item._count.id,
          revenue: item._count.id * (pack?.price || 0),
          color: getColorByIndex(subscriptionByPack.indexOf(item))
        };
      })
    );

    // Monthly revenue data (last 6 months)
    const monthlyRevenue = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('month', "createdAt") as month,
        SUM(total) as revenue,
        COUNT(*) as orders
      FROM "Purchase"
      WHERE "createdAt" >= CURRENT_DATE - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', "createdAt")
      ORDER BY month ASC
    `;

    const stats = {
      totalUsers: totalClients,
      totalProducts,
      totalOrders: totalPurchases,
      totalPharmacies,
      revenue: revenueStats._sum.total || 0,
      growth: 12.5, // This would typically be calculated from previous period
      totalCategories,
      totalSubscriptions,
      totalPages,
      totalBusinesses: totalPharmacies,
      activeSubscriptions,
      averageOrderValue: revenueStats._avg.total || 0,
      totalPacks
    };

    console.log('✅ Dashboard statistics fetched successfully');

    res.json({
      success: true,
      data: {
        stats,
        recentActivities,
        categoryDistribution: categoryDistribution.map(cat => ({
          name: cat.name,
          count: cat._count.products,
          color: getColorByIndex(categoryDistribution.indexOf(cat))
        })),
        subscriptionStatus: subscriptionPlans,
        monthlyRevenue
      }
    });
  } catch (error) {
    console.error('❌ Error fetching dashboard statistics:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getDashboardCharts = async (req: Request, res: Response) => {
  try {
    const { period = '6 months' } = req.query;

    console.log('📈 Fetching dashboard charts data...');

    // Revenue trend for the selected period
    const revenueTrend = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('month', "createdAt") as month,
        SUM(total) as revenue,
        COUNT(*) as orders
      FROM "Purchase"
      WHERE "createdAt" >= CURRENT_DATE - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', "createdAt")
      ORDER BY month ASC
    `;

    // Top products by revenue
    const topProducts = await prisma.purchase.groupBy({
      by: ['productId'],
      _sum: {
        total: true,
        quantity: true
      },
      _count: {
        id: true
      },
      orderBy: {
        _sum: {
          total: 'desc'
        }
      },
      take: 10
    });

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
          name: productDetails?.name || 'Unknown Product',
          revenue: product._sum.total || 0,
          orders: product._count.id,
          quantity: product._sum.quantity || 0,
          category: productDetails?.category?.name || 'Unknown'
        };
      })
    );

    // Client acquisition trend
    const clientAcquisition = await prisma.$queryRaw`
      SELECT 
        DATE_TRUNC('month', "createdAt") as month,
        COUNT(*) as new_clients
      FROM "Client"
      WHERE "createdAt" >= CURRENT_DATE - INTERVAL '6 months'
      GROUP BY DATE_TRUNC('month', "createdAt")
      ORDER BY month ASC
    `;

    console.log('✅ Dashboard charts data fetched successfully');

    res.json({
      success: true,
      data: {
        revenueTrend,
        topProducts: topProductsWithDetails,
        clientAcquisition
      }
    });
  } catch (error) {
    console.error('❌ Error fetching dashboard charts:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getSystemHealth = async (req: Request, res: Response) => {
  try {
    console.log('🔍 Checking system health...');

    // Test database connection
    const dbStatus = await prisma.$queryRaw`SELECT 1 as status`;
    
    // Get system metrics
    const [totalClients, totalProducts, dbSize] = await Promise.all([
      prisma.client.count(),
      prisma.product.count(),
      prisma.$queryRaw`SELECT pg_database_size(current_database()) as size`
    ]);

    const healthStatus = {
      database: dbStatus ? 'healthy' : 'unhealthy',
      api: 'healthy',
      memory: 'healthy',
      uptime: process.uptime(),
      totalClients,
      totalProducts,
      dbSize: (dbSize as any)[0]?.size || 0
    };

    console.log('✅ System health check completed');

    res.json({
      success: true,
      data: healthStatus
    });
  } catch (error) {
    console.error('❌ Error checking system health:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

// Helper function to generate consistent colors
function getColorByIndex(index: number): string {
  const colors = [
    '#3B82F6', '#EF4444', '#10B981', '#F59E0B', 
    '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
  ];
  return colors[index % colors.length];
}