import { useReducer } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Auth, UserInfo } from './allContext'
import AuthCheck from './components/AuthCheck/AuthCheck'
import EPrescriptionPDF from './pages/EPrescriptionPDF'
import EprescriptionPage from './pages/EprescriptionPage'
import { authReducer, authState } from './reducer/authReducer'
import { userReducer, userState } from './reducer/userReducer'
import ProtectedRoute from './routes/ProtectedRoute'

const App = () => {
    const [stateAuth, dispatchAuth] = useReducer(authReducer, authState)
    const [stateUser, dispatchUser] = useReducer(userReducer, userState)

    return (
        <div>
            {/* Router */}
            <Auth.Provider value={{ stateAuth, dispatchAuth }}>
                <UserInfo.Provider value={{ stateUser, dispatchUser }}>
                    <Router>
                        <Switch>
                            <ProtectedRoute exact={true} path="/" component={EprescriptionPage} />
                            <Route path="/ep/:hxepid" component={EPrescriptionPDF} />
                            <Route path="/auth/:token">
                                <AuthCheck />
                            </Route>
                        </Switch>
                    </Router>
                </UserInfo.Provider>
            </Auth.Provider>
        </div>
    )
}
export default App
