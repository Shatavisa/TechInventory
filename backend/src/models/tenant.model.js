import mongoose, { Schema } from 'mongoose';

const TenantSchema = new Schema ({
    businessName: { type: String, required: true },          // "Acme Retail Store"
    contactPhone: { type: String, required: true },
    address: { type: String, required: true },
    isActive: Boolean,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
});

TenantSchema.index({ contactEmail: 1 });

export default mongoose.model('Tenant', TenantSchema);