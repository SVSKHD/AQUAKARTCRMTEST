import mongoose from 'mongoose';


// Address Sub-document Schema
const AddressSchema = new Schema({
    street: String,
    city: String,
    state: String,
    zip: String,
    country: String
});

const UserSchema = new Schema({
    name:{
     type:String
    },
    username: {
        type: String,
    },
    role: {
        type: "String",
        default: "user"
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: { // Store a hashed password, never store plain text passwords
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    addresses: [AddressSchema],
    referral: String,
    profilePic: String
});

const AquaUser =
    mongoose.models.AquaUser ||
    mongoose.model("AquaUser", UserSchema);

export default AquaUser