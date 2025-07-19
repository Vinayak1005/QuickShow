import { Inngest } from "inngest";
import User from "../models/User.js";

// Create Inngest client
export const inngest = new Inngest({ id: "movie-ticket-booking" });

// User Created
const syncUserCreation = inngest.createFunction(
  { id: "sync-user-from-clerk" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      _id: id,
      email: email_addresses[0].email_address,
      name: first_name + ' ' + last_name,
      image: image_url,
    };

    try {
      await User.create(userData);
      return { status: "User created in MongoDB", userId: id };
    } catch (err) {
      if (err.code === 11000) {
        return { status: "User already exists", userId: id };
      } else {
        throw err;
      }
    }
  }
);

// User Deleted
const syncUserDeletion = inngest.createFunction(
  { id: "delete-user-with-clerk" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    const { id } = event.data;
    await User.findByIdAndDelete(id);
    return { status: "User deleted from MongoDB", userId: id };
  }
);

// User Updated
const syncUserUpdation = inngest.createFunction(
  { id: "update-user-with-clerk" },
  { event: "clerk/user.updated" },
  async ({ event }) => {
    const { id, first_name, last_name, email_addresses, image_url } = event.data;

    const userData = {
      name: first_name + ' ' + last_name,
      email: email_addresses[0].email_address,
      image: image_url,
    };

    await User.findByIdAndUpdate(id, userData, { new: true });
    return { status: "User updated in MongoDB", userId: id };
  }
);

export const functions = [syncUserCreation, syncUserDeletion, syncUserUpdation];
