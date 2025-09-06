import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please provide a username"],
    unique: true
  },
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true
  },
  password: {
    type: String,
    required: [true, "Please provide a password"]
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  forgotPasswordToken: {
    type: String
  },
  forgotPasswordTokenExpiry: {
    type: Date
  },
  verifyToken: {
    type: String
  },
  verifyTokenExpiry: {
    type: Date
  }
});

// Avoid recompiling model if already defined (important for hot reloads in Next.js)
const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
