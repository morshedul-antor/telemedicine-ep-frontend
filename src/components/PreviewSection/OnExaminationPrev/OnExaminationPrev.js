import { useState, Fragment, useContext } from 'react'
import { OnExamination } from '../../../allContext'
import Anaemia from './OnExaminationChild/Anaemia'
import BloodPressure from './OnExaminationChild/BloodPressure'
import Bmi from './OnExaminationChild/Bmi'
import Custom from './OnExaminationChild/Custom'
import Cyanosis from './OnExaminationChild/Cyanosis'
import Heart from './OnExaminationChild/Heart'
import HeartRate from './OnExaminationChild/HeartRate'
import Height from './OnExaminationChild/Height'
import Jaundice from './OnExaminationChild/Jaundice'
import Lungs from './OnExaminationChild/Lungs'
import Oedema from './OnExaminationChild/Oedema'
import Pulse from './OnExaminationChild/Pulse'
import Rbs from './OnExaminationChild/Rbs'
import Respiratory from './OnExaminationChild/Respiratory'
import Temp from './OnExaminationChild/Temp'
import Weight from './OnExaminationChild/Weight'
import classes from './OnExaminationPrev.module.css'

const OnExaminationPrev = () => {
    const [toggle, setToggle] = useState(true)
    const { stateOnExamination, dispatchOnExamination } = useContext(OnExamination)

    const del = (e) => {
        e.preventDefault()
        dispatchOnExamination({ type: 'remove' })
    }

    return (
        <div className={classes.OnExaminationPrev}>
            {stateOnExamination.onexam.length !== 0 ? (
                <h3 onClick={() => setToggle(!toggle)} className={toggle ? classes.toggle : null}>
                    On-Examination
                </h3>
            ) : null}
            <button className={classes.del} onClick={(e) => del(e)}>
                x
            </button>
            {toggle ? (
                <Fragment>
                    <ul>
                        {/* Blood Pressure preview */}
                        {stateOnExamination.onexam.length !== 0 ? (
                            <BloodPressure arr={stateOnExamination.onexam} />
                        ) : null}
                        {/* Pulse preview */}
                        {stateOnExamination.onexam.length !== 0 ? <Pulse arr={stateOnExamination.onexam} /> : null}
                        {/* Temp preview */}
                        {stateOnExamination.onexam.length !== 0 ? <Temp arr={stateOnExamination.onexam} /> : null}
                        {/* RBS preview */}
                        {stateOnExamination.onexam.length !== 0 ? <Rbs arr={stateOnExamination.onexam} /> : null}
                        {/* Heart preview */}
                        {stateOnExamination.onexam.length !== 0 ? <Heart arr={stateOnExamination.onexam} /> : null}
                        {/* Lungs preview */}
                        {stateOnExamination.onexam.length !== 0 ? <Lungs arr={stateOnExamination.onexam} /> : null}
                        {/* Weight preview */}
                        {stateOnExamination.onexam.length !== 0 ? <Weight arr={stateOnExamination.onexam} /> : null}
                        {/* Anaemia preview */}
                        {stateOnExamination.onexam.length !== 0 ? <Anaemia arr={stateOnExamination.onexam} /> : null}
                        {/* Jaundice preview */}
                        {stateOnExamination.onexam.length !== 0 ? <Jaundice arr={stateOnExamination.onexam} /> : null}
                        {/* Cyanosis preview */}
                        {stateOnExamination.onexam.length !== 0 ? <Cyanosis arr={stateOnExamination.onexam} /> : null}
                        {/* HeartRate preview */}
                        {stateOnExamination.onexam.length !== 0 ? <HeartRate arr={stateOnExamination.onexam} /> : null}
                        {/* Respiratory preview */}
                        {stateOnExamination.onexam.length !== 0 ? (
                            <Respiratory arr={stateOnExamination.onexam} />
                        ) : null}
                        {/* Oedema preview */}
                        {stateOnExamination.onexam.length !== 0 ? <Oedema arr={stateOnExamination.onexam} /> : null}
                        {/* Height preview */}
                        {stateOnExamination.onexam.length !== 0 ? <Height arr={stateOnExamination.onexam} /> : null}
                        {/* BMI preview */}
                        {stateOnExamination.onexam.length !== 0 ? <Bmi arr={stateOnExamination.onexam} /> : null}
                        {/* Custom preview */}
                        {stateOnExamination.onexam.length !== 0 ? <Custom arr={stateOnExamination.onexam} /> : null}
                    </ul>
                </Fragment>
            ) : null}
        </div>
    )
}

export default OnExaminationPrev
