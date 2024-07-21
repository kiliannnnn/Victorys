import bcrypt from 'bcryptjs';
import User from '$lib/server/models/user';

export async function registerUser(username, email, country, password) {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, country, password: hashedPassword });
    return { id: user.id };
}

export async function authenticateUser(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }
    return { id: user.id };
}
