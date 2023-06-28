import React from 'react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import { useLocation, NavLink } from 'react-router-dom'

export const Header = () => {
    let location = useLocation()
    return (
        <div>
            <Navbar bg='light' expand='lg'>
                <Container>
                    <Navbar.Brand href='/'>Long</Navbar.Brand>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='me-auto' activeKey={location.pathname}>
                            <NavLink className='nav-link' to='/'>
                                Home
                            </NavLink>
                            <NavLink className='nav-link' to='/users'>
                                Manager Users
                            </NavLink>
                        </Nav>
                        <Nav>
                            <NavDropdown
                                title='Setting'
                                id='basic-nav-dropdown'
                            >
                                <NavDropdown.Item href='/login'>
                                    Login
                                </NavDropdown.Item>
                                <NavDropdown.Item href='/logout'>
                                    Log Out
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
