import mongoose from 'mongoose';

async function connectToDatabase(uri, options = {}) {
    if (typeof options !== 'object' || Array.isArray(options)) {
        options = {};
    }
    return await mongoose.connect(uri, { ...options });
}

export default connectToDatabase;
