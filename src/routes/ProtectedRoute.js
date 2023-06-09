import { useContext, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { Auth, UserInfo } from '../allContext'
import LandingPage from '../pages/LandingPage'

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const { stateAuth, dispatchAuth } = useContext(Auth)
    const { dispatchUser } = useContext(UserInfo)

    const apiV1 = process.env.REACT_APP_API_V1

    // stateAuth rerender this component
    let token = stateAuth?.token

    useEffect(() => {
        let authFunc = async () => {
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
                dispatchAuth({ type: 'auth', payload: token })
                dispatchUser({ type: 'set', payload: authJson })
            } else {
                dispatchAuth({ type: 'remove' })
                dispatchUser({ type: 'remove' })
            }
        }
        // execute the function
        try {
            authFunc()
        } catch (e) {
            dispatchAuth({ type: 'remove' })
            dispatchUser({ type: 'remove' })
        }
    }, [apiV1, dispatchAuth, dispatchUser, token])
    //(window.location.href = `${apiDoc}`)
    return (
        <div>
            {stateAuth?.auth === true ? (
                <Route {...rest} render={(props) => <Component {...rest} {...props} />} />
            ) : (
                <LandingPage />
            )}
        </div>
    )
}
export default ProtectedRoute
