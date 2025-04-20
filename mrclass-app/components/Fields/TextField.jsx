import React from "react"

const TextField = (props) => {
    return <input type={props.type} name={props.name} value={props.value} onChange={props.onChange}
        placeholder={props.placeholder}
        className={`flex appearance-none border-none rounded-md bg-[#CCCCCC3A] w-full py-3 px-3 leading-tight focus:outline-none focus:shadow-outline ${props.className}`}
    />
};

export default TextField;
