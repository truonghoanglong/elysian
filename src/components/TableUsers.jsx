import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import Table from 'react-bootstrap/Table'
import { fetchAllUser } from '../services/UserService'

export const TableUsers = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        getUsers()
    }, [])

    const getUsers = async () => {
        let res = await fetchAllUser()
        if (res && res.data) setData(res.data.data)
    }

    return (
        <Container>
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
        </Container>
    )
}
