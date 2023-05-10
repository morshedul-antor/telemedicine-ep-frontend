import React, { Fragment, useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Auth } from '../../../allContext'
import { getFromAPI } from '../../../api/get'
import classes from './Generate.module.css'
import Header from './Header/Header'
import HistoryChildView from './HistoryChildView'
import OnExam from './OnExam'

export const GeneratePDF = React.forwardRef((props, ref) => {
    const { liveid } = useParams()
    const [ep, setEp] = useState({})
    const [profile] = useState('')

    const { stateAuth } = useContext(Auth)
    const apiV1 = process.env.REACT_APP_API_V1

    useEffect(() => {
        let id = liveid.slice(4) - 100000
        let endpoint = `${apiV1}/ep/${id}`
        getFromAPI(endpoint)
            .then((data) => setEp(data))
            .catch((e) => {})
    }, [apiV1, liveid, stateAuth])

    let personalHistory = ep.histories && ep.histories.filter((data) => data.history_type === 'personal')
    let professionalHistory = ep.histories && ep.histories.filter((data) => data.history_type === 'professional')
    let familyHistory = ep.histories && ep.histories.filter((data) => data.history_type === 'family')
    let drugHistory = ep.histories && ep.histories.filter((data) => data.history_type === 'drug')
    let medicalHistory = ep.histories && ep.histories.filter((data) => data.history_type === 'medical')
    let vaccinationHistory = ep.histories && ep.histories.filter((data) => data.history_type === 'vaccination')

    return (
        <div className={classes.wrapper}>
            <div className={classes.Generate} ref={ref}>
                {/* Top Field */}
                <Header stateAuth={stateAuth} classes={classes} doc_id={ep?.doctor_id} />

                {/* Patient */}
                <div className={classes.patient}>
                    <p>
                        <b>Name:</b> {ep.patient_name || ''}
                    </p>
                    <p>
                        <b>Age: </b>
                        {` ${ep.age_years || ''}.${ep.age_months || ''}`}
                    </p>
                    <p>
                        <b>Gender:</b> <span>{ep.patient_sex || ''}</span>
                    </p>
                    <p>
                        <b>Blood Group:</b> {ep.blood_group || ''}
                    </p>
                    <p className={classes.date}>
                        <b>Date: </b>
                        {ep.created_at?.split('T')[0]}
                    </p>
                </div>

                {/* Middle Body */}
                <div className={classes.middleBody}>
                    {/* Left Part */}
                    <div className={classes.leftBody}>
                        {/* Chief Complaints */}
                        {ep?.cause_of_consultation?.length !== 0 ? (
                            <Fragment>
                                <h4>Chief Complaints:</h4>
                                <ol>
                                    <li>{ep?.cause_of_consultation}</li>
                                </ol>
                            </Fragment>
                        ) : null}

                        {/* Co-Morbidity */}
                        {ep.co_morbidities && ep.co_morbidities.length !== 0 ? (
                            <>
                                <h4>Co-Morbidity :</h4>
                                <ul>
                                    {ep.co_morbidities &&
                                        ep.co_morbidities.map((v, i) => (
                                            <li key={i}>
                                                {v.cm_type} <span> {v.remarks}</span>
                                            </li>
                                        ))}
                                </ul>
                            </>
                        ) : null}

                        {/* History  */}
                        {ep.histories && ep.histories.length !== 0 ? (
                            <Fragment>
                                <h4>History :</h4>
                                <HistoryChildView data={personalHistory} title={'Personal history'} />
                                <HistoryChildView data={professionalHistory} title={'Professional history'} />
                                <HistoryChildView data={familyHistory} title={'Family history'} />
                                <HistoryChildView data={drugHistory} title={'Drug history'} />
                                <HistoryChildView data={medicalHistory} title={'Medical history'} />
                                <HistoryChildView data={vaccinationHistory} title={'Vaccination history'} />
                            </Fragment>
                        ) : null}

                        {/* On Exam  */}
                        <OnExam />

                        {/* Investigation */}
                        {ep.investigations && ep.investigations.length !== 0 ? (
                            <>
                                <h4>INV :</h4>
                                <ol>
                                    {ep.investigations &&
                                        ep.investigations.map((v, i) => <li key={i}>{v.investigation}</li>)}
                                </ol>
                            </>
                        ) : null}

                        {/* Diagnosis */}
                        {ep?.diagnosis?.length !== 0 ? (
                            <Fragment>
                                {ep.diagnosis && ep.diagnosis[0].diagnosis.length !== 0 ? <h4>D/D :</h4> : null}
                                <div className={classes.diagnosis}>
                                    <ol>
                                        {ep?.diagnosis &&
                                            ep?.diagnosis
                                                .filter((v) => v.diagnosis_type === 'probable')
                                                .filter((space) => space.diagnosis.length !== 0)
                                                .map((v, i) =>
                                                    v.diagnosis.split('\n').map((v, i) => <li key={i}>{v}</li>)
                                                )}
                                    </ol>
                                </div>
                                {ep.diagnosis && ep.diagnosis[1].diagnosis.length !== 0 ? (
                                    <h4>Confirmatory Diagnosis :</h4>
                                ) : null}
                                <div className={classes.diagnosis}>
                                    <ol>
                                        {ep?.diagnosis &&
                                            ep?.diagnosis
                                                .filter((v) => v.diagnosis_type === 'confirmatory')
                                                .filter((space) => space.diagnosis.length !== 0)
                                                .map((v, i) =>
                                                    v.diagnosis.split('\n').map((v, i) => <li key={i}>{v}</li>)
                                                )}
                                    </ol>
                                </div>
                            </Fragment>
                        ) : null}
                    </div>

                    {/* Right Part */}
                    <div className={classes.rightBody}>
                        {ep?.medicines?.length !== 0 ? (
                            <Fragment>
                                <h3>Rx.</h3>
                                {ep?.medicines?.map((v, i) => (
                                    <div className={classes.singleMedicine} key={i}>
                                        <p>
                                            {v.form}
                                            {'. '}
                                            {v.name} {v.strength}
                                        </p>
                                        <p>
                                            {v.doses} {v.before_after !== '' ? '.....' : null} {v.before_after}{' '}
                                            {v.days !== 0 ? '.....' : null} {v.days} {v.days !== null ? 'days' : null}
                                        </p>
                                        <p>{v.remarks}</p>
                                    </div>
                                ))}
                            </Fragment>
                        ) : null}

                        {/* Advice */}
                        {ep?.advices?.length !== 0 ? (
                            <Fragment>
                                <h4>Advice :</h4>
                                <ol>
                                    {ep?.advices?.map((v, i) => {
                                        return <li key={i}>{v.advice}</li>
                                    })}
                                </ol>
                            </Fragment>
                        ) : null}

                        {/* Follow Up  */}
                        {ep?.followup?.length !== 0 ? (
                            <Fragment>
                                <h4>Next followup :</h4>
                                <p className={classes.follow}>{ep?.followup && ep?.followup[0].date}</p>
                            </Fragment>
                        ) : null}

                        {/* Refer  */}
                        {ep?.refer?.length !== 0 ? (
                            <Fragment>
                                <h4>Reffer :</h4>
                                <p className={classes.refer}>
                                    <span>Reffer to: </span>
                                    {ep?.refer && ep?.refer[0].detail}
                                </p>
                            </Fragment>
                        ) : null}

                        <p className={classes.refer}>{/* Refer to: <span>{ep?.refer[0]?.detail}</span> */}</p>
                    </div>
                    <div></div>
                    <div className={classes.signature}>
                        <div>{/* <img src={healthxCircle} alt="" /> */}</div>
                        <div>
                            {profile.prescription_header_left?.split('\n')?.map((v, i) => {
                                return <p key={i}>{v}</p>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
})
