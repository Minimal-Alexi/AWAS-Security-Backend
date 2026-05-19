import { Request, Response } from 'express';
import { findUserByEmail, createUser, findUserById, moveMoney } from '../service/user.service';
import bcrypt from 'bcrypt';
import { NR_OF_SALTING_ROUNDS } from '../config/constants';

const registerUser = async (req: Request, res: Response) => {
    const { firstName, lastName, email, password, valuation, admin } = req.body;
    try {
        if (!firstName || !lastName || !email || !password || !valuation) {
            return res.status(400).json({ "message": "Username, email and password are required" });
        }
        let isAdmin = true;
        if(!admin){
            isAdmin = false;
        }

        if (await findUserByEmail(email)) {
            return res.status(400).json({ "message": "User with this email already exists" });
        }

        if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ "message": "Invalid email format" });
        }

        const user = await createUser(firstName,lastName, email, bcrypt.hashSync(password, NR_OF_SALTING_ROUNDS).toString(),valuation,isAdmin);
        res.status(201).json({
            "message": "User registered successfully",
            "user": user.toJSON()
        });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Failed to create user' });
    }
}

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).json({ "message": "Email and password are required" });
        }
        const user = await findUserByEmail(email);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            return res.status(401).json({ "message": "Invalid email or password" });
        }
        res.status(200).json({
            "message": "Login successful",
            "user": user.toJSON()
        });
    } catch (error) {
        console.error('Error logging in user:', error);
        res.status(500).json({ error: 'Failed to login user' });
    }
}

const transferMoney = async (req: Request, res: Response) => {
    const { userID } = req.body;

    const targetUserId = Number(req.params.targetUserId);
    const transfer = Number(req.params.transfer);

    try {
        const targetUser = await findUserById(targetUserId);

        if (!targetUser) {
            return res.status(404).json({
                message: "Couldn't find target bank account."
            });
        }

        const user = await findUserById(userID);

        if (!user) {
            return res.status(404).json({
                message: "Couldn't find your bank account."
            });
        }

        const transaction = await moveMoney(user, targetUser, transfer);

        if (!transaction) {
            return res.status(400).json({
                message: "Didn't have enough money for transaction."
            });
        }

        return res.status(200).json({
            message: "Successfully completed transfer."
        });

    } catch (error) {
        console.error('Error transferring money:', error);

        return res.status(500).json({
            error: 'Failed to transfer money.'
        });
    }
};

export { registerUser,loginUser, transferMoney };