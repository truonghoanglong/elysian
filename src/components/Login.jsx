import React, { useState } from 'react'
import { loginApi } from '../services/UserService'
import { toast } from 'react-toastify'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassowrd, setShowPassword] = useState(false)

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev)
    }

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Email/Password is required !')
        }
        let res = await loginApi(email, password)
        console.log('🚀 ~ file: Login.jsx:19 ~ handleLogin ~ res:', res)
        if (res && res.token) {
            localStorage.setItem('token', res.token)
        }
    }

    return (
        <div className='login-container col-12 col-sm-4'>
            <div className='title'>Login</div>
            <div className='text'>Email or UserNam</div>
            <input
                type='text'
                placeholder='Email or usernam...'
                value={email}
                onChange={(event) => {
                    setEmail(event.target.value)
                }}
            />
            <div className='input-password'>
                <input
                    type={showPassowrd ? 'text' : 'password'}
                    placeholder='Password'
                    value={password}
                    onChange={(event) => {
                        setPassword(event.target.value)
                    }}
                />
                <i
                    className={
                        showPassowrd
                            ? 'fa-solid fa-eye'
                            : 'fa-sharp fa-solid fa-eye-slash'
                    }
                    onClick={() => handleShowPassword()}
                ></i>
            </div>
            <button
                className={email && password ? 'active' : ''}
                disabled={email && password ? false : true}
                onClick={() => handleLogin(email, password)}
            >
                Login
            </button>
            <div className='back'>
                <i className='fa-solid fa-angles-left'></i>
                Go back
            </div>
        </div>
    )
}
