-- AlterTable
ALTER TABLE "_RecipeTags" ADD CONSTRAINT "_RecipeTags_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_RecipeTags_AB_unique";

-- AlterTable
ALTER TABLE "_UserFavorites" ADD CONSTRAINT "_UserFavorites_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "_UserFavorites_AB_unique";
