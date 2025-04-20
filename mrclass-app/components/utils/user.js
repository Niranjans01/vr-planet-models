import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import excuteQuery from './db';
import moment from 'moment';

export async function createUser({ username, password, email, profileModel, profileModelName }) {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
        .pbkdf2Sync(password, salt, 1000, 64, 'sha512')
        .toString('hex');
    const user = {
        id: uuidv4(),
        createdAt: moment().format('YYYY-MM-DD HH:mm:ss'),
        username,
        email,
        profileModel,
        profileModelName,
        hash,
        salt,
    };

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO user (uid, username, createdAt, email, profileModel, profileModelName, hash, salt) VALUES(?, ?, ?, ?, ?, ?, ?,?)',
            values: [user.id, user.username, user.createdAt.toString(),
            user.email, user.profileModel, user.profileModelName,
            user.hash, user.salt],
        });
        console.log(result);
    } catch (error) {
        console.log(error);
    }

    return user;
}


export async function findUser({ username }) {
    try {
        const result = await excuteQuery({
            query: 'SELECT * FROM user WHERE username = ?',
            values: [username],
        });
        return result[0];
    } catch (error) {
        console.log(error);
    }
}
export async function verifyHash({ hash }) {
    try {
        const result = await excuteQuery({
            query: 'SELECT * FROM user WHERE hash = ?',
            values: [hash],
        });
        return result[0];
    } catch (error) {
        console.log(error);
    }
}

export async function validatePassword(user, inputPassword) {
    const inputHash = crypto
        .pbkdf2Sync(inputPassword, user.salt, 1000, 64, 'sha512')
        .toString('hex');
    const passwordsMatch = user.hash === inputHash;
    return passwordsMatch;
}