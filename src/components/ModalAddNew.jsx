import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { postCreatUser } from '../services/UserService'
import { toast } from 'react-toastify'

export const ModalAddNew = (props) => {
    const { handleClose, show, handleUpdateTable } = props
    const [name, setName] = useState('')
    const [job, setJob] = useState('')

    const handleSaveUser = async () => {
        let res = await postCreatUser(name, job)

        if (res && res.id) {
            handleClose()
            setName('')
            setJob('')
            toast.success('A user is cread assess')
            handleUpdateTable({ first_name: name, id: res.id })
        } else {
            //error
        }
    }

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <form>
                            <div className='mb-3'>
                                <label className='form-label'>Name</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={name}
                                    onChange={(event) =>
                                        setName(event.target.value)
                                    }
                                />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Job</label>
                                <input
                                    type='text'
                                    className='form-control'
                                    value={job}
                                    onChange={(event) =>
                                        setJob(event.target.value)
                                    }
                                />
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant='primary' onClick={() => handleSaveUser()}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
