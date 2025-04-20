import { useRouter } from "next/router";
import React, { useState } from "react"
import ActionButton from "./Fields/ActionButton";
import TextField from "./Fields/TextField";
import FormLayout from "./FormLayout";
import cookieCutter from 'cookie-cutter'
import Progress from "./Icons/Progress";

const Login = (props) => {
    const [formModel, setFormModel] = useState({
        username: '',
        password: ''
    })
    const [loginStart, setLoginStart] = useState(false)
    const router = useRouter();

    const handleLogin = () => {
        setLoginStart(true)
        console.log(formModel)
        if (!formModel.username || !formModel.password) {
            alert("Please fill all the fields");
            setLoginStart(false)
            return;
        }
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: formModel.username,
                password: formModel.password
            })
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.success) {
                    // localStorage.setItem('user', JSON.stringify(data.user))
                    cookieCutter.set('userAuth', JSON.stringify(data.user), { expires: new Date(Date.now() + 86400000) })
                    setTimeout(() => {
                        setLoginStart(false)
                        if (data.user.role === 'teacher') {
                            router.push('/lms')
                        } else if (data.user.role === 'student') {
                            router.push('/classes')
                        } else {
                            router.push('/')
                            alert("INVALID ATTEMPT \n Please check your credentials")
                        }
                    }, 2000)

                } else {
                    alert(data.message || "Please check you database connection")
                    setLoginStart(false)
                }
            }).catch(err => {
                console.log(err)
                setLoginStart(false)
            })
    }

    const handleInput = (e) => {
        setFormModel({
            ...formModel,
            [e.target.name]: e.target.value
        })
    }


    return (
        <FormLayout title={'Login to your class'}>
            <TextField name="username" onChange={handleInput} placeholder={"Enter your username"} />
            <TextField name="password" onChange={handleInput} type="password" placeholder={"Enter your password"} />
            <ActionButton handleClick={handleLogin} style={'w-full'}>
                <span>LOGIN</span>
                {loginStart && <Progress color={'#FFF'} />}
            </ActionButton>
            <div className="flex flex-row items-center gap-[3px]">
                <span>New here? Create an account</span>
                <span className="underline cursor-pointer" onClick={props.navigate}>here</span>
            </div>
        </FormLayout>
    )
};

export default Login;
