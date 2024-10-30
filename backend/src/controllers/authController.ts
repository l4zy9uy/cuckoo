import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/user";

export const login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid password" });
        }

        return res.status(200).json({ message: "Login successful" });
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error });
    }
};
