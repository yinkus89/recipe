"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProfile = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProfile = async (req, res) => {
    try {
        const userId = req.user?.id; // Ensure `req.user` is defined
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized: User not authenticated" });
        }
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, name: true, email: true }, // Fetch only necessary fields
        });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.status(200).json(user);
    }
    catch (error) {
        console.error("Error fetching profile:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getProfile = getProfile;
