import { useContext, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Auth, UserInfo } from '../../allContext'
import classes from './AuthCheck.module.css'

const AuthCheck = () => {
    const { dispatchAuth } = useContext(Auth)
    const { dispatchUser } = useContext(UserInfo)

    const { token } = useParams()
    let history = useHistory()

    let apiV1 = process.env.REACT_APP_API_V1

    useEffect(() => {
        let redirectFunc = async () => {
            localStorage.setItem('auth', JSON.stringify({ token }))

            let authFetch = await fetch(`${apiV1}/doctors/auth`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                method: 'GET',
            })

            let authJson = await authFetch.json()

            if (authFetch.ok) {
                dispatchAuth({ type: 'token', payload: token })
                dispatchUser({ type: 'set', payload: authJson })
                history.push('/')
            }
        }
        redirectFunc()
    }, [apiV1, dispatchAuth, dispatchUser, history, token])

    return <div className={classes.AuthCheck}></div>
}

export default AuthCheck
