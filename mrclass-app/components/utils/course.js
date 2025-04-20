import crypto from 'crypto';
import { v4 as uuidv4 } from 'uuid';
import excuteQuery from './db';
import moment from 'moment';

export async function createCourse({ name, image, description, link, clid }) {
    const course = {
        id: uuidv4(),
        name,
        image,
        description,
        link,
        clid,
    };

    try {
        const result = await excuteQuery({
            query: 'INSERT INTO courses (id, name, image, description, link, clid) VALUES(?, ?, ?, ?,?,?)',
            values: [course.id, course.name, course.image, course.description, course.link, course.clid],
        });
        return course;
    } catch (error) {
        console.log(error);
        return error;
    }
}

export async function getAllCourses() {
    try {
        const courseList = await excuteQuery({
            query: 'SELECT * FROM courses',
        });
        const classes = await excuteQuery({
            query: 'SELECT * FROM classes',
        });
        const allCourses = classes.map((cl) => {
            const courses = courseList.filter((course) => course.clid === cl.clid);
            return {
                ...cl,
                subjects: courses,
            };
        });

        return allCourses;
    } catch (error) {
        console.log(error);
    }
}

export async function updateCourses({ id, name, image, description, link, clid }) {
    try {
        const result = await excuteQuery({
            query: 'UPDATE courses SET name = ?, image = ?, description = ?, link = ?, clid = ? WHERE id = ?',
            values: [name, image, description, link, clid, id],
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}

export async function deleteCourse({ id }) {
    try {
        const result = await excuteQuery({
            query: 'DELETE FROM courses WHERE id = ?',
            values: [id],
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}