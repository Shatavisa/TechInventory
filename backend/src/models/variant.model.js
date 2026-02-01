import mongoose, { Schema } from 'mongoose';

const VariantSchema = new Schema({
    tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant' },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    sku: String,                    // Unique SKU: "TSHIRT-RED-M"
    barcode: String,
    variantAttributes: {            // Specific combination
        size: [String],
        color: [String]
    },

    price: Number,                  
    costPrice: Number,   

    stockQuantity: Number,          // Current available stock
    reservedQuantity: Number,       // Stock reserved for pending orders
    committedQuantity: Number,      // Stock in confirmed Purchase Orders
    
    lowStockThreshold: Number,
    
    weight: Number,
    dimensions: {
        length: Number,
        width: Number,
        height: Number,
        unit: String                  // "cm", "in"
    },
    isActive: Boolean,
    
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date   
})

VariantSchema.index({ tenantId: 1, productId: 1 })
VariantSchema.index({ tenantId: 1, productId: 1 })
VariantSchema.index({ tenantId: 1, sku: 1 }, { unique: true })
VariantSchema.index({ tenantId: 1, barcode: 1 }, { sparse: true })
VariantSchema.index({ tenantId: 1, stockQuantity: 1 })
VariantSchema.index({ tenantId: 1, isActive: 1 })
VariantSchema.index({ 
  tenantId: 1, 
  stockQuantity: 1, 
  lowStockThreshold: 1 
})

export default mongoose.model('Variant', VariantSchema);