import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export interface CreateCategoryData {
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  status?: 'active' | 'inactive';
}

export interface UpdateCategoryData {
  name?: string;
  description?: string;
  icon?: string;
  color?: string;
  status?: 'active' | 'inactive';
}

export const getCategories = async (req: Request, res: Response) => {
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

    const [categories, total] = await Promise.all([
      prisma.category.findMany({
        where,
        skip,
        take: limitNum,
        orderBy: {
          [sortBy as string]: sortOrder
        },
        include: {
          _count: {
            select: {
              products: true
            }
          }
        }
      }),
      prisma.category.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        categories: categories.map(category => ({
          id: category.id,
          name: category.name,
          description: category.description,
          icon: category.icon,
          color: category.color,
          status: category.status,
          productCount: category._count.products,
          createdAt: category.createdAt,
          updatedAt: category.updatedAt
        })),
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        }
      }
    });
  } catch (error) {
    console.error('❌ Error fetching categories:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            products: true
          }
        },
        products: {
          take: 10,
          orderBy: {
            createdAt: 'desc'
          },
          select: {
            id: true,
            name: true,
            price: true,
            stock: true,
            status: true
          }
        }
      }
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    res.json({
      success: true,
      data: {
        ...category,
        productCount: category._count.products
      }
    });
  } catch (error) {
    console.error('❌ Error fetching category:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { name, description, icon, color, status }: CreateCategoryData = req.body;

    console.log('📝 Creating new category:', { name });

    // Validate required fields
    if (!name) {
      return res.status(400).json({
        success: false,
        error: 'Category name is required'
      });
    }

    // Check if category already exists
    const existingCategory = await prisma.category.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive'
        }
      }
    });

    if (existingCategory) {
      return res.status(400).json({
        success: false,
        error: 'Category with this name already exists'
      });
    }

    // Create category
    const category = await prisma.category.create({
      data: {
        name,
        description,
        icon: icon || '📦',
        color: color || '#6B7280',
        status: status || 'active'
      },
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    console.log('✅ Category created successfully:', category.id);

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: {
        ...category,
        productCount: category._count.products
      }
    });
  } catch (error) {
    console.error('❌ Error creating category:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: UpdateCategoryData = req.body;

    console.log('📝 Updating category:', id, updateData);

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id }
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    // Check for duplicate name if name is being updated
    if (updateData.name && updateData.name !== existingCategory.name) {
      const duplicateCategory = await prisma.category.findFirst({
        where: {
          name: {
            equals: updateData.name,
            mode: 'insensitive'
          },
          id: { not: id }
        }
      });

      if (duplicateCategory) {
        return res.status(400).json({
          success: false,
          error: 'Category with this name already exists'
        });
      }
    }

    // Update category
    const category = await prisma.category.update({
      where: { id },
      data: updateData,
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    console.log('✅ Category updated successfully:', id);

    res.json({
      success: true,
      message: 'Category updated successfully',
      data: {
        ...category,
        productCount: category._count.products
      }
    });
  } catch (error) {
    console.error('❌ Error updating category:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    console.log('🗑️ Deleting category:', id);

    // Check if category exists
    const existingCategory = await prisma.category.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            products: true
          }
        }
      }
    });

    if (!existingCategory) {
      return res.status(404).json({
        success: false,
        error: 'Category not found'
      });
    }

    // Check if category has products
    if (existingCategory._count.products > 0) {
      return res.status(400).json({
        success: false,
        error: 'Cannot delete category with associated products'
      });
    }

    // Delete category
    await prisma.category.delete({
      where: { id }
    });

    console.log('✅ Category deleted successfully:', id);

    res.json({
      success: true,
      message: 'Category deleted successfully'
    });
  } catch (error) {
    console.error('❌ Error deleting category:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};