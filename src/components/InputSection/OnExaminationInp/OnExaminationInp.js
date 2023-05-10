import { Fragment, useState, useReducer } from 'react'
// import { OnExamination } from '../../../allContext'
import { onExaminationReducer, onExaminationState } from '../../../reducer/onExaminationReducer'
import Anaemia from './ExamField/Anaemia'
import BloodPressure from './ExamField/BloodPressure'
import Bmi from './ExamField/Bmi'
import Custom from './ExamField/Custom'
import Cyanois from './ExamField/Cyanois'
import Heart from './ExamField/Heart'
import HeartRate from './ExamField/HeartRate'
import Height from './ExamField/Height'
import Jaundice from './ExamField/Jaundice'
import Lungs from './ExamField/Lungs'
import Oedema from './ExamField/Oedema'
import Pulse from './ExamField/Pulse'
import Rbs from './ExamField/Rbs'
import Respiratory from './ExamField/Respiratory'
import Temp from './ExamField/Temp'
import Weight from './ExamField/Weight'
import classes from './OnExaminationInp.module.css'

const OnExaminationInp = () => {
    const [more, setMore] = useState(false)
    // const { dispatchOnExamination } = useContext(OnExamination)

    const [stateOnEaminations, dispatchOnExamination] = useReducer(onExaminationReducer, onExaminationState)

    let oe = {}

    const setDataFun = (obj) => {
        oe = { ...oe, ...obj }
    }

    const submit = () => {
        // dispatchOnExamination({ type: 'input', payload: oe })
        // console.log(oe)
        let dataArray = []
        // dataArray.push(...stateOnEaminations.onexam)
        for (let key in oe) {
            // jus replace previews data
            dataArray.push(oe[key])
        }
        // console.log(dataArray)
        dispatchOnExamination({ type: 'input', payload: dataArray })

        window.location.reload()
    }

    return (
        <div className={classes.OnExaminationInp}>
            <BloodPressure setData={setDataFun} />
            <Pulse setData={setDataFun} />
            <Temp setData={setDataFun} />
            <Rbs setData={setDataFun} />
            <Heart setData={setDataFun} />
            <Lungs setData={setDataFun} />
            <Weight setData={setDataFun} />

            {more ? (
                <Fragment>
                    <Anaemia setData={setDataFun} />
                    <Jaundice setData={setDataFun} />
                    <Cyanois setData={setDataFun} />
                    <HeartRate setData={setDataFun} />
                    <Respiratory setData={setDataFun} />
                    <Oedema setData={setDataFun} />
                    <Height setData={setDataFun} />
                    <Bmi setData={setDataFun} />
                    <Custom setData={setDataFun} />
                </Fragment>
            ) : null}

            <div className={classes.btnWrapper}>
                <button onClick={() => setMore(!more)}>See {more ? 'less' : 'more'}</button>
                <button onClick={submit}>Submit</button>
            </div>
        </div>
    )
}

export default OnExaminationInp
