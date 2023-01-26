import { useState, useEffect, useReducer } from 'react'
// import { Medicine } from '../../../../allContext'
import { medicineReducer, medicineState } from '../../../../reducer/medicineReducer'
import DropDown from '../../../ReUsable/DropDown/DropDown'
import InputField from '../../../ReUsable/InputField/InputField'
import InputNumber from '../../../ReUsable/InputNumber/InputNumber'
import SuggestionMedicine from '../Suggestion/SuggestionMedicine'
import classes from './InputMedicine.module.css'

const InputMedicine = () => {
    const [stateMedicine, dispatchMedicine] = useReducer(medicineReducer, medicineState)
    // const { stateMedicine, dispatchMedicine } = useContext(Medicine)

    const apiV1 = process.env.REACT_APP_API_V1

    const option = [
        { name: 'After Meal', value: 'after' },
        { name: 'Before Meal', value: 'before' },
        { name: 'None', value: '' },
    ]

    const [arr, setArr] = useState([])
    const [medicineObj, setMedicineObj] = useState({ name: '' })

    const [id, setId] = useState(0)
    const [medicine, setMedicine] = useState('')
    const [form, setForm] = useState('')
    const [strength, setStrength] = useState('')
    const [generic, setGeneric] = useState('')
    const [pharma, setPharma] = useState('')

    const [morning, setMorning] = useState(NaN)
    const [evening, setEvening] = useState(NaN)
    const [night, setNight] = useState(NaN)

    const [after, setAfter] = useState('')
    const [day, setDay] = useState(0)
    const [remark, setRemark] = useState('')
    const [doses, setDoses] = useState('')

    useEffect(() => {
        //Fetch from Api
        const funFetch = async () => {
            try {
                const response = await fetch(`${apiV1}/medicines/?search_medicine=${medicine}&skip=0&limit=100`)
                if (response.ok) {
                    const data = await response.json()
                    setArr(data)
                }
            } catch (err) {}
        }
        if (medicine.length !== 0) {
            funFetch()
        }
        //Medicine name set from object

        if (medicineObj.name && medicineObj.name !== medicine) {
            setId(medicineObj.id)
            setMedicine(medicineObj.name)
            setForm(medicineObj.form)
            setStrength(medicineObj.strength)
            setGeneric(medicineObj.generic)
            setPharma(medicineObj.pharmaceuticals)
            setMedicineObj({ ...medicineObj, name: '' })
        }

        // doses
        let dosesString = ''
        if (
            (isNaN(morning) === true || morning === 0) &&
            (isNaN(evening) === true || evening === 0) &&
            (isNaN(night) === true || night === 0)
        ) {
            dosesString = ''
        } else {
            dosesString =
                (isNaN(morning) ? 0 : morning) +
                ' + ' +
                (isNaN(evening) ? 0 : evening) +
                ' + ' +
                (isNaN(night) ? 0 : night)
        }
        setDoses(dosesString)
    }, [medicineObj, medicine, apiV1, morning, evening, night])

    const submit = (e) => {
        e.preventDefault()

        dispatchMedicine({
            type: 'input',
            payload: [
                ...stateMedicine.medicine,
                {
                    id,
                    name: medicine,
                    form,
                    strength,
                    generic,
                    pharma,
                    doses: doses,
                    after,
                    day: isNaN(day) ? 0 : day,
                    remark,
                },
            ],
        })
        setId(0)
        setMedicine('')
        setForm('')
        setStrength('')
        setGeneric('')
        setMorning(0)
        setEvening(0)
        setNight(0)
        setAfter('')
        setDay('')
        setRemark('')

        window.location.reload()
    }

    return (
        <div className={classes.InputMedicine}>
            <form>
                <div className={classes.formWrap}>
                    <InputField text={medicine} setText={setMedicine} label="Medicine name" />
                    {medicine.length !== 0 ? (
                        arr.length !== 0 && !arr.some((obj) => obj.id === id) ? (
                            <SuggestionMedicine objArr={arr} setObj={setMedicineObj} />
                        ) : null
                    ) : null}

                    <div className={classes.typeWrap}>
                        <InputField text={form} setText={setForm} label="Form" />
                        <InputField text={strength} setText={setStrength} label="Strength" />
                        <InputField text={generic} setText={setGeneric} label="Generic name" />
                    </div>
                    <div className={classes.timeWrap}>
                        <InputNumber num={morning} setNum={setMorning} label="Morning" negetive={false} step={'0.1'} />
                        <InputNumber num={evening} setNum={setEvening} label="Evening" negetive={false} step={'0.1'} />
                        <InputNumber num={night} setNum={setNight} label="Night" negetive={false} step={'0.1'} />
                        <DropDown drop={after} setDrop={setAfter} arr={option} />
                        <InputNumber text={day} setNum={setDay} label="Day" negetive={false} />
                    </div>
                </div>
                <InputField text={remark} setText={setRemark} label="Remark" />
                <button onClick={submit}>Submit</button>
            </form>
        </div>
    )
}

export default InputMedicine
