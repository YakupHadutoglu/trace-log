/*
  Warnings:

  - Made the column `publicId` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Project" ALTER COLUMN "publicId" SET NOT NULL;

-- CreateTable
CREATE TABLE "AlarmRule" (
    "id" SERIAL NOT NULL,
    "projectId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "conditionSeverity" TEXT,
    "conditionMessage" TEXT,
    "sendEmail" BOOLEAN NOT NULL DEFAULT false,
    "sendSMS" BOOLEAN NOT NULL DEFAULT false,
    "sendDiscord" BOOLEAN NOT NULL DEFAULT false,
    "discordWebHookUrl" TEXT,
    "targetEmail" TEXT,
    "targetPhone" TEXT,
    "cooldownMinutes" INTEGER NOT NULL DEFAULT 5,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "AlarmRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AlarmRule_projectId_key" ON "AlarmRule"("projectId");

-- AddForeignKey
ALTER TABLE "AlarmRule" ADD CONSTRAINT "AlarmRule_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
