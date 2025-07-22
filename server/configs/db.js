import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) {
      throw new Error("MONGO_URI environment variable not set");
    }

    await mongoose.connect(uri);

    // ✅ Log immediately after successful connect
    console.log(`✅ Database connected to ${uri}`);

    // Optional: error listener for future issues
    mongoose.connection.on("error", (err) => {
      console.error("❌ Mongoose connection error:", err);
    });

  } catch (error) {
    console.error("❌ DB Connection Error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
