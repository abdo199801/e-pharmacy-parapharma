import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export interface CreatePharmacyData {
  clientId: string;
  pharmacyName: string;
  address: string;
  city: string;
  country: string;
  licenseNumber: string;
  phone?: string;
  website?: string;
}

export interface UpdatePharmacyData {
  pharmacyName?: string;
  address?: string;
  city?: string;
  country?: string;
  licenseNumber?: string;
  phone?: string;
  website?: string;
}

export const getPharmacies = async (req: Request, res: Response) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      search = '',
      city = '',
      country = '',
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
        { pharmacyName: { contains: search, mode: 'insensitive' } },
        { licenseNumber: { contains: search, mode: 'insensitive' } },
        { client: { 
            OR: [
              { firstname: { contains: search, mode: 'insensitive' } },
              { lastname: { contains: search, mode: 'insensitive' } },
              { email: { contains: search, mode: 'insensitive' } }
            ]
          } 
        }
      ];
    }

    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }

    if (country) {
      where.country = { contains: country, mode: 'insensitive' };
    }

    const [pharmacies, total] = await Promise.all([
      prisma.pharmacyBusinessInformation.findMany({
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
              email: true,
              phone: true
            }
          }
        }
      }),
      prisma.pharmacyBusinessInformation.count({ where })
    ]);

    res.json({
      success: true,
      data: {
        pharmacies,
        pagination: {
          page: pageNum,
          limit: limitNum,
          total,
          totalPages: Math.ceil(total / limitNum)
        }
      }
    });
  } catch (error) {
    console.error('❌ Error fetching pharmacies:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getPharmacy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const pharmacy = await prisma.pharmacyBusinessInformation.findUnique({
      where: { id },
      include: {
        client: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            phone: true,
            address: true,
            createdAt: true
          }
        }
      }
    });

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        error: 'Pharmacy not found'
      });
    }

    res.json({
      success: true,
      data: pharmacy
    });
  } catch (error) {
    console.error('❌ Error fetching pharmacy:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getPharmacyByClient = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params;

    const pharmacy = await prisma.pharmacyBusinessInformation.findUnique({
      where: { clientId },
      include: {
        client: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            phone: true
          }
        }
      }
    });

    if (!pharmacy) {
      return res.status(404).json({
        success: false,
        error: 'Pharmacy not found for this client'
      });
    }

    res.json({
      success: true,
      data: pharmacy
    });
  } catch (error) {
    console.error('❌ Error fetching pharmacy by client:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const createPharmacy = async (req: Request, res: Response) => {
  try {
    const { 
      clientId, 
      pharmacyName, 
      address, 
      city, 
      country, 
      licenseNumber, 
      phone, 
      website 
    }: CreatePharmacyData = req.body;

    console.log('📝 Creating new pharmacy:', { pharmacyName, clientId });

    // Validate required fields
    if (!clientId || !pharmacyName || !address || !city || !country || !licenseNumber) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: clientId, pharmacyName, address, city, country, licenseNumber'
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

    // Check if pharmacy already exists for this client
    const existingPharmacy = await prisma.pharmacyBusinessInformation.findUnique({
      where: { clientId }
    });

    if (existingPharmacy) {
      return res.status(400).json({
        success: false,
        error: 'Pharmacy already exists for this client'
      });
    }

    // Check if license number is unique
    const existingLicense = await prisma.pharmacyBusinessInformation.findUnique({
      where: { licenseNumber }
    });

    if (existingLicense) {
      return res.status(400).json({
        success: false,
        error: 'License number already exists'
      });
    }

    // Create pharmacy
    const pharmacy = await prisma.pharmacyBusinessInformation.create({
      data: {
        clientId,
        pharmacyName,
        address,
        city,
        country,
        licenseNumber,
        phone: phone || null,
        website: website || null
      },
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
    });

    console.log('✅ Pharmacy created successfully:', pharmacy.id);

    res.status(201).json({
      success: true,
      message: 'Pharmacy created successfully',
      data: pharmacy
    });
  } catch (error) {
    console.error('❌ Error creating pharmacy:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const updatePharmacy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updateData: UpdatePharmacyData = req.body;

    console.log('📝 Updating pharmacy:', id, updateData);

    // Check if pharmacy exists
    const existingPharmacy = await prisma.pharmacyBusinessInformation.findUnique({
      where: { id }
    });

    if (!existingPharmacy) {
      return res.status(404).json({
        success: false,
        error: 'Pharmacy not found'
      });
    }

    // Check if license number is being updated and is unique
    if (updateData.licenseNumber && updateData.licenseNumber !== existingPharmacy.licenseNumber) {
      const existingLicense = await prisma.pharmacyBusinessInformation.findUnique({
        where: { licenseNumber: updateData.licenseNumber }
      });

      if (existingLicense) {
        return res.status(400).json({
          success: false,
          error: 'License number already exists'
        });
      }
    }

    // Update pharmacy
    const pharmacy = await prisma.pharmacyBusinessInformation.update({
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
        }
      }
    });

    console.log('✅ Pharmacy updated successfully:', id);

    res.json({
      success: true,
      message: 'Pharmacy updated successfully',
      data: pharmacy
    });
  } catch (error) {
    console.error('❌ Error updating pharmacy:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const deletePharmacy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    console.log('🗑️ Deleting pharmacy:', id);

    // Check if pharmacy exists
    const existingPharmacy = await prisma.pharmacyBusinessInformation.findUnique({
      where: { id }
    });

    if (!existingPharmacy) {
      return res.status(404).json({
        success: false,
        error: 'Pharmacy not found'
      });
    }

    // Delete pharmacy
    await prisma.pharmacyBusinessInformation.delete({
      where: { id }
    });

    console.log('✅ Pharmacy deleted successfully:', id);

    res.json({
      success: true,
      message: 'Pharmacy deleted successfully'
    });
  } catch (error) {
    console.error('❌ Error deleting pharmacy:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};

export const getPharmacyStats = async (req: Request, res: Response) => {
  try {
    const totalPharmacies = await prisma.pharmacyBusinessInformation.count();
    
    const pharmaciesByCountry = await prisma.pharmacyBusinessInformation.groupBy({
      by: ['country'],
      _count: {
        id: true
      },
      orderBy: {
        _count: {
          id: 'desc'
        }
      }
    });

    const recentPharmacies = await prisma.pharmacyBusinessInformation.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        client: {
          select: {
            firstname: true,
            lastname: true,
            email: true
          }
        }
      }
    });

    res.json({
      success: true,
      data: {
        totalPharmacies,
        pharmaciesByCountry,
        recentPharmacies
      }
    });
  } catch (error) {
    console.error('❌ Error fetching pharmacy stats:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error'
    });
  }
};