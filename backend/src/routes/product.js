import { createProduct, getProducts } from "../controller/product.controller.js";
import { authenticate } from "../middleware/auth.middleware.js";
import { authorize } from "../middleware/rbac.middleware.js";
import { Router } from "express";

export const productRouter = Router();

productRouter.post(
    "/",
    authenticate,
    authorize("Owner","Manager"),
    createProduct
)

productRouter.get(
    "/",
    authenticate,
    getProducts
)