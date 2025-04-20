"use client";
import ClassLayout from "@/components/classlayout";
import FormLayout from "@/components/FormLayout";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react"

const classroom = () => {
  const router = useRouter();
  const [classroom, setClassroom] = React.useState();

  React.useEffect(() => {
    fetch("/api/lms_course", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.courses, "data");
        setClassroom(data?.courses);
      }
      );

  }, [])

  const handleRoute = (id) => {
    router.push(`/classes/${id}`)
  }

  return (
    <ClassLayout title={"Welcome to miXed reality classes"}>
      <div className="grid grid-rows-2 w-full gap-4 h-full pb-10">
        {classroom?.map((classes, index) => (
          <div key={index} className={`flex flex-col gap-2 row-span-1`}>
            <span className="font-semibold">Class : {classes.title}</span>
            <div className="grid grid-cols-2 gap-4 w-full h-full">
              {classes?.subjects.map((topics, index) => (
                <button onClick={() => handleRoute(topics.id)} key={index} className="relative flex col-span-1 bg-[#326AFB] items-center justify-center rounded-md">
                  <Image
                    src={'/images/'+topics.image}
                    alt="Picture of the author"
                    className="rounded-md object-cover hover:animate-pulse"
                    fill={true}
                    loading="lazy"
                    sizes="100%"
                    priority={false}
                    blurDataURL={'/images/'+topics.image}
                  />
                  <span className="bg-white/80  absolute px-10 py-2 rounded-full font-bold">{topics.name}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </ClassLayout>
  )
};

export default classroom;
