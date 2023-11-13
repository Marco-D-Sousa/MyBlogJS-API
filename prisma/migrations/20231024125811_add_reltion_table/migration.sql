/*
  Warnings:

  - You are about to drop the `_PostToTag` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_PostToTag";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_MyRelationTable" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_MyRelationTable_A_fkey" FOREIGN KEY ("A") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_MyRelationTable_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_MyRelationTable_AB_unique" ON "_MyRelationTable"("A", "B");

-- CreateIndex
CREATE INDEX "_MyRelationTable_B_index" ON "_MyRelationTable"("B");
