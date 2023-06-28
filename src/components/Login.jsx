import React, { useState } from 'react'

export const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassowrd, setShowPassword] = useState(false)

    const handleShowPassword = () => {
        setShowPassword((prev) => !prev)
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
