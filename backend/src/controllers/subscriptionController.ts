import { Request, Response } from 'express'
import { prisma } from '../lib/prisma'

export const createSubscription = async (req: Request, res: Response) => {
  try {
    const { clientId, packId, startDate, endDate } = req.body

    const subscription = await prisma.subscription.create({
      data: {
        clientId,
        packId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        status: 'active'
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
        pack: true
      }
    })

    res.status(201).json(subscription)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getClientSubscriptions = async (req: Request, res: Response) => {
  try {
    const { clientId } = req.params

    const subscriptions = await prisma.subscription.findMany({
      where: { clientId },
      include: {
        pack: true
      },
      orderBy: { createdAt: 'desc' }
    })

    res.json(subscriptions)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' })
  }
}