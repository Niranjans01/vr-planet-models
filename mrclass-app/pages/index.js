"use client";
import Login from '@/components/Login'
import Register from '@/components/Register';
import React, { useState } from 'react'

export default function Home() {
  const [display, setDisplay] = useState('login')

  return (
    <div className='flex w-full h-[100vh] bg-[#CCC] items-center justify-center'>
      {display === 'login' && <Login navigate={() => setDisplay('register')} />}
      {display === 'register' && <Register navigate={() => setDisplay('login')} />}
    </div>
  )
}
