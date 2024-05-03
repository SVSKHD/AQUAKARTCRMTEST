import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  username: {
    type: String,
  },
  role: {
    type: "String",
    default: "user",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    // Store a hashed password, never store plain text passwords
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  addresses: [
    {
      street: String,
      city: String,
      state: String,
      zip: String,
      country: String,
    },
  ],
  referral: String,
  profilePic: String,
  token: String,
});

UserSchema.pre("save", function (next) {
  // Check if the email is set and the username is not set
  if (this.email && !this.username) {
    const parts = this.email.split("@");
    this.username = parts[0]; // Set the username to the part before the '@'
  }
  next();
});
const AquaUser =
  mongoose.models.AquaUser || mongoose.model("AquaUser", UserSchema);

export default AquaUser;
