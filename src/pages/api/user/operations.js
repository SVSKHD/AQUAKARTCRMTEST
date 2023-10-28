import AquaUser from "@/Backend/models/user"
import brcypt from "bcrypt"
import jwt from "jsonwebtoken"

const userLogin = async () => {
    const user = await AquaUser.findOne({ email });
    if (!user) {
        throw new Error('Invalid email or password.');
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        throw new Error('Invalid email or password.');
    }

    const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1h' });
    return { message: 'Logged in successfully.', token };
}

const userSignup = async () => {
    const existingUser = await AquaUser.findOne({ email });
    if (existingUser) {
        throw new Error('User with this email already exists.');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new AquaUser({
        email,
        password: hashedPassword
    });

    await newUser.save();
    return { message: 'User registered successfully.' };
};

const userLoginEmail = () => {

}

const userSignupEmail = () => {

}


const userOperations = () => {
    return {
        userLogin,
        userSignup,
        userLoginEmail,
        userSignupEmail
    }
}


export default userOperations