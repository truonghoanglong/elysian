import React, { useEffect, useState } from 'react'
import Table from 'react-bootstrap/Table'
import { fetchAllUser } from '../services/UserService'
import ReactPaginate from 'react-paginate'
import { ModalAddNew } from './ModalAddNew'
import { ModalEditUser } from './ModalEditUser'
import { ModelComfirm } from './ModalComfirm'
import _ from 'lodash'
import { debounce } from 'lodash'
import { CSVLink } from 'react-csv'
import Papa from 'papaparse'
import { toast } from 'react-toastify'

export const TableUsers = () => {
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [totalPages, setTotalPages] = useState(0)
    const [show, setShow] = useState(false)
    const [showModalEdit, setShowModelEdit] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [dataUserEdit, setDataUserEdit] = useState({})
    const [dataUserDelete, setDataUserDelete] = useState({})
    const [sortBy, setSortBy] = useState('asc')
    const [fieldSort, setfieldSort] = useState('id')

    const handleSort = (sortBy, fieldSort) => {
        setSortBy(sortBy)
        setfieldSort(fieldSort)
        let cloneData = _.cloneDeep(data)
        cloneData = _.orderBy(cloneData, [fieldSort], [sortBy])
        setData(cloneData)
    }

    useEffect(() => {
        getUsers()
    }, [])

    const handleClose = () => {
        setShowModelEdit(false)
        setShow(false)
        setShowDelete(false)
    }

    const handleShow = () => setShow(true)
    const handleShowModelEdit = (item) => {
        setShowModelEdit(true)
        setDataUserEdit(item)
    }

    const handleShowModelDelete = (user) => {
        setShowDelete(true)
        setDataUserDelete(user)
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

    const handleDeleteUserFromModal = (user) => {
        let cloneData = _.cloneDeep(data)
        cloneData = cloneData.filter((item) => item.id !== user.id)
        setData(cloneData)
    }

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

    const handleOnChangeKeyword = debounce((event) => {
        let key = event.target.value
        if (key) {
            console.log('crack')
            let cloneData = _.cloneDeep(data)
            cloneData = cloneData.filter((item) => item.email.includes(key))
            setData(cloneData)
        } else {
            getUsers(1)
        }
    }, 500)

    const handleimportCSV = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            let file = event.target.files[0]

            if (file.type !== 'text/csv') {
                toast.error('only accept csv file...')
            }

            Papa.parse(file, {
                // header: true,
                complete: function (results) {
                    let rawCSV = results.data
                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 5) {
                            if (
                                rawCSV[0][0] !== 'id' ||
                                rawCSV[0][1] !== 'email' ||
                                rawCSV[0][2] !== 'first_name' ||
                                rawCSV[0][3] !== 'last_name' ||
                                rawCSV[0][4] !== 'avatar'
                            ) {
                                toast.error('Wrong found header on CSV file !')
                            } else {
                                let result = []
                                rawCSV.map((item, index) => {
                                    if (index > 0) {
                                        let obj = {}
                                        obj.id = item[0]
                                        obj.email = item[1]
                                        obj.first_name = item[2]
                                        obj.last_name = item[3]
                                        obj.avatar = item[4]
                                        result.push(obj)
                                    }
                                })
                                setData(result)
                            }
                        } else {
                            toast.error('Wrong found data on CSV file !!')
                        }
                    } else {
                        toast.error('Not found data on CSV file !!!')
                    }
                }
            })
        }
    }

    return (
        <>
            <div className='my-3 d-flex justify-content-between'>
                <span>
                    <b>List User</b>
                </span>
                <div className=''>
                    <label
                        htmlFor='import'
                        type='button'
                        className='btn btn-warning'
                    >
                        <i className='fa-solid fa-file-import mx-1'></i>
                        Import
                    </label>
                    <input
                        type='file'
                        id='import'
                        hidden
                        onChange={(event) => {
                            handleimportCSV(event)
                        }}
                    />

                    <CSVLink
                        className='btn btn-info mx-1'
                        data={data}
                        filename={'dataUser.csv'}
                    >
                        <i className='fa-solid fa-download mx-1'></i>
                        Export
                    </CSVLink>
                    <button
                        className='btn btn-success mx-1'
                        onClick={handleShow}
                    >
                        <i className='fa-solid fa-plus'></i>
                        Add new user
                    </button>
                </div>
            </div>
            <div className='col-4 my-3'>
                <input
                    className='form-control'
                    type='text'
                    placeholder='Search user by email'
                    onChange={(event) => handleOnChangeKeyword(event)}
                />
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>
                            <div className='d-flex justify-content-around'>
                                <span>#</span>
                                <span>
                                    <i
                                        className='fa-solid fa-arrow-up'
                                        onClick={() => handleSort('desc', 'id')}
                                    ></i>
                                    <i
                                        className='fa-solid fa-arrow-down'
                                        onClick={() => handleSort('esc', 'id')}
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>
                            <div className='d-flex justify-content-around'>
                                <span>Email</span>
                                <span>
                                    <i
                                        className='fa-solid fa-arrow-up'
                                        onClick={() =>
                                            handleSort('desc', 'email')
                                        }
                                    ></i>
                                    <i
                                        className='fa-solid fa-arrow-down'
                                        onClick={() =>
                                            handleSort('esc', 'email')
                                        }
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>
                            <div className='d-flex justify-content-around'>
                                <span>Frist Name</span>
                                <span>
                                    <i
                                        className='fa-solid fa-arrow-up'
                                        onClick={() =>
                                            handleSort('desc', 'first_name')
                                        }
                                    ></i>
                                    <i
                                        className='fa-solid fa-arrow-down'
                                        onClick={() =>
                                            handleSort('esc', 'first_name')
                                        }
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th>
                            <div className='d-flex justify-content-around'>
                                <span>Last Name</span>
                                <span>
                                    <i
                                        className='fa-solid fa-arrow-up'
                                        onClick={() =>
                                            handleSort('desc', 'last_name')
                                        }
                                    ></i>
                                    <i
                                        className='fa-solid fa-arrow-down'
                                        onClick={() =>
                                            handleSort('esc', 'last_name')
                                        }
                                    ></i>
                                </span>
                            </div>
                        </th>
                        <th className='d-flex justify-content-around'>
                            Action
                        </th>
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
                                        <button
                                            className='btn btn-danger'
                                            onClick={() =>
                                                handleShowModelDelete(item)
                                            }
                                        >
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

            <ModelComfirm
                showDelete={showDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                data={data}
                setData={setData}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />
        </>
    )
}
