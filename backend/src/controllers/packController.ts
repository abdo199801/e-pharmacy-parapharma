import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export interface CreatePackData {
  name: string;
  description?: string;
  price: number;
  durationMonths: number;
  status?: string;
}

export interface UpdatePackData {
  name?: string;
  description?: string;
  price?: number;
  durationMonths?: number;
  status?: string;
}

export const getPacks = async (req: Request, res: Response) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '',
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
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (status) {
      where.status = status;
    }

    const [packs, total] = await Promise.all([
      prisma.packAbonnement.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: {
          [sortBy as string]: sortOrder
        },
        include: {
          _count: {
            select: {
              dashboards: true,
              subscriptions: true
            }
          }
        }
      }),
      prisma.packAbonnement.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        packs,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        }
      }
    });
  } catch (error) {
    console.error('❌ Error fetching packs:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getPack = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const pack = await prisma.packAbonnement.findUnique({
      where: { id },
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
        },
        subscriptions: {
          include: {
            client: {
              select: {
                id: true,
                firstname: true,
                lastname: true,
                email: true
              }
            }
          }
        },
        _count: {
          select: {
            dashboards: true,
            subscriptions: true
          }
        }
      }
    });

    if (!pack) {
      return res.status(404).json({
        success: false,
        error: 'Pack not found'
      });
    }

    res.json({
      success: true,
      data: pack
    });
  } catch (error) {
    console.error('❌ Error fetching pack:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const createPack = async (req: Request, res: Response) => {
  try {
    const { name, description, price, durationMonths, status }: CreatePackData = req.body;

    console.log('📝 Creating new pack:', { name });

    // Validate required fields
    if (!name || !price || !durationMonths) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: name, price, durationMonths'
      });
    }

    // Create pack
    const pack = await prisma.packAbonnement.create({
      data: {
        name,
        description: description || null,
        price: parseFloat(price as any),
        durationMonths: parseInt(durationMonths as any),
        status: status || 'active'
      },
      include: {
        _count: {
          select: {
            dashboards: true,
            subscriptions: true
          }
        }
      }
    });

    console.log('✅ Pack created successfully:', pack.id);

    res.status(201).json({
      success: true,
      message: 'Pack created successfully',
      data: pack
    });
  } catch (error) {
    console.error('❌ Error creating pack:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const updatePack = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: UpdatePackData = req.body;

    console.log('📝 Updating pack:', id, updateData);

    // Check if pack exists
    const existingPack = await prisma.packAbonnement.findUnique({
      where: { id }
    });

    if (!existingPack) {
      return res.status(404).json({
        success: false,
        error: 'Pack not found'
      });
    }

    // Update pack
    const pack = await prisma.packAbonnement.update({
      where: { id },
      data: updateData,
      include: {
        _count: {
          select: {
            dashboards: true,
            subscriptions: true
          }
        }
      }
    });

    console.log('✅ Pack updated successfully:', id);

    res.json({
      success: true,
      message: 'Pack updated successfully',
      data: pack
    });
  } catch (error) {
    console.error('❌ Error updating pack:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const deletePack = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    console.log('🗑️ Deleting pack:', id);

    // Check if pack exists
    const existingPack = await prisma.packAbonnement.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            dashboards: true,
            subscriptions: true
          }
        }
      }
    });

    if (!existingPack) {
      return res.status(404).json({
        success: false,
        error: 'Pack not found'
      });
    }

    // Check if pack has dashboards or subscriptions
    if (existingPack._count.dashboards > 0 || existingPack._count.subscriptions > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete pack with associated dashboards or subscriptions'
      });
    }

    // Delete pack
    await prisma.packAbonnement.delete({
      where: { id }
    });

    console.log('✅ Pack deleted successfully:', id);

    res.json({
      success: true,
      message: 'Pack deleted successfully'
    });
  } catch (error) {
    console.error('❌ Error deleting pack:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};