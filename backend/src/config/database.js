import mongoose from 'mongoose';

async function connectToDatabase(uri, options = {}) {
    return await mongoose.connect(uri, { ...options });
}

export default connectToDatabase;
