import { Router } from "express";
import { createUser, getUser } from "../controller/user.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/rbac.middleware.js";

export const userRouter = Router();

userRouter.post(
    "/",
    authenticate,
    authorize("Owner", "Manager"),
    createUser
)

userRouter.get("/:id", 
    authenticate,
    getUser
)