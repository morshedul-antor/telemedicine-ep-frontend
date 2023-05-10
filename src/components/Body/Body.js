import { faArrowsAltV } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useReducer, useState } from 'react'
import {
    CauseOfConsultation,
    ChiefComplaints,
    History,
    Investigation,
    Diagnosis,
    Advice,
    Next,
    OnExamination,
    Refer,
} from '../../allContext'
import { patientState, patientReducer } from '../../reducer/PatientInfoReducer'
import { adviceState, adviceReducer } from '../../reducer/adviceReducer'
import { consultationReducer, consultationState } from '../../reducer/causeOfConsultation'
import { chiefState, chiefReducer } from '../../reducer/chiefReducer'
import { coMorbidityReducer, coMorbidityState } from '../../reducer/coMorbidityReducer'
import { diagnosisReducer, diagnosisState } from '../../reducer/diagnosisReducer'
import { drugHistoryReducer, drugHistoryState } from '../../reducer/drugHistoryReducer'
import { familyHistoryReducer, familyHistoryState } from '../../reducer/familyHistoryReducer'
import { fieldState, fieldReducer } from '../../reducer/fieldReducer'
import { investigationReducer, investigationState } from '../../reducer/investigationReducer'
import { medicalHistoryReducer, medicalHistoryState } from '../../reducer/medicalHistoryReducer'
import { medicineReducer, medicineState } from '../../reducer/medicineReducer'
import { nextReducer, nextState } from '../../reducer/nextReducer'
import { onExaminationReducer, onExaminationState } from '../../reducer/onExaminationReducer'
import { personalHistoryReducer, personalHistoryState } from '../../reducer/personalHistoryReducer'
import { professionalHistoryReducer, professionalHistoryState } from '../../reducer/professionalHistoryReducer'
import { referReducer, referState } from '../../reducer/referReducer'
import { vaccinationHistoryReducer, vaccinationHistoryState } from '../../reducer/vaccinationHistoryReducer'
import InputSection from '../InputSection/InputSection'
import PreviewSection from '../PreviewSection/PreviewSection'
import classes from './Body.module.css'

const Body = () => {
    const [statePatientInfo, dispatchPatientInfo] = useReducer(patientReducer, patientState)

    const [stateConsultation, dispatchConsultation] = useReducer(consultationReducer, consultationState)
    const [stateChief, dispatchChief] = useReducer(chiefReducer, chiefState)
    const [stateInvestigation, dispatchInvestigation] = useReducer(investigationReducer, investigationState)
    const [stateDiagnosis, dispatchDiagnosis] = useReducer(diagnosisReducer, diagnosisState)
    const [stateAdvice, dispatchAdvice] = useReducer(adviceReducer, adviceState)
    const [stateNext, dispatchNext] = useReducer(nextReducer, nextState)
    const [statePersonalHistory, dispatchPersonalHistory] = useReducer(personalHistoryReducer, personalHistoryState)
    const [stateProfessionalHistory, dispatchProfessionalHistory] = useReducer(
        professionalHistoryReducer,
        professionalHistoryState
    )
    const [stateFamilyHistory, dispatchFamilyHistory] = useReducer(familyHistoryReducer, familyHistoryState)
    const [stateDrugHistory, dispatchDrugHistory] = useReducer(drugHistoryReducer, drugHistoryState)
    const [stateMedicalHistory, dispatchMedicalHistory] = useReducer(medicalHistoryReducer, medicalHistoryState)
    const [stateVaccinationHistory, dispatchVaccinationHistory] = useReducer(
        vaccinationHistoryReducer,
        vaccinationHistoryState
    )
    const [stateCoMorbidity, dispatchCoMorbidity] = useReducer(coMorbidityReducer, coMorbidityState)
    const [stateOnExamination, dispatchOnExamination] = useReducer(onExaminationReducer, onExaminationState)
    const [stateRefer, dispatchRefer] = useReducer(referReducer, referState)

    const [stateField, dispatchField] = useReducer(fieldReducer, fieldState)
    const [stateMedicine, dispatchMedicine] = useReducer(medicineReducer, medicineState)

    const history = {
        statePersonalHistory,
        dispatchPersonalHistory,
        stateProfessionalHistory,
        dispatchProfessionalHistory,
        stateFamilyHistory,
        dispatchFamilyHistory,
        stateDrugHistory,
        dispatchDrugHistory,
        stateMedicalHistory,
        dispatchMedicalHistory,
        stateVaccinationHistory,
        dispatchVaccinationHistory,
        stateCoMorbidity,
        dispatchCoMorbidity,
    }

    const [swap, setSwap] = useState(false)

    const allClear = () => {
        dispatchPatientInfo({ type: 'remove' })

        dispatchChief({ type: 'remove' })
        dispatchInvestigation({ type: 'remove' })
        dispatchDiagnosis({ type: 'remove' })
        dispatchAdvice({ type: 'remove' })
        dispatchNext({ type: 'remove' })
        dispatchRefer({ type: 'remove' })

        dispatchPersonalHistory({ type: 'remove' })
        dispatchProfessionalHistory({ type: 'remove' })
        dispatchFamilyHistory({ type: 'remove' })
        dispatchDrugHistory({ type: 'remove' })
        dispatchMedicalHistory({ type: 'remove' })
        dispatchVaccinationHistory({ type: 'remove' })
        dispatchCoMorbidity({ type: 'remove' })

        dispatchMedicine({ type: 'remove' })

        dispatchOnExamination({ type: 'remove' })

        dispatchConsultation({ type: 'remove' })
        dispatchField({ type: 'medicine' })
        window.location.reload()
    }

    return (
        <div className={classes.Body}>
            {/* <button onClick={(e) => setSwap(!swap)}>
                <FontAwesomeIcon icon={faArrowsAltV} />
            </button> */}
            <div className={classes.Wrapper}>
                <CauseOfConsultation.Provider value={{ stateConsultation, dispatchConsultation }}>
                    <ChiefComplaints.Provider value={{ stateChief, dispatchChief }}>
                        <Investigation.Provider value={{ stateInvestigation, dispatchInvestigation }}>
                            <Diagnosis.Provider value={{ stateDiagnosis, dispatchDiagnosis }}>
                                <OnExamination.Provider value={{ stateOnExamination, dispatchOnExamination }}>
                                    <History.Provider value={history}>
                                        <Advice.Provider value={{ stateAdvice, dispatchAdvice }}>
                                            <Next.Provider value={{ stateNext, dispatchNext }}>
                                                <Refer.Provider value={{ stateRefer, dispatchRefer }}>
                                                    {swap ? (
                                                        <>
                                                            <div>
                                                                <InputSection />
                                                            </div>
                                                            <div>
                                                                <PreviewSection />
                                                                <span
                                                                    className={classes.clearAll}
                                                                    onClick={(e) => allClear()}>
                                                                    Clear all
                                                                </span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <div>
                                                                <PreviewSection />
                                                            </div>
                                                            <div>
                                                                <InputSection />
                                                                <span
                                                                    className={classes.clearAll}
                                                                    onClick={(e) => allClear()}>
                                                                    Refresh
                                                                </span>
                                                            </div>
                                                        </>
                                                    )}
                                                </Refer.Provider>
                                            </Next.Provider>
                                        </Advice.Provider>
                                    </History.Provider>
                                </OnExamination.Provider>
                            </Diagnosis.Provider>
                        </Investigation.Provider>
                    </ChiefComplaints.Provider>
                </CauseOfConsultation.Provider>
            </div>
        </div>
    )
}

export default Body
