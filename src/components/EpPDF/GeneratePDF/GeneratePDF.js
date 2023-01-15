import React, { Fragment, useContext, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Auth } from '../../../allContext'
import { getFromAPI } from '../../../api/get'
import classes from './Generate.module.css'
import Header from './Header/Header'
import HistoryChildView from './HistoryChildView'
import OnExam from './OnExam'

export const GeneratePDF = React.forwardRef((props, ref) => {
    const { hxepid } = useParams()
    const [ep, setEp] = useState({})
    const [profile, setProfile] = useState('')

    const { stateAuth } = useContext(Auth)
    const apiV1 = process.env.REACT_APP_API_V1

    useEffect(() => {
        let id = hxepid.slice(4) - 100000
        let endpoint = `${apiV1}/ep/${id}`
        getFromAPI(endpoint)
            .then((data) => setEp(data))
            .catch((e) => {})
    }, [apiV1, hxepid, stateAuth])

    let personalHistory = ep.histories && ep.histories.filter((data) => data.history_type === 'personal')
    let professionalHistory = ep.histories && ep.histories.filter((data) => data.history_type === 'professional')
    let familyHistory = ep.histories && ep.histories.filter((data) => data.history_type === 'family')
    let drugHistory = ep.histories && ep.histories.filter((data) => data.history_type === 'drug')
    let medicalHistory = ep.histories && ep.histories.filter((data) => data.history_type === 'medical')
    let vaccinationHistory = ep.histories && ep.histories.filter((data) => data.history_type === 'vaccination')

    return (
        <div className={classes.wrapper}>
            <div className={classes.Generate} ref={ref}>
                {/* Top field */}
                <Header stateAuth={stateAuth} classes={classes} doc_id={ep?.doctor_id} />

                {/* Patient */}
                <div className={classes.patient}>
                    <p>
                        <b>Name:</b> {ep.patient_name || ''}
                    </p>
                    <p>
                        <b>Age: </b>
                        {` ${ep.age_years || ''} year's, ${ep.age_months || ''} month's`}
                    </p>
                    <p>
                        <b>Sex:</b> <span>{ep.patient_sex || ''}</span>
                    </p>
                    <p>
                        <b>Blood Group:</b> {ep.blood_group || ''}
                    </p>
                    <p className={classes.date}>
                        <b>Date: </b>
                        {ep.created_at?.split('T')[0]}
                    </p>
                </div>

                {/* Middle body */}
                <div className={classes.middleBody}>
                    {/* Left part */}
                    <div className={classes.leftBody}>
                        {/* Chief Complaints */}
                        {ep?.chief_complaints?.length !== 0 ? (
                            <Fragment>
                                <h4>C/C :</h4>
                                <ol>
                                    {ep?.chief_complaints?.map((v, i) => (
                                        <li key={i}>{v.chief_complaints}</li>
                                    ))}
                                </ol>
                            </Fragment>
                        ) : null}

                        {/* history  */}
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

                        {/* on exam  */}
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
                    {/* Right part */}
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

                        {/* follow up  */}
                        {ep?.followup?.length !== 0 ? (
                            <Fragment>
                                <h4>Next followup :</h4>
                                <p className={classes.follow}>{ep?.followup && ep?.followup[0].date}</p>
                            </Fragment>
                        ) : null}

                        {/* refer  */}
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

                <div className={classes.footer}>
                    <p>
                        This e-prescription developed by <b>HEALTHx</b>
                    </p>
                </div>
            </div>
        </div>
    )
})
