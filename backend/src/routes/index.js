import { Router } from "express";
import authRouter from "./auth.routes.js";
import { userRouter } from "./user.routes.js";
import { productRouter } from "./product.js";

export const apiRouter = Router();

apiRouter.use("/auth", authRouter)
apiRouter.use("/user", userRouter)
apiRouter.use("/products", productRouter);