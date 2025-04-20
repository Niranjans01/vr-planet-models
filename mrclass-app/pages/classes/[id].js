import ClassLayout from '@/components/classlayout'
import ActionButton from '@/components/Fields/ActionButton'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import cookieCutter from 'cookie-cutter'
const WebSocket = typeof window === 'undefined' ? require('ws') : window.WebSocket;
const socket = new WebSocket('ws://localhost:8080');
const Class = () => {
    const router = useRouter()
    const { id } = router.query
    const [userInfo, setUserInfo] = useState({})
    const [subject, setSubject] = useState();

    useEffect(() => {
        let userData = cookieCutter.get('userAuth')
        if (userData) {
            setUserInfo(JSON.parse(userData))
        }
        if (id) {
            fetch("/api/lms_course", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                }
            })
                .then((res) => res.json())
                .then((data) => {
                    let final;
                    data?.courses?.map((course) => {
                        let temp = course.subjects?.map((subject) => {
                            if (subject.id === id) {
                                final = subject
                            }
                        })
                        return temp
                    })
                    setSubject(final);
                }
                );
        }
    }, [id])

    const openLink = () => {
        socket.send(JSON.stringify(userInfo));
        window.open(subject?.link + `&id=${userInfo.uid}&classId=${id}`, "_blank")
    }

    return <ClassLayout title={subject?.name || ""}>
        <div className="flex flex-col gap-4 w-[100%] h-full items-center justify-center overflow-hidden pb-2">
            <div className='flex h-[100px] w-full items-center justify-center'>
                <ActionButton handleClick={openLink}>
                    Join {subject?.name} class
                </ActionButton>
            </div>
            <span className="text-2xl font-bold bg-white px-2 rounded-full w-full">Course contents</span>
            <div className="flex flex-col gap-4 w-[100%] overflow-y-scroll
            ">
                <span className="text-md text-[#0000007A] font-normal w-full px-2">{subject?.description}</span>
            </div>

        </div>
    </ClassLayout>
}

export default Class