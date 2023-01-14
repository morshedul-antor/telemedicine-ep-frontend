import { useState, useReducer, useContext } from 'react'
import { Auth } from '../../allContext'
import { userReducer, userState } from '../../reducer/userReducer'
import classes from './HeaderUpdate.module.css'

const HeaderUpdate = ({ setter }) => {
    const apiV1 = process.env.REACT_APP_API_V1

    const [side, setSide] = useState('left')
    const [heading, setHeading] = useState('')
    const [body, setBody] = useState('')

    const [stateUser] = useReducer(userReducer, userState)
    const { stateAuth } = useContext(Auth)

    const submit = async (e) => {
        e.preventDefault()
        const updateFetch = await fetch(`${apiV1}/ep/doctor-ep-header/${stateUser.info.id}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${stateAuth.token}`,
            },
            dataType: 'json',
            origin: '*',
            method: 'PATCH',
            body: JSON.stringify({
                header_side: side,
                heading,
                body,
            }),
        })

        if (updateFetch.ok) {
            setter(false)
            window.location.reload()
        }
    }

    return (
        <div className={classes.wrapper}>
            <div className={classes.box}>
                <div className={classes.close} onClick={() => setter(false)}>
                    &times;
                </div>
                <h2>Header Update</h2>
                <div className={classes.formWrapper}>
                    <select name="" id="" value={side} onChange={(e) => setSide(e.target.value)}>
                        <option value="left">Left Side</option>
                        <option value="right">Right Side</option>
                    </select>
                    <input type="text" value={heading} onChange={(e) => setHeading(e.target.value)} />
                    <textarea
                        name=""
                        id=""
                        cols="30"
                        rows="7"
                        onChange={(e) => setBody(e.target.value)}
                        value={body}></textarea>
                    <button onClick={submit}>Update</button>
                </div>
            </div>
        </div>
    )
}

export default HeaderUpdate
