import React, { useContext, useEffect, useState } from 'react'
import { loginApi } from '../services/UserService'
import { toast } from 'react-toastify'
import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/UserContext'

export const Login = () => {
    const { loginContext } = useContext(UserContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassowrd, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // useEffect(() => {
    //     let token = localStorage.getItem('token')
    //     if (token) {
    //         navigate('/')
    //     }
    // })

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
            loginContext(email, res.token)
            navigate('/')
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
            <div className='text'>Email or UserNam (eve.holt@reqres.in)</div>
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
                <Link to='/' style={{ color: 'black', textDecoration: 'none' }}>
                    Go back
                </Link>
            </div>
        </div>
    )
}
