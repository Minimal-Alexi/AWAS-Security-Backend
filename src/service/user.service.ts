import { User } from '../models/user.model';
const pool = require('../config/database').pool;

export const findUserById = async (id: number): Promise<User | null> => {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    
    const row = result.rows[0];


    if (!row) {
        return null;
    }

    return new User(
        row.user_id,
        row.first_name,
        row.last_name,
        row.email,
        row.password,
        row.valuation,
        row.admin
    );
}

export const findUserByEmail = async (email: string): Promise<User | null> => {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    
    const row = result.rows[0];

    if (!row) {
        return null;
    }

    return new User(
        row.user_id,
        row.first_name,
        row.last_name,
        row.email,
        row.password,
        row.valuation,
        row.admin
    );
}

export const createUser = async (firstName:string,
     lastName:string,
     email:string,
     password: string,
     valuation: number,
     admin:boolean): Promise<User> => {
    const result = await pool.query(
        'INSERT INTO users (first_name,last_name, email, password,valuation,admin) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [firstName, lastName, email, password, valuation, admin]
    );
    
    const row = result.rows[0];

    return new User(
        row.user_id,
        row.first_name,
        row.last_name,
        row.email,
        row.password,
        row.valuation,
        row.admin
    );
}
export const updateUser = async (
    userId: number,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    valuation: number,
    admin: boolean
): Promise<User> => {

    const result = await pool.query(
        `UPDATE users
         SET first_name = $1,
             last_name = $2,
             email = $3,
             password = $4,
             valuation = $5,
             admin = $6
         WHERE user_id = $7
         RETURNING *`,
        [firstName, lastName, email, password, valuation, admin, userId]
    );

    const row = result.rows[0];

    return new User(
        row.user_id,
        row.first_name,
        row.last_name,
        row.email,
        row.password,
        row.valuation,
        row.admin
    );
};

export const moveMoney = async(startUser:User, targetUser:User, transfer:number):Promise<boolean> => {
    if(startUser.valuation - transfer < 0){
        return false;
    }

    startUser.valuation = startUser.valuation - transfer;
    targetUser.valuation = targetUser.valuation + transfer;

    await updateUser(startUser.id,
        startUser.firstName,
        startUser.lastName,
        startUser.email,
        startUser.password,
        startUser.valuation,
        startUser.admin);
    
    await updateUser(targetUser.id,
        targetUser.firstName,
        targetUser.lastName,
        targetUser.email,
        targetUser.password,
        targetUser.valuation,
        targetUser.admin);

    return true;
}