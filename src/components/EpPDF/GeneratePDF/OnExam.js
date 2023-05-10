import { useContext, Fragment } from 'react'
import { PdfWrapped } from '../../../allContext'
import Anaemia from '../../PreviewSection/OnExaminationPrev/OnExaminationChild/Anaemia'
import BloodPressure from '../../PreviewSection/OnExaminationPrev/OnExaminationChild/BloodPressure'
import Bmi from '../../PreviewSection/OnExaminationPrev/OnExaminationChild/Bmi'
import Custom from '../../PreviewSection/OnExaminationPrev/OnExaminationChild/Custom'
import Cyanosis from '../../PreviewSection/OnExaminationPrev/OnExaminationChild/Cyanosis'
import Heart from '../../PreviewSection/OnExaminationPrev/OnExaminationChild/Heart'
import HeartRate from '../../PreviewSection/OnExaminationPrev/OnExaminationChild/HeartRate'
import Height from '../../PreviewSection/OnExaminationPrev/OnExaminationChild/Height'
import Jaundice from '../../PreviewSection/OnExaminationPrev/OnExaminationChild/Jaundice'
import Lungs from '../../PreviewSection/OnExaminationPrev/OnExaminationChild/Lungs'
import Oedema from '../../PreviewSection/OnExaminationPrev/OnExaminationChild/Oedema'
import Pulse from '../../PreviewSection/OnExaminationPrev/OnExaminationChild/Pulse'
import Rbs from '../../PreviewSection/OnExaminationPrev/OnExaminationChild/Rbs'
import Respiratory from '../../PreviewSection/OnExaminationPrev/OnExaminationChild/Respiratory'
import Temp from '../../PreviewSection/OnExaminationPrev/OnExaminationChild/Temp'
import Weight from '../../PreviewSection/OnExaminationPrev/OnExaminationChild/Weight'
import classes from './Generate.module.css'

const OnExam = () => {
    const { stateOnExamination } = useContext(PdfWrapped)

    return (
        <div>
            {stateOnExamination.onexam.length !== 0 ? <h4>O/E :</h4> : null}

            <Fragment>
                <ul className={classes.OnExamUl}>
                    {/* Blood Pressure preview */}
                    {stateOnExamination.onexam.length !== 0 ? <BloodPressure arr={stateOnExamination.onexam} /> : null}
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
                    {stateOnExamination.onexam.length !== 0 ? <Respiratory arr={stateOnExamination.onexam} /> : null}
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
        </div>
    )
}

export default OnExam
