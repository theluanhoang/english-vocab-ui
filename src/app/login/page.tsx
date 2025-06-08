'use client';

import LoginForm from '@/components/organisms/LoginForm'
import React from 'react'

function Login() {
  return (
    <div className='container mx-auto flex items-center justify-center'>
        <div className='mt-30'>
            <LoginForm />
        </div>
    </div>
  )
}

export default Login