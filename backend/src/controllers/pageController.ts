import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export interface CreatePageData {
  title: string;
  content?: string;
  dashboardId: string;
}

export interface UpdatePageData {
  title?: string;
  content?: string;
  dashboardId?: string;
}

export const getPages = async (req: Request, res: Response) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '',
      dashboardId = '',
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
        { title: { contains: search, mode: 'insensitive' } },
        { content: { contains: search, mode: 'insensitive' } }
      ];
    }

    if (dashboardId) {
      where.dashboardId = dashboardId;
    }

    const [pages, total] = await Promise.all([
      prisma.page.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: {
          [sortBy as string]: sortOrder
        },
        include: {
          dashboard: {
            select: {
              id: true,
              name: true,
              pack: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      }),
      prisma.page.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        pages,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        }
      }
    });
  } catch (error) {
    console.error('❌ Error fetching pages:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getPage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const page = await prisma.page.findUnique({
      where: { id },
      include: {
        dashboard: {
          include: {
            pack: {
              select: {
                name: true,
                price: true
              }
            }
          }
        }
      }
    });

    if (!page) {
      return res.status(404).json({
        success: false,
        error: 'Page not found'
      });
    }

    res.json({
      success: true,
      data: page
    });
  } catch (error) {
    console.error('❌ Error fetching page:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const createPage = async (req: Request, res: Response) => {
  try {
    const { title, content, dashboardId }: CreatePageData = req.body;

    console.log('📝 Creating new page:', { title, dashboardId });

    // Validate required fields
    if (!title || !dashboardId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: title, dashboardId'
      });
    }

    // Check if dashboard exists
    const dashboard = await prisma.dashboard.findUnique({
      where: { id: dashboardId }
    });

    if (!dashboard) {
      return res.status(404).json({
        success: false,
        error: 'Dashboard not found'
      });
    }

    // Create page
    const page = await prisma.page.create({
      data: {
        title,
        content: content || null,
        dashboardId
      },
      include: {
        dashboard: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    console.log('✅ Page created successfully:', page.id);

    res.status(201).json({
      success: true,
      message: 'Page created successfully',
      data: page
    });
  } catch (error) {
    console.error('❌ Error creating page:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const updatePage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: UpdatePageData = req.body;

    console.log('📝 Updating page:', id, updateData);

    // Check if page exists
    const existingPage = await prisma.page.findUnique({
      where: { id }
    });

    if (!existingPage) {
      return res.status(404).json({
        success: false,
        error: 'Page not found'
      });
    }

    // Check if dashboard exists if dashboardId is being updated
    if (updateData.dashboardId && updateData.dashboardId !== existingPage.dashboardId) {
      const dashboard = await prisma.dashboard.findUnique({
        where: { id: updateData.dashboardId }
      });

      if (!dashboard) {
        return res.status(404).json({
          success: false,
          error: 'Dashboard not found'
        });
      }
    }

    // Update page
    const page = await prisma.page.update({
      where: { id },
      data: updateData,
      include: {
        dashboard: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    console.log('✅ Page updated successfully:', id);

    res.json({
      success: true,
      message: 'Page updated successfully',
      data: page
    });
  } catch (error) {
    console.error('❌ Error updating page:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const deletePage = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    console.log('🗑️ Deleting page:', id);

    // Check if page exists
    const existingPage = await prisma.page.findUnique({
      where: { id }
    });

    if (!existingPage) {
      return res.status(404).json({
        success: false,
        error: 'Page not found'
      });
    }

    // Delete page
    await prisma.page.delete({
      where: { id }
    });

    console.log('✅ Page deleted successfully:', id);

    res.json({
      success: true,
      message: 'Page deleted successfully'
    });
  } catch (error) {
    console.error('❌ Error deleting page:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};