-- CreateTable
CREATE TABLE "PharmacyBusinessInformation" (
    "id" TEXT NOT NULL,
    "pharmacyName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "licenseNumber" TEXT NOT NULL,
    "phone" TEXT,
    "website" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "clientId" TEXT NOT NULL,

    CONSTRAINT "PharmacyBusinessInformation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PharmacyBusinessInformation_licenseNumber_key" ON "PharmacyBusinessInformation"("licenseNumber");

-- CreateIndex
CREATE UNIQUE INDEX "PharmacyBusinessInformation_clientId_key" ON "PharmacyBusinessInformation"("clientId");

-- AddForeignKey
ALTER TABLE "PharmacyBusinessInformation" ADD CONSTRAINT "PharmacyBusinessInformation_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "Client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
