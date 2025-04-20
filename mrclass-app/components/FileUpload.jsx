import React from "react"
import UploadIcon from "./Icons/Upload";

const FileUpload = (props) => {
    return (
        <div className="w-full flex flex-row gap-6 items-center">
            <button onClick={props.openGallery} className="flex w-1/3 h-16 rounded bg-[#CCC] items-center justify-center gap-2 hover:shadow-2xl">
                <UploadIcon />
            </button>
            <div className="flex w-2/3 flex-col">
                <label htmlFor="file" className="block text-gray-700 font-bold mb-2 ">Upload your 3D Avatar</label>
                <span className="text-[#326AFB7A]">* only .glb supported</span>
            </div>
            <input type="file" id="file" name="file"
                accept=".glb"
                ref={props.fileRef}
                onChange={props.handleFileUpload} className="-z-10" />
        </div>
    )
};

export default FileUpload;
