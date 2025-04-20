import React from "react"

const FormLayout = (props) => {
    return (
        <div className={`flex flex-col gap-8 md:w-1/4 bg-white shadow-2xl h-[50vh] px-10 items-center justify-center border-[1px] border-[#000]
        ${props.className}`}>
            <span className="text-2xl font-bold text-center">
                {props.title}
            </span>
            {props.children}
        </div>
    )
};

export default FormLayout;
