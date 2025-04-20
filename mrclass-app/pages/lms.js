import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react"
import cookie from 'cookie-cutter';
const WebSocket = typeof window === 'undefined' ? require('ws') : window.WebSocket;
const socket = new WebSocket('ws://localhost:8080');

const LMSTeacher = (props) => {
    const [course, setCourse] = React.useState([]);
    const [attendance, setAttendance] = React.useState([]);
    const [addMode, setAddMode] = React.useState('COURSE');
    const [searchAtnd, setSearchAtnd] = React.useState([]);

    React.useEffect(() => {
        Promise.all([getCourse(), getAttendance()]).then(() => {
            console.log("done");
        })
    }, [])

    const getCourse = async () => {
        const res = await fetch("http://localhost:3000/api/lms_course");
        const data = await res.json();
        console.log(data.courses, "COurse");
        setCourse(data.courses);
    }

    const getAttendance = async () => {
        const res = await fetch("http://localhost:3000/api/attend_check");
        const data = await res.json();
        setAttendance(data.attendance);
        setSearchAtnd(data.attendance);
    }

    const handleSearch = (e) => {
        const search = e.target.value;
        const filtered = searchAtnd.filter((attend) => attend?.user?.username?.toLowerCase().includes(search.toLowerCase()));
        setAttendance(filtered);
    }

    const handleLogout = (e) => {
        localStorage.removeItem("user");
        cookie.set("userAuth", "");
        window.location.href = "/";
    }

    return (
        <div className="flex flex-row w-full">
            <div className="grid grid-rows-5 w-1/4 h-screen bg-[#444] items-center justify-center">
                <div className="flex flex-col row-span-2 gap-2 items-center justify-center border-b-2 pb-10">
                    <div className="relative w-40 h-40 rounded-full bg-transparent">
                        <Image
                            src="/images/classroom.jpeg"
                            alt="Picture of the author"
                            className="rounded-full object-cover hover:animate-pulse"
                            fill={true}
                            loading="lazy"
                            sizes="100%"
                            priority={false}
                            blurDataURL="/images/classroom.jpeg"
                        />
                    </div>
                    <span className="text-white text-center font-bold text-2xl mt-4 px-10">Teacher's Menu</span>
                </div>
                <div className="flex flex-col gap-2 row-span-3">
                    <span onClick={() => setAddMode('COURSE')} className={`text-white font-bold text-2xl mt-4 ${addMode === 'COURSE' && 'bg-[#000] text-center rounded-full'}`}>All Courses</span>
                    <span onClick={() => setAddMode('ADD')} className={`text-white font-bold text-2xl mt-4 ${addMode === 'ADD' && 'bg-[#000] text-center rounded-full'}`}>Add Course</span>
                    <span onClick={() => setAddMode('ATTEND')} className={`text-white font-bold text-2xl mt-4 ${addMode === 'ATTEND' && 'bg-[#000] text-center rounded-full'}`}>Attendance</span>
                    <button onClick={handleLogout} className="text-left text-white font-bold text-2xl mt-4 rounded-full">Logout</button>
                </div>
            </div>
            {addMode === 'ADD' &&
                <AddCourse />}
            {addMode === 'COURSE' && <div className="flex flex-col w-3/4 p-10 gap-6">
                {course.map((cse) => {
                    return <CourseTable title={cse.title} subjects={cse?.subjects} />
                })
                }
            </div>}
            {
                addMode === 'ATTEND' && <div className="flex flex-col w-3/4 p-10">
                    <AttendanceTable data={attendance} changeData={handleSearch} />
                </div>
            }
        </div>
    )
};

export default LMSTeacher;


const AttendanceTable = ({ data, changeData }) => {
    return (
        <div class="container mx-auto px-4 flex flex-col py-5 gap-4">
            <span class="text-2xl font-bold">Attendance</span>
            <div className="flex w-full justify-end">
                <input type="text" onChange={changeData} placeholder="Search" class="border-2 border-gray-300 bg-white h-10 px-5 pr-16 rounded-lg text-sm focus:outline-none" />
            </div>
            <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student Name</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Class ID</th>
                    </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                    {
                        data?.map((d) => {
                            return <tr>
                                <td class="px-6 py-4 whitespace-nowrap">{d?.user?.username}</td>
                                <td class="px-6 py-4 whitespace-nowrap">{d?.date}</td>
                                <td class="px-6 py-4 whitespace-nowrap">{d?.time}</td>
                                <td class="px-6 py-4 whitespace-nowrap">{d?.classId}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
        </div>

    )
}

const AddCourse = (props) => {
    const [courseInfo, setCourseInfo] = React.useState({
        name: "",
        clid: "1",
        image: "",
        link: "",
        description: "",
    });
    const [additionStatus, setAdditionStatus] = React.useState(false);

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name === "image") {
            let filePath = e.target.files[0];
            const form = new FormData();
            form.append('file', filePath);
            fetch('/api/fileupload', {
                method: 'POST',
                body: form
            }).then(res => res.json()).then(data => {

                setCourseInfo({ ...courseInfo, [name]: filePath.name });
            })
            // setCourseInfo({ ...courseInfo, [name]: e.target.files[0] });
            return;
        }
        setCourseInfo({ ...courseInfo, [name]: value });

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setAdditionStatus(true);
        fetch("http://localhost:3000/api/lms_course", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(courseInfo),
        }).then((res) => res.json()).then((data) => {
            setAdditionStatus(false);
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        })
    }

    return (
        <div className="flex flex-col w-3/4 p-10 gap-4">
            <span className="font-semibold text-2xl">Add Course</span>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input type="text" name="name" onChange={handleInput} placeholder="Course Name" className="px-4 py-2 border-2 rounded-md" />
                <select defaultValue={'1'} name="clid" onChange={handleInput} className="px-4 py-2 rounded-md border-2">
                    <option value="1">Experience</option>
                    <option value="2">Lecture</option>
                </select>
                <input type="file" name="image" onChange={handleInput} placeholder="Image URL" className="px-4 py-2 rounded-md border-2" />
                <input type="text" name="link" onChange={handleInput} placeholder="Link" className="px-4 py-2 rounded-md border-2" />
                <input type="text" name="description" onChange={handleInput} placeholder="Description" className="px-4 py-2 rounded-md border-2" />
                <button type="submit" onClick={handleSubmit} className="px-4 py-2 rounded-md bg-[#0000009A] text-white">{additionStatus ? "Adding..." : "Add Course"}</button>
            </form>
        </div>
    )
}


const CourseTable = (props) => {

    return (
        <div className="flex flex-col w-full gap-2">
            <span className="font-semibold text-[20px] uppercase">{props.title}</span>
            <div className="flex flex-col gap-4">
                {props?.subjects.map((topics, index) => (
                    <>
                        <ContentEditor key={index} topics={topics} />
                    </>
                ))}

            </div>

        </div>
    )
}

const ContentEditor = ({ topics }) => {
    const [open, setOpen] = React.useState(false);
    const [contentInfo, setContentInfo] = React.useState({
        title: topics.title,
        link: topics.link,
        ...topics
    })
    const [userInfo, setUserInfo] = React.useState({})
    let userData = cookie.get('userAuth')

    useEffect(() => {
        if (userData) {
            setUserInfo(JSON.parse(userData))
        }
    }, [userData])

    const handleInput = (e) => {
        setContentInfo({
            ...contentInfo,
            [e.target.name]: e.target.value
        })
    }

    const handleUpdate = (index) => {
        fetch(`http://localhost:3000/api/lms_course/`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(contentInfo),
        }).then((res) => res.json()).then((data) => {
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleDelete = (index) => {
        fetch(`http://localhost:3000/api/lms_course/`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: topics.id }),
        }).then((res) => res.json()).then((data) => {
            window.location.reload();
        }).catch((error) => {
            console.log(error);
        })
    }

    const handleJoinClass = (index) => {
        socket.send(JSON.stringify(userInfo));
        window.open(topics?.link + `&id=${userInfo.uid}&classId=${topics.id}`, "_blank")
    }

    return (
        <div className="flex flex-col gap-2">
            <button onClick={() => { setOpen(!open); }} className={`relative flex col-span-1 items-center rounded-md ${open ? 'bg-[#000000]' : 'bg-[#0000009A]'}`}>
                <span className="bg-white/80  px-10 py-2 font-bold">{topics?.name}</span>
            </button>
            {open && <div className="flex flex-col shadow gap-4 p-4 rounded-md">
                <input type="text" name="link" value={contentInfo?.link} onChange={handleInput} className="w-full h-10 rounded-md border-2 p-2" />
                <div className="grid grid-cols-3 items-center gap-10">
                    <button onClick={() => handleDelete(topics)} className="bg-[#EA3A0D] text-white font-bold px-10 py-2 rounded-md">Delete Course</button>
                    <button onClick={() => handleUpdate(topics)} className="bg-[#326AFB] text-white font-bold px-10 py-2 rounded-md">Update Link</button>

                    <button onClick={handleJoinClass} className="bg-[#326AFB] text-white font-bold px-10 py-2 rounded-md">Open</button>
                </div>
            </div>}
        </div>

    )
}