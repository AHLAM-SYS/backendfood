const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const MONGO_URI = 'mongodb+srv://lenu0215:ahlam08@cluster0.f59hb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas');
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
