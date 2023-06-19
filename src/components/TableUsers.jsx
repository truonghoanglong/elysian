import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { fetchAllUser } from '../services/UserService'
import ReactPaginate from 'react-paginate'
import { ModalAddNew } from './ModalAddNew'

export const TableUsers = () => {
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [totalPages, setTotalPages] = useState(0)

    const [show, setShow] = useState(false)

    const handleClose = () => setShow((prev) => !prev)
    const handleShow = () => setShow((prev) => !prev)

    const handleUpdateTable = (user) => {
        setData((prev) => [user, ...prev])
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
                handleShow={handleShow}
                handleUpdateTable={handleUpdateTable}
            />
        </>
    )
}
