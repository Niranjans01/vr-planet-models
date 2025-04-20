import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import excuteQuery from './db';
import moment from 'moment';

export async function createAttendance({ uid, classId }) {
    const attendance = {
        aid: uuidv4(),
        date: moment().format('YYYY-MM-DD'),
        time: moment().format('HH:mm:ss'),
        uid,
        classId,
    };

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO attendance (aid, date, time, uid, classId) VALUES(?, ?, ?, ?,?)',
            values: [attendance.aid, attendance.date.toString(),
            attendance.time.toString(), attendance.uid, attendance.classId],
        });
        console.log(result);
    } catch (error) {
        console.log(error);
    }

    return attendance;
}

export async function getAllAttendance() {
    try {
        const result = await excuteQuery({
            query: 'SELECT * FROM attendance',
        });
        const users = await excuteQuery({
            query: 'SELECT * FROM user',
        });
        const studentsAttended = result.map((attendance) => {
            const user = users.find((user) => user.uid === attendance.uid);
            return {
                ...attendance,
                user,
            };
        });
        return studentsAttended;
    } catch (error) {
        console.log(error);
    }
}

export async function getAttendanceByUid({ uid }) {
    try {
        const result = await excuteQuery({
            query: 'SELECT * FROM attendance WHERE uid = ?',
            values: [uid],
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function hasAttended({ uid, date }) {
    try {
        const result = await excuteQuery({
            query: 'SELECT * FROM attendance WHERE uid = ? AND date = ?',
            values: [uid, date],
        });
        return result?.length > 0 ? true : false;
    } catch (error) {
        console.log(error);
    }
}