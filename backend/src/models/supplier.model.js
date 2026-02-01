import mongoose, { Schema } from 'mongoose';

const SupplierSchema = new Schema({
    _id: { type: mongoose.Schema.Types.ObjectId },
    tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true },
    name: String,
    email: String,
    phone: String,
    address: {
        state: String,
        country: String
    },
    
    // Business Details
    taxId: String,
    paymentTerms: String,           // "Net 30", "Net 60", "COD"
    currency: String,
    
    // Performance metrics (calculated)
    stats: {
        totalOrders: Number,
        totalValue: Number,
        averageLeadTime: Number,      // In days
        onTimeDeliveryRate: Number    // Percentage
    },
    isActive: Boolean,
    
    notes: String,
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
});

// Ensure supplier names are unique within a single tenant
SupplierSchema.index({ tenantId: 1, name: 1 }, { unique: true });

export default mongoose.model('Supplier', SupplierSchema);