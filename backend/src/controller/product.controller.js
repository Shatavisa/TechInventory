import mongoose from "mongoose"
import Product from "../models/product.model.js"
import Variant from "../models/variant.model.js"

export const createProduct = async (req, res) => {
    const session = await mongoose.startSession();

    try {
        const { tenantId, userId } = req.user;
        const {
            name,
            description,
            category,
            brand,
            basePrice,
            costPrice,
            hasVariants,
            variantAttributes,
            sku,
            barcode,
            trackInventory = true,
            lowStockThreshold,
            variants = [],
        } = req.body;

        if (!name) {
            return res.status(400).json({ message: "Product name is required" });
        }

        session.startTransaction();

        const product = await Product.create(
            [
                {
                    tenantId,
                    name,
                    description,
                    category,
                    brand,
                    basePrice,
                    costPrice,
                    hasVariants,
                    variantAttributes,
                    sku,
                    barcode,
                    trackInventory,
                    lowStockThreshold,
                    isActive: true,
                    createdBy: userId,
                    updatedBy: userId,
                },
            ],
            { session }
        );

        let createdVariants = [];
        if (hasVariants && variants.length > 0) {
            createdVariants = await Variant.insertMany(
                variants.map((v) => ({
                    tenantId,
                    productId: product[0]._id,
                    sku: v.sku,
                    barcode: v.barcode,
                    variantAttributes: v.variantAttributes,
                    price: v.price ?? basePrice,
                    costPrice: v.costPrice ?? costPrice,
                    stockQuantity: v.stockQuantity ?? 0,
                    reservedQuantity: 0,
                    committedQuantity: 0,
                    lowStockThreshold: v.lowStockThreshold ?? lowStockThreshold,
                    isActive: true,
                })),
                { session }
            );
        }

        await session.commitTransaction();

        return res.status(201).json({
            product: product[0],
            variants: createdVariants,
        });
    } catch (error) {
        console.log(error)
        await session.abortTransaction();
        return res.status(500).json({
            message: "Product creation failed",
            error: error.message,
        });
    }finally {
        session.endSession();
    }
}

export const getProducts = async (req, res) => {
    try {
        const { tenantId } = req.user;

        const {
            page = 1,
            limit = 20,
            search,
            category,
            brand,
            isActive,
            hasVariants
        } = req.query;

        const filter = { tenantId };

        if(category) filter.category = category;
        if(brand) filter.brand = brand;
        if(isActive) filter.isActive = isActive == "true";
        if(hasVariants) filter.hasVariants = hasVariants === "true";

        if(search) {
            filter.$or = [
                { name: { $regex: search, $options: "i" }},
                { sku: { $regex: search, $options: "i" }}
            ]
        };

        const pageNumber = Math.max(Number(page), 1);
        const pageSize = Math.max(Number(limit), 100);
        const skip = (pageNumber - 1)* pageSize;

        const [items, total] = await Promise.all([
            Product.find(filter)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(pageSize)
                .lean(),
            Product.countDocuments(filter),    
        ]);

        return res.status(200).json({
            data: items,
            meta: {
                page: pageNumber,
                limit: pageSize,
                total,
                totalPages: Math.ceil(total/pageSize),
            },
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Failed to fetch products" });
    }
}