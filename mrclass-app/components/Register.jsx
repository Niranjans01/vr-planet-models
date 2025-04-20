import { useRouter } from "next/router";
import React from "react"
import ActionButton from "./Fields/ActionButton";
import GLBLoader from "./Fields/GLBLoader";
import TextField from "./Fields/TextField";
import FileUpload from "./FileUpload";
import FormLayout from "./FormLayout";
import Progress from "./Icons/Progress";

const Register = (props) => {
    const fileRef = React.useRef();
    const router = useRouter();
    const [formModel, setFormModel] = React.useState({
        email: '',
        username: '',
        password: ''
    })
    const [registrationStart, setRegistrationStart] = React.useState(false)
    const [modelName, setModelName] = React.useState(null);
    const [modelFilePath, setModelFilePath] = React.useState(null);
    const handleFileUpload = (event) => {
        let filePath = event.target.files[0];
        const form = new FormData();
        form.append('file', filePath);
        fetch('/api/fileupload', {
            method: 'POST',
            body: form
        }).then(res => res.json()).then(data => {
            console.log(data, "data uploaded");
            setModelFilePath("http://localhost:3000/images/");
            setModelName(filePath.name);
        })
    }

    const handleInput = (e) => {
        setFormModel({
            ...formModel,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = () => {
        setRegistrationStart(true)
        if(!formModel.email || !formModel.username || !formModel.password || !modelName || !modelFilePath){
            alert("Please fill all the fields");
            setRegistrationStart(false)
            return;
        }

        fetch('/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: formModel.email,
                username: formModel.username,
                password: formModel.password,
                profileModel: modelFilePath + modelName,
                profileModelName: modelName
            })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setRegistrationStart(false)
                router.reload();
            } else {
                alert(data.message)
                setRegistrationStart(false)
            }
        }
        )
    }

    return (
        <FormLayout title={'Register to your class'} className={'h-[70vh] w-[40%]'}>
            {!modelFilePath && <FileUpload openGallery={() => {
                fileRef.current.click();
            }} handleFileUpload={handleFileUpload} fileRef={fileRef} />}
            {modelFilePath && <GLBLoader modelPath={modelFilePath} modelName={modelName} />}
            <TextField type="email" name="email" placeholder={"Enter your email"} onChange={handleInput} />
            <TextField name="username" placeholder={"Enter your username"} onChange={handleInput} />
            <TextField type="password" name="password" placeholder={"Enter your password"} onChange={handleInput} />
            <ActionButton handleClick={handleRegister} style={'w-full'}>
                <span>Register</span>
                {registrationStart && <Progress color={'#FFF'} />}
            </ActionButton>
            <div className="flex flex-row items-center gap-2">
                <span>Already have an account ?</span>
                <span className="underline cursor-pointer" onClick={props.navigate}>Login.</span>
            </div>
        </FormLayout>
    )
};

export default Register;
