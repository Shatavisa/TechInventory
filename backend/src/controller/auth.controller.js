import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Tenant from "../models/tenant.model.js";

export const signup = async (req, res) => {
    const session = await mongoose.startSession();
    try {
        const { businessName, ownerName, email, password } = req.body;

        if(!businessName || !ownerName || !email || !password){
            return res.status(400).json({ message: "Missing required fields"});
        }

        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(409).json({ message: "Email already registered"})
        }

        session.startTransaction();

        const tenantDoc = new Tenant({ businessName })
        const tenant = await tenantDoc.save({ session });

        const [firstName, ...lastNameParts] = ownerName.trim().split();
        const lastName = lastNameParts.join(" ") || "Owner";

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create(
            [
                {
                    tenantId: tenant._id,
                    email,
                    password: hashedPassword,
                    firstName,
                    lastName,
                    role: "Owner",
                    isActive: true,
                }
            ],
            { session }
        );

        if (!user[0]) {
            throw new Error("Failed to create user");
        }

        const token = jwt.sign(
            {
                userId: user[0]._id,
                tenantId: tenant._id,
                role: user[0].role,
            },
            process.env.JWT_SECRET_KEY,
            process.env.JWT_EXPIRES_IN
        );

        await session.commitTransaction();

        return res.status(201).json({
            token,
            tenantId: tenant._id,
        });
    } catch (error) {
        await session.abortTransaction();
        return res.status(500).json({ message: "Signup failed", error });
    } finally {
        session.endSession();
    }
}

export const signIn = async (req, res) => {
    try{
        const { email, password } = req.body;

        if(!email || !password){
            return res.status(400).json({ message: "Missing required fields" })
        }

        const user = await User.findOne({ email });

        if(!user){
            return res.status(401).json({ message: "Invalid email or password" });
        }

        if(!user.isActive){
            return res.status(403).json({ message: "User account is inactive "});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid){
            return res.status(401).json({ message: "Invalid credentials" })
        }

        const token = jwt.sign(
            {
                userId: user._id,
                tenantId: user.tenantId,
                role: user.role
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        )

        return res.status(200).json({
            token,
            tenantId: user.tenantId,
            role: user.role
        })
    }catch(error){
        console.error(error)
        return res.status(500).json({ message: "SigIn failed", error });
    }
}