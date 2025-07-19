require("dotenv").config(); // Load .env file

const mongoose = require("mongoose");

const conn = async () => {
    try {
        console.log("MongoDB URI:", process.env.URI); // Debugging step
        await mongoose.connect(process.env.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to database");
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

conn();