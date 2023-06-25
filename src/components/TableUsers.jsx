import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { fetchAllUser } from '../services/UserService'
import ReactPaginate from 'react-paginate'
import { ModalAddNew } from './ModalAddNew'
import { ModalEditUser } from './ModalEditUser'
import _ from 'lodash'

export const TableUsers = () => {
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [show, setShow] = useState(false)
    const [showModalEdit, setShowModelEdit] = useState(false)
    const [dataUserEdit, setDataUserEdit] = useState({})

    const handleClose = () => {
        setShowModelEdit(false)
        setShow(false)
    }

    const handleShow = () => setShow(true)
    const handleShowModelEdit = (item) => {
        setShowModelEdit(true)
        setDataUserEdit(item)
    }

    const handleUpdateTable = (user) => {
        setData((prev) => [user, ...prev])
    }

    const handleEditUserFromModal = (user) => {
        let cloneData = _.cloneDeep(data)
        let index = data.findIndex((item) => item.id === user.id)
        cloneData[index].first_name = user.first_name
        cloneData[index].last_name = user.last_name
        setData(cloneData)
    }

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async (page) => {
        let res = await fetchAllUser(page)
        if (res && res.data) {
            setData(res.data)
            setTotal(res.total)
            setTotalPages(res.total_pages)
        }
    }

    const handlePageClick = (event) => {
        getUsers(+event.selected + 1)
    }

    return (
        <>
            <div className='my-3 d-flex justify-content-between'>
                <span>
                    <b>List User</b>
                </span>
                <button className='btn btn-success' onClick={handleShow}>
                    Add new user
                </button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Email</th>
                        <th>Frist Name</th>
                        <th>Last Name</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.length > 0 &&
                        data.map((item) => {
                            return (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.email}</td>
                                    <td>{item.first_name}</td>
                                    <td>{item.last_name}</td>
                                    <td>
                                        <button
                                            className='btn btn-warning mx-3'
                                            onClick={() =>
                                                handleShowModelEdit(item)
                                            }
                                        >
                                            Edit
                                        </button>
                                        <button className='btn btn-danger'>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </Table>
            <ReactPaginate
                breakLabel='...'
                nextLabel='next >'
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel='< previous'
                renderOnZeroPageCount={null}
                pageClassName='page-item'
                pageLinkClassName='page-link'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                breakLinkClassName='page-link'
                containerClassName='pagination'
                activeClassName='active'
            />
            <ModalAddNew
                show={show}
                handleClose={handleClose}
                handleUpdateTable={handleUpdateTable}
            />

            <ModalEditUser
                showModalEdit={showModalEdit}
                handleClose={handleClose}
                dataUserEdit={dataUserEdit}
                handleEditUserFromModal={handleEditUserFromModal}
            />
        </>
    )
}
