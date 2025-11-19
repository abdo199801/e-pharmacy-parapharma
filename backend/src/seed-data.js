// seed-data.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Starting seed...');

  // 1. Create PackAbonnement first
  const basicPack = await prisma.packAbonnement.create({
    data: {
      name: "Pack Basique",
      description: "Pack de base pour petites pharmacies",
      price: 99.99,
      durationMonths: 12,
      status: "active"
    }
  });

  const premiumPack = await prisma.packAbonnement.create({
    data: {
      name: "Pack Premium",
      description: "Pack complet avec toutes les fonctionnalités",
      price: 199.99,
      durationMonths: 12,
      status: "active"
    }
  });

  console.log('Packs created:', { basicPack, premiumPack });

  // 2. Create Categories
  const medsCategory = await prisma.category.create({
    data: {
      name: "Médicaments",
      description: "Tous types de médicaments"
    }
  });

  const hygieneCategory = await prisma.category.create({
    data: {
      name: "Hygiène",
      description: "Produits d'hygiène et de soin"
    }
  });

  // 3. Create Dashboard
  const dashboard = await prisma.dashboard.create({
    data: {
      name: "Tableau de bord principal",
      description: "Tableau de bord pour le pack basique",
      packId: basicPack.id,
      pages: {
        create: {
          title: "Page d'accueil",
          content: "Bienvenue dans votre tableau de bord"
        }
      },
      products: {
        create: {
          name: "Paracétamol 500mg",
          price: 2.50,
          categoryId: medsCategory.id,
          description: "Antidouleur et antipyrétique"
        }
      }
    }
  });

  // 4. Create Clients
  const client1 = await prisma.client.create({
    data: {
      firstname: "Jean",
      lastname: "Dupont",
      email: "jean.dupont@pharmacy.fr",
      password: "$2b$10$examplehashedpassword", // In real app, hash properly
      phone: "+33123456789",
      role: "NORMALCLIENT",
      pharmacyInfo: {
        create: {
          pharmacyName: "Pharmacie Dupont",
          address: "123 Rue de la République",
          city: "Paris",
          country: "France",
          licenseNumber: "PH123456789",
          phone: "+33123456789"
        }
      }
    }
  });

  const adminClient = await prisma.client.create({
    data: {
      firstname: "Admin",
      lastname: "System",
      email: "admin@pharmacy-system.fr",
      password: "$2b$10$examplehashedpassword",
      phone: "+33987654321",
      role: "ADMINISTRATORCLIENT"
    }
  });

  // 5. Create Subscription
  const subscription = await prisma.subscription.create({
    data: {
      clientId: client1.id,
      packId: basicPack.id,
      startDate: new Date(),
      endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year later
      status: "active"
    }
  });

  // 6. Create Products and Purchases
  const product1 = await prisma.product.create({
    data: {
      name: "Aspirine 500mg",
      price: 3.20,
      description: "Anti-inflammatoire non stéroïdien",
      dashboardId: dashboard.id,
      categoryId: medsCategory.id
    }
  });

  const purchase = await prisma.purchase.create({
    data: {
      clientId: client1.id,
      productId: product1.id,
      quantity: 2,
      total: 6.40
    }
  });

  console.log('Seed completed successfully!');
  console.log({
    clients: [client1, adminClient],
    packs: [basicPack, premiumPack],
    subscription,
    purchase
  });
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });