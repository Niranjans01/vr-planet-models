import React from "react"

const ActionButton = ({ handleClick, children, style }) => {
    return (
        <>
            <button onClick={handleClick} className={`bg-[#326AFB] text-white font-semibold py-2 px-4 rounded-md w-1/2 flex flex-row items-center justify-center gap-10 ${style}`}>
                {children}
            </button>
        </>
    )
};

export default ActionButton;
