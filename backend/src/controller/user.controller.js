import bcrypt from "bcrypt"
import User from "../models/user.model.js";
export const createUser = async (req, res) => {
    try {
        const { email, firstName, lastName, role, password } = req.body;
        const { tenantId } = req.user;

        if(!firstName || !lastName || !email || !password || !role){
            return res.status(400).json({ message: "Missing required fields"});
        }

        if(!["Manager", "Staff"].includes(role)){
            return res.status(400).json({ message: "Invalid role "})
        }

        const existingUser = User.findOne({ email });
        if(existingUser){
            return res.status(409).json({ message: "Email already exists"})
        }

        const hashedPassword = await bcrypt.hash(password, 12)

        const user = await User.create({
            tenantId,
            email,
            password: hashedPassword,
            firstName,
            lastName,
            role,
            isActive: true
        })

        return res.status(201).json({
            id: user._id,
            email: user.email,
            role: user.role
        })
    } catch (error) {
        console.log("create user error", error)
    }
}

export const getUser = async (req, res) => {
    try {
        const { id } = req.user;
        const { userId, role } = req.user;

        if(role === "staff" && id !== userId) {
            return res.status(403).json({ message: "Forbidden" }); 
        }

        const user = await 
            User
            .findById(userId)
            .select('-password -isActive -createdAt -__v')
            .populate({
                path: 'tenantId',
                select: '-createdAt -__v'
            });

        if(!user){
            return res.status(404).json({ message: "User not found" })
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch user "})
    }
}