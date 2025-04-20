import { createCourse, deleteCourse, getAllCourses, updateCourses } from "@/components/utils/course";

export default function handler(req, res) {
    if (req.method === "GET" && !req.query.id) {
        getAllCourses().then((courses) => {
            res.status(200).json({ courses, success: true });
        }
        ).catch((error) => {
            res.status(500).json({ message: "Invalid Attempt", error, success: false })
        }
        )
    }
    else if (req.method === "POST") {
        createCourse(req.body).then((course) => {
            res.status(200).json({ course, success: true });
        }
        ).catch((error) => {
            res.status(500).json({ message: "Invalid Attempt", error, success: false })
        })
    }
    else if (req.method === "PUT") {
        updateCourses(req.body).then((course) => {
            res.status(200).json({ course, success: true });
        }
        ).catch((error) => {
            res.status(500).json({ message: "Invalid Attempt", error, success: false })
        })
    }
    else if (req.method === "DELETE") {
        deleteCourse(req.body).then((course) => {
            res.status(200).json({ course, success: true });
        }
        ).catch((error) => {
            res.status(500).json({ message: "Invalid Attempt", error, success: false })
        })
    }
    else {
        res.status(500).json({ message: "Invalid Attempt", success: false })
    }
}