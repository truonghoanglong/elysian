import React, { useEffect, useState } from 'react'
import { loginApi } from '../services/UserService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassowrd, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        let token = localStorage.getItem('token')
        if (token) {
            navigate('/')
        }
    })

    const navigate = useNavigate()

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev)
    }

    const handleLogin = async () => {
        if (!email || !password) {
            toast.error('Email/Password is required !')
        }
        setLoading(true)
        let res = await loginApi(email, password)
        console.log('🚀 ~ file: Login.jsx:19 ~ handleLogin ~ res:', res)
        if (res && res.token) {
            localStorage.setItem('token', res.token)
            navigate('/')
            toast.success('Login success')
        } else {
            if (res && res.status === 400) {
                toast.error(res.data.error)
            }
        }
        setLoading(false)
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
                {loading && <i className='fa-solid fa-sync fa-spin'></i>}
                &nbsp;Login
            </button>
            <div className='back'>
                <i className='fa-solid fa-angles-left'></i>
                Go back
            </div>
        </div>
    )
}
