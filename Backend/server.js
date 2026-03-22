require("dotenv").config();
const app= require("./src/app")
const connectdb= require("./src/config/database")

const startServer = async () => {
    try {
        await connectdb()
        app.listen(3000, () => {
            console.log("✅ Server is running on http://localhost:3000");
        })
    } catch (error) {
        console.error("❌ Failed to start server:", error.message)
        process.exit(1)
    }
}

startServer()
