import { Routes, Route, Link } from 'react-router-dom'
import { Home } from '../components/Home'
import { Login } from '../components/Login'
import { PriveteRoute } from './PriveteRoute'
import { TableUsers } from '../components/TableUsers'

export const AppRoutes = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                {/* <PriveteRoute path='/users'>
                    <TableUsers />
                </PriveteRoute> */}
                <Route
                    path='/users'
                    element={
                        <PriveteRoute path='/users'>
                            <TableUsers />
                        </PriveteRoute>
                    }
                />
            </Routes>
        </div>
    )
}
