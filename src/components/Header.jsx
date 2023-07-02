import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useLocation, NavLink, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { UserContext } from '../context/UserContext'

export const Header = () => {
    const { logout, user } = useContext(UserContext)

    let location = useLocation()
    const navigate = useNavigate()
    const handleLogout = () => {
        logout()
        navigate('/')
        toast.success('Logout success')
    }
    return (
        <div>
            <Navbar bg='light' expand='lg'>
                <Container>
                    <Navbar.Brand href='/'>Long</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        {(user && user.path) ||
                        window.location.pathname === '/' ? (
                            <>
                                <Nav className='me-auto'>
                                    <NavLink className='nav-link' to='/'>
                                        Home
                                    </NavLink>
                                    <NavLink className='nav-link' to='/users'>
                                        Manager Users
                                    </NavLink>
                                </Nav>
                                <Nav>
                                    {user && user.auth === true ? (
                                        <span className='nav-link'>
                                            Welcom: {user.email}
                                        </span>
                                    ) : (
                                        ''
                                    )}

                                    <NavDropdown
                                        title='Setting'
                                        id='basic-nav-dropdown'
                                    >
                                        {user && user.auth === true ? (
                                            <NavDropdown.Item
                                                onClick={() => handleLogout()}
                                                className='dropdown-item'
                                            >
                                                Log Out
                                            </NavDropdown.Item>
                                        ) : (
                                            <NavLink
                                                className='dropdown-item'
                                                to='/login'
                                            >
                                                Login
                                            </NavLink>
                                        )}
                                    </NavDropdown>
                                </Nav>
                            </>
                        ) : (
                            ''
                        )}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
