import { createAttendance, getAllAttendance, hasAttended } from "@/components/utils/attendance"
import moment from "moment"

export default function handler(req, res) {
    if (req.method === "POST") {
        const { uid, classId } = req.body
        hasAttended({ uid, date: moment().format('YYYY-MM-DD') }).then((user) => {
            console.log(user, "user")
            if (!user) {
                createAttendance({ uid, classId }).then((attendance) => {
                    res.status(200).json({ attendance, message: 'Successfully Attended', success: true })
                }).catch((error) => {
                    res.status(500).json({ message: 'Invalid Attempt', error, success: false })
                }
                )
            }
            else {
                res.status(500).json({ message: "Invalid Attempt", success: false })
            }
        })
    }

    if (req.method === "GET") {
        getAllAttendance().then((attendance) => {
            res.status(200).json({ attendance, success: true });
        }
        ).catch((error) => {
            res.status(500).json({ message: "Invalid Attempt", error, success: false })
        }
        )
    }
}
