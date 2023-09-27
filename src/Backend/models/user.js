const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const addressSchema = new mongoose.Schema({
    street: String,
    city: String,
    state: String,
    postalCode: String,
});

const AquaUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        maxlength: [40, "Name should be under 40 characters"],
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        validate: [validator.isEmail, "Please enter email in correct format"],
        unique: true,
    },
    phone:{
        type:Number,

    },
 
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "password should be atleast 6 char"],
        select: false,
    },
    role: {
        type: String,
        default: "user",
    },
    photo: {
        id: {
            type: String
        },
        secure_url: {
            type: String
        },
    },
    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

//encrypt password before save - HOOKS
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
});



const AquaUser =
    mongoose.models.AquaUser ||
    mongoose.model("AquaUser", AquaUserSchema);

export default AquaUser
