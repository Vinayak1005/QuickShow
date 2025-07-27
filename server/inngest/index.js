import { Inngest } from "inngest";
import User from "../models/User.js";

// Create Inngest client
export const inngest = new Inngest({ id: "movie-ticket-booking" });

/**
 * Utility function for safe user updates
 */
const formatUserData = ({ id, first_name, last_name, email_addresses, image_url }) => ({
  _id: id, 
  email: email_addresses?.[0]?.email_address || '',
  name: `${first_name} ${last_name}`,
  image: image_url,
});

/**
 * Clerk: User Created
 */
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    try {
      const userData = formatUserData(event.data);
      await User.findByIdAndUpdate(userData._id, userData, { upsert: true, new: true });
      console.log(`✅ User created: ${userData._id}`);
      return userData;
    } catch (error) {
      console.error("❌ Error creating user:", error);
      throw error;
    }
  }
);

/**
 * Clerk: User Updated
 */
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-with-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    try {
      const { id } = event.data;
      const userData = formatUserData(event.data);
      await User.findByIdAndUpdate(id, userData, { new: true });
      console.log(`🔄 User updated: ${id}`);
      return userData;
    } catch (error) {
      console.error("❌ Error updating user:", error);
      throw error;
    }
  }
);

/**
 * Clerk: User Deleted
 */
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    try {
      const { id } = event.data;
      await User.findByIdAndDelete(id);
      console.log(`🗑️ User deleted: ${id}`);
      return { deleted: true };
    } catch (error) {
      console.error("❌ Error deleting user:", error);
      throw error;
    }
  }
);

// Export all functions as an array
export const functions = [syncUserCreation, syncUserUpdation, syncUserDeletion];
