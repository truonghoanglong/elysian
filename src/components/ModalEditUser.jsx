import { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { PutUpdateUser } from '../services/UserService'
import { toast } from 'react-toastify'

export const ModalEditUser = (props) => {
    const {
        handleClose,
        showModalEdit,
        dataUserEdit,
        handleEditUserFromModal
    } = props
    const [name, setName] = useState('')
    const [job, setJob] = useState('')

    const handleEditUser = async () => {
        const res = await PutUpdateUser(name, job)
        if (res && res.updatedAt) {
            handleEditUserFromModal({
                first_name: name,
                id: dataUserEdit.id
            })
        }
        console.log(res)
    }

    useEffect(() => {
        if (showModalEdit) {
            setName(dataUserEdit.first_name)
            setJob(dataUserEdit.last_name)
        }
    }, [dataUserEdit])

    return (
        <>
            <Modal show={showModalEdit} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit User</Modal.Title>
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
                    <Button variant='primary' onClick={() => handleEditUser()}>
                        Comfirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
