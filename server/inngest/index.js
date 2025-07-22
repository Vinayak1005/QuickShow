import { Inngest } from "inngest";
import User from '../models/User.js';
import connectDB from '../configs/db.js';  // ✅ IMPORT DB CONNECTION

export const inngest = new Inngest({ id: "quickstore-app" });

export const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk.user.created" },
  async ({ event }) => {
    console.log("🟢 Inngest event received:", event);

    try {
      // ✅ CONNECT TO DB HERE
      await connectDB();

      const { id, first_name, last_name, email_addresses, image_url } = event.data;

      const user = await User.findByIdAndUpdate(
        id,
        {
          _id: id,
          name: `${first_name} ${last_name}`,
          email: email_addresses?.[0]?.email_address || '',
          image: image_url || '',
        },
        { upsert: true, new: true }
      );

      console.log("✅ User saved to DB:", user);

      return { message: "User synced", user };
    } catch (error) {
      console.error("❌ Error syncing user:", error);
      throw error;
    }
  }
);

export const functions = [syncUserCreation];
