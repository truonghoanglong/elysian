import { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { DeleteDataUser } from '../services/UserService'
import _ from 'lodash'
import { toast } from 'react-toastify'

export const ModelComfirm = (props) => {
    const {
        handleClose,
        showDelete,
        dataUserDelete,
        handleDeleteUserFromModal
    } = props

    const confirmDelete = async () => {
        // let dataCloneEdit = _.cloneDeep(data)
        // dataCloneEdit.filter((item) => item.id !== long.id)
        // setData(dataCloneEdit)
        // console.log(dataCloneEdit)
        // console.log(data)
        const res = await DeleteDataUser(dataUserDelete.id)
        if (res && +res.statusCode === 204) {
            handleDeleteUserFromModal(dataUserDelete)
            toast.success('Xóa thành công')
            handleClose()
        } else {
            toast.error('Lỗi !')
            handleClose()
        }
    }

    return (
        <>
            <Modal
                show={showDelete}
                onHide={handleClose}
                backdrop='static'
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='body-add-new'>
                        <h5>Bạn có muốn xóa</h5>
                        <p>Email:{dataUserDelete.email}</p>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={handleClose}>
                        Close
                    </Button>
                    <Button
                        variant='primary'
                        onClick={() => confirmDelete(dataUserDelete)}
                    >
                        Confirm
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
