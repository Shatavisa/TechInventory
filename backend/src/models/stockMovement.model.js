import mongoose, { Schema } from 'mongoose';

const stockMovementSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant' },
    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    variantId: { type: Schema.Types.ObjectId, ref: 'Variant' },
    type: String,                   // "purchase", "sale", "return", "adjustment", "transfer"
    quantity: Number,               // Positive for additions, negative for deductions

    // Before/After snapshot
    previousStock: Number,
    newStock: Number,

    // Reference to source transaction
    referenceType: String,          // "order", "purchase_order", "adjustment"
    referenceId: { type: Schema.Types.ObjectId, ref: 'User' },       // ID of the related document

    // Additional context
    reason: String,                 // For adjustments: "damaged", "theft", "found", "correction"
    notes: String,

    // Tracking
    performedBy: { type: Schema.Types.ObjectId, ref: 'User' },       // User who performed the action
    location: String,               // Warehouse location if applicable

    createdAt: { type: Date, default: Date.now }                 
})

stockMovementSchema.index({ tenantId: 1, createdAt: -1 })
stockMovementSchema.index({ tenantId: 1, variantId: 1, createdAt: -1 })
stockMovementSchema.index({ tenantId: 1, productId: 1, createdAt: -1 })
stockMovementSchema.index({ tenantId: 1, type: 1, createdAt: -1 })
stockMovementSchema.index({ tenantId: 1, referenceType: 1, referenceId: 1 })

export default mongoose.model('StockMovement', stockMovementSchema);