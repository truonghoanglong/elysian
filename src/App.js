import { useState } from 'react'
import { Header } from './components/Header'
import { ModalAddNew } from './components/ModalAddNew'
import { TableUsers } from './components/TableUsers'
import { Container } from 'react-bootstrap'

function App() {
    const [show, setShow] = useState(false)

    const handleClose = () => setShow((prev) => !prev)
    const handleShow = () => setShow((prev) => !prev)

    return (
        <div className='app-container'>
            <Header />
            <Container>
                <div className='my-3 d-flex justify-content-between'>
                    <span>
                        <b>List User</b>
                    </span>
                    <button className='btn btn-success' onClick={handleShow}>
                        Add new user
                    </button>
                </div>
                <TableUsers />
            </Container>
            <ModalAddNew
                show={show}
                handleClose={handleClose}
                handleShow={handleShow}
            />
        </div>
    )
}

export default App
