import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema ({
    tenantId: { type: Schema.Types.ObjectId, ref: 'Tenant', required: true}, 
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },               // Hashed with bcrypt
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    role: { type: String, enum: ['Owner', 'Manager', 'Staff'], required: true },
    // permissions: [String], 
    isActive: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date }
})

UserSchema.index({ tenantId: 1, email: 1}, { unique: true });
UserSchema.index({ tenantId: 1, role: 1});
UserSchema.index({ email: 1 });

export default mongoose.model('User', UserSchema);