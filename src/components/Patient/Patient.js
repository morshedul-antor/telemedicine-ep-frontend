import { useContext, useState, useEffect, useReducer } from 'react'
import { PatientInfo, Auth } from '../../allContext'
import { getWithAuthToken } from '../../api/get'
import { consultationReducer, consultationState } from '../../reducer/causeOfConsultation'
import { dob } from '../../utils/DateOfBirth'
import classes from './Patient.module.css'
import PatientSearch from './PatientSearch/PatientSearch'

const Patient = ({ cross }) => {
    const { statePatient, dispatchPatient } = useContext(PatientInfo)
    const { stateAuth } = useContext(Auth)

    const [stateConsultation, dispatchConsultation] = useReducer(consultationReducer, consultationState)

    // const [cause, setCause] = useState(statePatient.patient.cause_of_consultation || '')
    const [name, setName] = useState(statePatient.patient.name || '')
    const [phone, setPhone] = useState(statePatient.patient.phone || '')
    const [sex, setSex] = useState(statePatient.patient.sex || 'not selected')
    const [group, setGroup] = useState(statePatient.patient.blood_group || 'not selected')

    const [year, setYear] = useState(statePatient.patient.year === 0 ? 0 : statePatient.patient.year || '')
    const [month, setMonth] = useState(statePatient.patient.month === 0 ? 0 : statePatient.patient.month || '')
    const [address, setAddress] = useState(statePatient.patient.address || '')

    const [searchResult, setSearchResult] = useState([])
    const [hide, setHide] = useState(false)

    const apiV1 = process.env.REACT_APP_API_V1
    const token = stateAuth.token

    useEffect(() => {
        getWithAuthToken(`${apiV1}/ep/patient-search?name=${name}&skip=0&limit=10`, token)
            .then((data) => {
                setSearchResult(data)

                setPhone(statePatient.patient.phone)
                setSex(statePatient.patient.sex)
                setAddress(statePatient.patient.address)
                setGroup(statePatient.patient.blood_group)
                if (statePatient.patient.dob && statePatient.patient.dob.length !== 0) {
                    const [y, m] = dob(statePatient.patient.dob)
                    setYear(y)
                    setMonth(m)
                }
            })
            .catch((e) => {})
    }, [name, token, apiV1, statePatient.patient.dob, statePatient])

    const patientSet = (e) => {
        const patientInfo = {
            id: statePatient.patient.id,
            name: name,
            phone: phone,
            sex: sex,
            blood_group: group,
            month: month,
            year: year,
            address: address,
        }

        localStorage.setItem('patient', JSON.stringify({ patient: patientInfo }))
        window.location.reload()
    }

    const clearPatient = () => {
        dispatchPatient({ type: 'remove' })
        dispatchConsultation({ type: 'remove' })
        setName('')
        setPhone('')
        setSex('not selected')
        setYear('')
        setMonth('')
        setAddress('')
        setGroup('not selected')
        window.location.reload()
    }

    useEffect(() => {
        if (name.length > 0) {
            setHide(true)
        } else {
            setHide(false)
        }
    }, [name])

    return (
        <div className={classes.Patient}>
            <form
                onSubmit={(e) => {
                    patientSet(e)
                    cross(false)
                }}>
                <span onClick={() => cross(false)}>x</span>
                <h2>Patient Information</h2>

                <div className={classes.Wrapper}>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        placeholder="Patient name*"
                        required
                    />
                    {/* Patient search modal */}
                    {(name.length !== 0) & (statePatient.patient.name !== name) ? (
                        <PatientSearch arr={searchResult} setPatient={dispatchPatient} setName={setName} />
                    ) : null}

                    {hide && (
                        <span className={classes.clear} onClick={() => clearPatient()}>
                            clear
                        </span>
                    )}

                    <input
                        type="text"
                        value={stateConsultation.consultation}
                        onChange={(e) => dispatchConsultation({ type: 'input', payload: e.target.value })}
                        placeholder="Chief Complaints*"
                        required
                    />

                    <input
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        type="text"
                        placeholder="Phone number"
                    />
                    <div className={classes.Two}>
                        <select value={sex} onChange={(e) => setSex(e.target.value)}>
                            <option value="not selected" disabled>
                                Sex
                            </option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>

                        <select value={group} onChange={(e) => setGroup(e.target.value)}>
                            <option value="not selected" disabled>
                                Blood Group
                            </option>
                            <option value="A+">A+</option>
                            <option value="AB+">AB+</option>
                            <option value="B+">B+</option>
                            <option value="O+">O+</option>
                            <option value="A-">A-</option>
                            <option value="AB-">AB-</option>
                            <option value="B-">B-</option>
                            <option value="O-">O-</option>
                        </select>
                    </div>

                    <div className={classes.Two}>
                        <input
                            type="number"
                            placeholder="Year's"
                            min={0}
                            value={year}
                            onChange={(e) => setYear(parseInt(e.target.value))}
                        />

                        <input
                            type="number"
                            placeholder="Month's"
                            min={0}
                            value={month}
                            onChange={(e) => setMonth(parseInt(e.target.value))}
                        />
                    </div>

                    <input
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        type="text"
                        placeholder="Address"
                    />
                    <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Patient
