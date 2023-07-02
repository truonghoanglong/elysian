import { useContext } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { UserContext } from '../context/UserContext'
import Alert from 'react-bootstrap/Alert'

export const PriveteRoute = (props) => {
    const { user, loginContext } = useContext(UserContext)

    if (user && !user.auth) {
        return (
            <>
                <Alert variant='danger' className='mt-5'>
                    <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                    <p>You dont't have permisson to acess this route.</p>
                </Alert>
            </>
        )
    }

    return <>{props.children}</>
}
