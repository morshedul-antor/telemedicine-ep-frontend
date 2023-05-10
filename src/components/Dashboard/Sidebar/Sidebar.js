import { faClosedCaptioning, faCommentMedical, faStethoscope, faPills } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useEffect, useState } from 'react'
import { FieldContext, UserInfo } from '../../../allContext'
import docImg from '../../../assets/img/doctor.png'
import classes from './Sidebar.module.css'
import SubmitEP from './SubmitEP/SubmitEP'

const Sidebar = () => {
    const { state, dispatch } = useContext(FieldContext)
    const { stateUser } = useContext(UserInfo)

    const [details, setDetails] = useState({})
    const [picture, setPicture] = useState({})

    const apiV1 = process.env.REACT_APP_API_V1

    useEffect(() => {
        const detailFunc = async () => {
            const detailFetch = await fetch(`${apiV1}/doctors/detail/${stateUser.info.id}`, {
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                dataType: 'json',
                origin: '*',
                method: 'GET',
            })

            if (detailFetch.ok) {
                const detailJson = await detailFetch.json()
                setDetails(detailJson)
            }
        }
        try {
            detailFunc()
        } catch (e) {}
    }, [apiV1, stateUser])

    useEffect(() => {
        const fetchData = async () => {
            let response = await fetch(`${apiV1}/profile-pic/${stateUser.info.id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })
            let data = await response.json()

            if (response.ok) {
                setPicture(data.image_string)
            } else {
                setPicture({ image_string: null })
            }
        }

        try {
            fetchData()
        } catch {
            fetchData({ image_string: null })
        }
    }, [apiV1, stateUser])

    const profile = `${apiV1}/images/profile/${picture}`

    return (
        <div className={classes.Sidebar}>
            <div className={classes.epLogo}>
                <p>
                    <FontAwesomeIcon icon={faStethoscope} />
                    LiveDoc
                </p>
            </div>
            {/* <div className={classes.doc}>
                <div
                    className={classes.docImg}
                    style={{
                        backgroundImage: `url(${picture.image_string !== null ? profile : docImg})`,
                    }}></div>
                <h3>{stateUser.info.name}</h3>
                <hr />
            </div> */}

            <ul className={classes.nav}>
                <li
                    onClick={() => dispatch({ type: 'medicine' })}
                    className={state.field === 'medicine' ? classes.active : null}>
                    <FontAwesomeIcon icon={faPills} />
                    Medicine
                </li>
            </ul>
            <SubmitEP />
        </div>
    )
}

export default Sidebar
