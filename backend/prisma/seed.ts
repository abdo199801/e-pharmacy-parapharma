// prisma/seed.ts
import { PrismaClient } from '../app/generated/prisma';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting seed...");

  try {
    // Clear existing data first
    console.log("🧹 Clearing existing data...");
    await prisma.purchase.deleteMany();
    await prisma.product.deleteMany();
    await prisma.subscription.deleteMany();
    await prisma.page.deleteMany();
    await prisma.dashboard.deleteMany();
    await prisma.pharmacyBusinessInformation.deleteMany();
    await prisma.client.deleteMany();
    await prisma.category.deleteMany();
    await prisma.packAbonnement.deleteMany();

    console.log("✅ Database cleared");

    // 1. Create Packs using create (not upsert)
    const basicPack = await prisma.packAbonnement.create({
      data: {
        name: "Pack Basique",
        description: "Pack de base pour petites pharmacies",
        price: 99.99,
        durationMonths: 12,
        status: "active",
      },
    });

    const premiumPack = await prisma.packAbonnement.create({
      data: {
        name: "Pack Premium",
        description: "Pack complet avec toutes les fonctionnalités",
        price: 199.99,
        durationMonths: 12,
        status: "active",
      },
    });

    console.log("✅ Packs created");

    // 2. Create Categories
    const medsCategory = await prisma.category.create({
      data: {
        name: "Médicaments",
        description: "Tous types de médicaments",
      },
    });

    const hygieneCategory = await prisma.category.create({
      data: {
        name: "Hygiène",
        description: "Produits d'hygiène et de soin",
      },
    });

    console.log("✅ Categories created");

    // 3. Create Dashboard
    const dashboard = await prisma.dashboard.create({
      data: {
        name: "Tableau de bord principal",
        description: "Tableau de bord pour le pack basique",
        packId: basicPack.id,
      },
    });

    // Create dashboard page
    await prisma.page.create({
      data: {
        title: "Page d'accueil",
        content: "Bienvenue dans votre tableau de bord",
        dashboardId: dashboard.id,
      },
    });

    console.log("✅ Dashboard created");

    // 4. Create Clients
    const hashedPassword = await bcrypt.hash("password123", 10);

    const client1 = await prisma.client.create({
      data: {
        firstname: "Jean",
        lastname: "Dupont",
        email: "jean.dupont@pharmacy.fr",
        password: hashedPassword,
        phone: "+33123456789",
        role: "NORMALCLIENT", // Use string literal, not enum
        pharmacyInfo: {
          create: {
            pharmacyName: "Pharmacie Dupont",
            address: "123 Rue de la République",
            city: "Paris",
            country: "France",
            licenseNumber: "PH123456789",
            phone: "+33123456789",
          },
        },
      },
    });

    const adminClient = await prisma.client.create({
      data: {
        firstname: "Admin",
        lastname: "System",
        email: "admin@pharmacy-system.fr",
        password: hashedPassword,
        phone: "+33987654321",
        role: "ADMINISTRATORCLIENT", // Use string literal, not enum
      },
    });

    console.log("✅ Clients created");

    // 5. Create Subscription
    await prisma.subscription.create({
      data: {
        clientId: client1.id,
        packId: basicPack.id,
        startDate: new Date(),
        endDate: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
        status: "active",
      },
    });

    console.log("✅ Subscription created");

    // 6. Create Products
    const paracetamol = await prisma.product.create({
      data: {
        name: "Paracétamol 500mg",
        price: 2.5,
        description: "Antidouleur et antipyrétique",
        dashboardId: dashboard.id,
        categoryId: medsCategory.id,
      },
    });

    const aspirine = await prisma.product.create({
      data: {
        name: "Aspirine 500mg",
        price: 3.2,
        description: "Anti-inflammatoire non stéroïdien",
        dashboardId: dashboard.id,
        categoryId: medsCategory.id,
      },
    });

    console.log("✅ Products created");

    // 7. Create Purchase
    await prisma.purchase.create({
      data: {
        clientId: client1.id,
        productId: paracetamol.id,
        quantity: 2,
        total: 5.0,
      },
    });

    console.log("✅ Purchase created");
    console.log("🎉 Seed completed successfully!");

    // Display summary
    console.log("\n📊 Created Data Summary:");
    console.log(`- Packs: ${await prisma.packAbonnement.count()}`);
    console.log(`- Categories: ${await prisma.category.count()}`);
    console.log(`- Clients: ${await prisma.client.count()}`);
    console.log(`- Products: ${await prisma.product.count()}`);
    console.log(`- Subscriptions: ${await prisma.subscription.count()}`);
    console.log(`- Purchases: ${await prisma.purchase.count()}`);

  } catch (error) {
    console.error("❌ Seed error:", error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error("💥 Seed failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });