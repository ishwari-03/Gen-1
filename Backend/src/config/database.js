const mongoose = require("mongoose")

async function connectdb(){
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI environment variable is not set")
        }
        await mongoose.connect(process.env.MONGO_URI)
        console.log("✅ Connected to Database")
        return true
    } catch (error) {
        console.error(
            "❌ Error connecting to database: ", error.message
        )
        process.exit(1)
    }
}

module.exports = connectdb;