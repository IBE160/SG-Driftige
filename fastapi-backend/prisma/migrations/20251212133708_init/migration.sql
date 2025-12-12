-- CreateTable
CREATE TABLE "Content" (
    "id" TEXT NOT NULL,
    "rawText" TEXT NOT NULL,
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fileName" TEXT,

    CONSTRAINT "Content_pkey" PRIMARY KEY ("id")
);
