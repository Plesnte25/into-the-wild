import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// 1. Configure environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// 2. Import dependencies AFTER configuring dotenv
import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/User.js";

// 3. Verify environment variable is loaded
console.log("MONGO_URI:", process.env.MONGO_URI ? "Loaded" : "Missing!");

// 4. Connect to MongoDB
await mongoose.connect(process.env.MONGO_URI);
console.log("MongoDB connected");

// 5. Seed admin user
try {
  const hash = await bcrypt.hash("into_wild_stays", 10);
  
  const result = await User.updateOne(
    { username: "myadmin" },
    {
      username: "myadmin",
      email: "admin@itw.com",
      role: "admin",
      password: hash,
    },
    { upsert: true }
  );

  console.log(`✅ Admin ready: ${result.upsertedId ? "Created" : "Updated"}`);
  process.exit(0);
} catch (error) {
  console.error("❌ Seed failed:", error);
  process.exit(1);
}