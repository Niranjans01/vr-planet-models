import Image from 'next/image'
import FormLayout from '@/components/FormLayout'
import BackIcon from './Icons/Back'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react';
import cookieCutter from 'cookie-cutter'
import GLBLoader from './Fields/GLBLoader';

export default function ClassLayout({ children, title }) {
    const router = useRouter();
    const { id } = router.query
    const [profileModel, setProfileModel] = React.useState({ local: true, url: '/images/immersive-mode.png', modelName: 'immersive-mode' })

    useEffect(() => {
        let userData = cookieCutter.get('userAuth')
        let userImage = JSON.parse(userData)
        if (userImage?.profileModel) {
            setProfileModel(
                {
                    local: false,
                    url: userImage.profileModel,
                    modelName: userImage.profileModelName,
                }
            )
        } else {
            setProfileModel({ local: true, url: '/images/immersive-mode.png', modelName: 'immersive-mode' })
        }
    }, [])

    const handleLogout = () => {
        cookieCutter.set('userAuth', '')
        router.push('/')
    }

    return (
        <div className='relative w-full h-[100vh] bg-[#CCC]'>
            {!profileModel.local && <div className='w-full h-screen '>
                <GLBLoader imageType={'w-full h-screen'} 
                modelSize={6}
                positionAspect={{
                    x: -6,
                    y: 1.4,
                    z: 6,
                }}
                modelPath={'http://localhost:3000/images/'} modelName={profileModel?.modelName} />
            </div>}
            <div className='flex fixed top-0 flex-col w-full h-[100vh] items-center justify-center gap-4'>

                <Image
                    src={"/images/immersive-mode.png"}
                    alt="Picture of the author"
                    priority={true}
                    width={100}
                    height={100}
                />

                <div className='flex flex-row gap-4 items-center cursor-pointer'>
                    {id && <BackIcon
                        color={'#FFFFFF'}
                        handleClick={() => {
                            router.back()
                        }} />}
                    <span className="text-2xl font-bold bg-white px-2 rounded-full">{title}</span>
                </div>
                <FormLayout className="gap-2 px-6 md:w-[50%] w-[90%] h-[60%] items-start">
                    {children}
                </FormLayout>
                <button onClick={handleLogout}>
                    <span className="text-black font-semibold hover:text-[#326AFB]">Sign off</span>
                </button>
            </div>
        </div>
    )
}