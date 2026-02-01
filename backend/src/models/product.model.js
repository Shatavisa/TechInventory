import mongoose, { Schema } from 'mongoose';

const ProductSchema = new Schema ({
    tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant' },
    name: { type: String, required: true },                   // "Cotton T-Shirt"
    description: String,
    category: String,               // "Apparel", "Electronics", "Food"
    brand: String,
    basePrice: Number,              // Base price (variants can override)
    costPrice: Number,              // Cost per unit for profit calculations
    
    // Variant Configuration
    hasVariants: Boolean,           // true if product has variants
    variantAttributes: [{           // Define variant dimensions
        name: String,                 // "Size", "Color"
        values: [String]              // ["S", "M", "L"], ["Red", "Blue", "Green"]
    }],
    
    // Product-level settings
    sku: String,                    // SKU prefix or full SKU if no variants
    barcode: String,
    
    // Stock settings (for non-variant products)
    trackInventory: Boolean,        // false for services/digital products
    lowStockThreshold: Number,      // Override tenant default
    
    isActive: Boolean,
    
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true},            // User who created
    updatedBy: { type: Schema.Types.ObjectId, ref: 'User', required: true},            // User who last updated
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date 
});

ProductSchema.index({ tenantId: 1, isActive: 1 });
ProductSchema.index({ tenantId: 1, name: 1 });
ProductSchema.index({ tenantId: 1, sku: 1 });
ProductSchema.index({ tenantId: 1, category: 1 });

export default mongoose.model('Product', ProductSchema);