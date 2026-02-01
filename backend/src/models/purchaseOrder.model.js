import mongoose, { Schema } from 'mongoose';

const purchaseOrderSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant' },
    supplierId: { type: Schema.Types.ObjectId, ref: 'Supplier' },
    status: String,                             // "draft", "sent", "confirmed", "partially_received", "received", "cancelled"

    // Items
    items: [{
        productId: { type: Schema.Types.ObjectId, ref: 'Product' },
        variantId: { type: Schema.Types.ObjectId, ref: 'Variant' },          // Can be null for base products
        sku: String,
        name: String,                 // Snapshot at time of order
        variantDescription: String,   // "Red / Medium"
        
        orderedQuantity: Number,
        receivedQuantity: Number,     // Track partial deliveries
        unitPrice: Number,
        taxRate: Number,              // Percentage
        
        subtotal: Number,             // orderedQuantity * unitPrice
        taxAmount: Number,
        total: Number
    }],


    // Financial Summary
    subtotal: Number,
    taxTotal: Number,
    shippingCost: Number,
    otherCosts: Number,
    grandTotal: Number,
    
    // Dates
    orderDate: Date,
    expectedDeliveryDate: Date,
    actualDeliveryDate: Date,
    
    // Shipping
    shippingAddress: {
        street: String,
        city: String,
        state: String,
    },
    
    // Payment
    paymentTerms: String,
    paymentStatus: String,          // "unpaid", "partially_paid", "paid"
    paymentDueDate: Date,
    
    // Notes and tracking
    notes: String,
    internalNotes: String,
    trackingNumber: String,
    
    // Audit
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    approvedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    approvedAt: Date,
    
    createdAt: { type: Schema.Types.ObjectId, ref: 'User' },
    updatedAt: Date
});

purchaseOrderSchema.index({ tenantId: 1, status: 1, createdAt: -1 })
purchaseOrderSchema.index({ tenantId: 1, poNumber: 1 }, { unique: true })
purchaseOrderSchema.index({ tenantId: 1, supplierId: 1, createdAt: -1 })
purchaseOrderSchema.index({ tenantId: 1, expectedDeliveryDate: 1 })
purchaseOrderSchema.index({ 
  tenantId: 1, 
  status: 1,
  "items.variantId": 1 
})

export default mongoose.model('PurchaseOrder', purchaseOrderSchema);