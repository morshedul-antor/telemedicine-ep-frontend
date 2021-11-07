import React, { Fragment, useContext } from 'react'
import { PdfWrapped } from '../../../allContext'
// import boxLogo from '../../../assets/img/healthx-box.png'
import classes from './Generate.module.css'
import HistoryChildView from './HistoryChildView'

export const GeneratePDF = React.forwardRef((props, ref) => {
    const {
        statePatient,
        stateChief,
        stateInvestigation,
        // stateOnExamination,
        stateDiagnosis,
        stateAdvice,
        stateMedicine,
        statePersonalHistory,
        stateCoMorbidity,
        stateProfessionalHistory,
        stateFamilyHistory,
        stateDrugHistory,
        stateMedicalHistory,
        stateVaccinationHistory,
    } = useContext(PdfWrapped)

    //Date
    const day = () => {
        let d = new Date().getDate()
        return d
    }
    const month = () => {
        let m = new Date().getMonth()
        return m
    }
    const year = () => {
        let y = new Date().getFullYear()
        return y
    }
    return (
        <div className={classes.wrapper}>
            <div className={classes.Generate} ref={ref}>
                {/* Top field */}
                <div className={classes.top}>
                    <div className={classes.topLeft}>
                        <h3>Dr. Rashadul Hasan</h3>
                        <p>Medicine Specialist</p>
                        <p>MBBS, FRCS</p>
                    </div>
                    <div className={classes.topRight}>
                        {/* <img src={boxLogo} alt="Box Logo" /> */}
                        <h3>Chamber</h3>
                        <p>152/2 Block L</p>
                        <p>Dhaka</p>
                    </div>
                </div>

                {/* Patient */}
                <div className={classes.patient}>
                    <p>
                        <b>Name :</b> {statePatient.patient.name}
                    </p>
                    <p>
                        <b>Age :</b> {statePatient.patient.age}
                    </p>
                    <p>
                        <b>Sex :</b> {statePatient.patient.sex}
                    </p>
                    <p className={classes.date}>
                        <b>Date :</b>
                        {day() < 10 ? '0' + day().toString() : day()} - {month() + 1} - {year()}
                    </p>
                </div>

                {/* Middle body */}
                <div className={classes.middleBody}>
                    {/* Left part */}
                    <div className={classes.leftBody}>
                        {/* Chief Complaints */}
                        {stateChief.cc.length !== 0 ? (
                            <Fragment>
                                <h4>C/C :</h4>
                                <ol>
                                    {stateChief.cc.length !== 0
                                        ? stateChief.cc
                                              .replace(/\n+$/, '')
                                              .split('\n')
                                              .map((v, i) => {
                                                  return <li key={i}>{v}</li>
                                              })
                                        : null}
                                </ol>
                            </Fragment>
                        ) : null}

                        {/* History */}
                        <div className={classes.history}>
                            <h4>History</h4>
                            {/*Personal history*/}
                            <HistoryChildView st={statePersonalHistory.personal} lvl="Personal History" />

                            {/*Co-Morbidity*/}
                            {stateCoMorbidity.coMorbidity.length !== 0 ? (
                                <div className={classes.coMorbidity}>
                                    {stateCoMorbidity.coMorbidity.map((v, i) => {
                                        return (
                                            <p key={i}>
                                                <b>{v.title}</b> <span>{v.remark}</span>
                                            </p>
                                        )
                                    })}
                                </div>
                            ) : null}

                            {/*Professional History*/}
                            <HistoryChildView st={stateProfessionalHistory.professional} lvl="Professional History" />

                            {/*Family History*/}
                            <HistoryChildView st={stateFamilyHistory.family} lvl="Family History" />

                            {/*Drug History*/}
                            <HistoryChildView st={stateDrugHistory.drug} lvl="Drug History" />

                            {/*Medical History*/}
                            <HistoryChildView st={stateMedicalHistory.medical} lvl="Medical History" />

                            {/*Vaccination History*/}
                            <HistoryChildView st={stateVaccinationHistory.vaccination} lvl="Vaccination History" />
                        </div>

                        <h4>O/E :</h4>
                        <ol>
                            <li>Blood Pressure (BP) : 120 / 80 mm of Hg</li>
                            <li>Pulse : 56 beats/min</li>
                            <li>Temp : 98 ° F</li>
                            <li>RBS : 70</li>
                        </ol>

                        {/* Investigation */}
                        {stateInvestigation.inv.length !== 0 ? (
                            <Fragment>
                                <h4>INV :</h4>
                                <ol>
                                    {stateInvestigation.inv.length !== 0
                                        ? stateInvestigation.inv.split('\n').map((v, i) => {
                                              return <li key={i}>{v}</li>
                                          })
                                        : null}
                                </ol>
                            </Fragment>
                        ) : null}

                        {/* Probable Diagnosis */}
                        {stateDiagnosis.probable.length !== 0 ? (
                            <Fragment>
                                <h4>D/D :</h4>
                                <ol className={classes.diagnosis}>
                                    {stateDiagnosis.probable.split('\n').map((v, i) => {
                                        return <li key={i}>{v}</li>
                                    })}
                                </ol>
                            </Fragment>
                        ) : null}

                        {/* Confirmatory  */}
                        {stateDiagnosis.confirmatory.length !== 0 ? (
                            <Fragment>
                                <h4>Confirmatory Diagnosis :</h4>
                                <ol className={classes.diagnosis}>
                                    {stateDiagnosis.confirmatory.split('\n').map((v, i) => {
                                        return <li key={i}>{v}</li>
                                    })}
                                </ol>
                            </Fragment>
                        ) : null}
                    </div>
                    {/* Right part */}
                    <div className={classes.rightBody}>
                        <div className={classes.medicine}>
                            <h3>Rx</h3>
                            {stateMedicine.medicine.length !== 0
                                ? stateMedicine.medicine.map((v) => {
                                      return (
                                          <div key={v.id} className={classes.singleMedicine}>
                                              <span>
                                                  {v.form} - {v.name} - {v.strength}
                                              </span>
                                              <p>
                                                  {v.doses} | {v.after ? 'After Meal' : 'Before Meal'} |{' '}
                                                  {v.day > 1 ? v.day + ' days' : v.day + ' day'}
                                              </p>
                                              <p>{v.remark}</p>
                                          </div>
                                      )
                                  })
                                : null}
                        </div>

                        {/* Advice */}
                        {stateAdvice.adv.length !== 0 ? (
                            <Fragment>
                                <h4>Advice :</h4>
                                <ol>
                                    {stateAdvice.adv.length !== 0
                                        ? stateAdvice.adv.split('\n').map((v, i) => {
                                              return <li key={i}>{v}</li>
                                          })
                                        : null}
                                </ol>
                            </Fragment>
                        ) : null}
                    </div>
                </div>
                <div className={classes.signature}>
                    <span></span>
                    <p>Dr. Signature</p>
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
