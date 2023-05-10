import { useContext } from 'react'
import { FieldContext } from '../../allContext'
// import Submit from '../Submit/Submit'
import AdviceInpOut from './AdviceInpOut/AdviceInpOut'
import ChiefComplaintsInp from './ChiefComplaintsInp/ChiefComplaintsInp'
import DiagnosisInp from './DiagnosisInp/DiagnosisInp'
import HistoryInp from './HistoryInp/HistoryInp'
import classes from './InputSection.module.css'
import InvestigationInp from './InvestigationInp/InvestigationInp'
import MedicineInpOut from './MedicineInpOut/MedicineInpOut'
import NextFollowUpInpOut from './NextFollowUpInpOut/NextFollowUpInpOut'
import OnExaminationInp from './OnExaminationInp/OnExaminationInp'
import ReferInp from './ReferInp/ReferInp'

const InputSection = () => {
    const { state } = useContext(FieldContext)
    return (
        <div className={classes.InputSection}>
            {/* <h3>Input</h3> */}
            {state.field === 'medicine' ? <MedicineInpOut /> : null}
            {state.field === 'chief' ? <ChiefComplaintsInp /> : null}
            {state.field === 'diagnosis' ? <DiagnosisInp /> : null}
            {state.field === 'history' ? <HistoryInp /> : null}
            {state.field === 'investigation' ? <InvestigationInp /> : null}
            {state.field === 'onexam' ? <OnExaminationInp /> : null}
            {state.field === 'advice' ? <AdviceInpOut /> : null}
            {state.field === 'next' ? <NextFollowUpInpOut /> : null}
            {state.field === 'refer' ? <ReferInp /> : null}
            {/* <Submit /> */}
        </div>
    )
}

export default InputSection
