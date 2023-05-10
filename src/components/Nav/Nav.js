import { faAlignLeft, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext, useReducer, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SidebarContext, PatientInfo } from '../../allContext'
import epLogo from '../../assets/img/logo.png'
import { patientState, patientReducer } from '../../reducer/PatientInfoReducer'
import { consultationReducer, consultationState } from '../../reducer/causeOfConsultation'
import Patient from '../Patient/Patient'
import classes from './Nav.module.css'

const Nav = () => {
    let location = useLocation()

    const { state, dispatch } = useContext(SidebarContext)
    let h = state.expand ? 'hide' : 'unhide'

    const [stateConsultation] = useReducer(consultationReducer, consultationState)
    const [statePatient, dispatchPatient] = useReducer(patientReducer, patientState)
    const [modal, setModal] = useState(false)

    return (
        <div className={classes.Nav}>
            <PatientInfo.Provider value={{ statePatient, dispatchPatient }}>
                <div className={classes.left}>
                    {location.pathname === '/' ? (
                        <div className={classes.alignLeft} onClick={() => dispatch({ type: h })}>
                            <FontAwesomeIcon icon={faAlignLeft} />
                        </div>
                    ) : (
                        <Link to="/">
                            <img src={epLogo} alt="" />
                        </Link>
                    )}
                    <div
                        className={`${classes.patient} ${
                            statePatient.patient.name.length !== 0 ? classes.ok : classes.add
                        }`}
                        onClick={(e) => setModal(!modal)}>
                        {statePatient.patient.name && statePatient.patient.name.length !== 0 ? (
                            <>
                                <div>
                                    <FontAwesomeIcon icon={faUserCircle} />
                                    <p>
                                        {statePatient.patient.name} [{statePatient.patient.sex}]
                                        <span>{statePatient.patient.phone}</span>
                                    </p>
                                    <p>
                                        <span>
                                            Age:
                                            <b>
                                                {`  ${
                                                    statePatient.patient.year !== 0
                                                        ? statePatient.patient.year || ''
                                                        : '0'
                                                } year's, ${
                                                    statePatient.patient.month !== 0
                                                        ? statePatient.patient.month || ''
                                                        : '0'
                                                } month's`}
                                            </b>
                                        </span>
                                        <span>
                                            Blood Group: <b>{statePatient.patient.blood_group}</b>
                                        </span>
                                    </p>
                                </div>
                                <p className={classes.address}>
                                    Current Address: <span>{statePatient.patient.address}</span>
                                </p>
                            </>
                        ) : (
                            ''
                            // <FontAwesomeIcon icon={faUserPlus} />
                        )}
                    </div>
                </div>
                <div className={classes.cause}>
                    Chief Complaints: <span> {stateConsultation.consultation}</span>
                </div>

                {modal ? <Patient cross={setModal} /> : null}
            </PatientInfo.Provider>
        </div>
    )
}
export default Nav
