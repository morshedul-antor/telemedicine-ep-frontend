import { useState, useReducer } from 'react'
import { coMorbidityReducer, coMorbidityState } from '../../../../reducer/coMorbidityReducer'
import classes from './CoMorbidity.module.css'

const CoMorbidity = () => {
    const [stateCoMorbidity, dispatchCoMorbidity] = useReducer(coMorbidityReducer, coMorbidityState)

    const [htn, setHtn] = useState({ check: false, title: '', remark: '' })
    const [dm, setDm] = useState({ check: false, title: '', remark: '' })
    const [tb, setTb] = useState({ check: false, title: '', remark: '' })
    const [asm, setAsm] = useState({ check: false, title: '', remark: '' })

    // const { dispatchCoMorbidity } = useContext(History)

    const res = [
        htn.check ? { name: 'htn', title: 'Hypertension (HTN)', remark: htn.remark } : null,
        dm.check ? { name: 'dm', title: 'Diabetes (DM)', remark: dm.remark } : null,
        tb.check ? { name: 'tb', title: 'Tuberculosis (TB)', remark: tb.remark } : null,
        asm.check ? { name: 'asm', title: 'Asthma', remark: asm.remark } : null,
    ]

    let resFilter = res.filter((el) => {
        return el != null
    })

    const submit = (e) => {
        e.preventDefault()

        dispatchCoMorbidity({
            type: 'input',
            payload: resFilter,
        })

        setHtn({ check: false, title: '', remark: '' })
        setDm({ check: false, title: '', remark: '' })
        setTb({ check: false, title: '', remark: '' })
        setAsm({ check: false, title: '', remark: '' })

        window.location.reload()
    }

    return (
        <div className={classes.CoMorbidity}>
            <h4>
                Co-Morbidity <span>Remark</span>
            </h4>
            <div className={classes.wrapper}>
                <div className={classes.check}>
                    <p>
                        Hypertension (HTN)<span>{htn.check ? '+' : null}</span>
                    </p>
                    <button
                        onClick={() => setHtn({ check: !htn.check, remark: htn.remark })}
                        className={htn.check ? classes.active : classes.deactive}>
                        +/-
                    </button>
                    {htn.check ? (
                        <input onChange={(e) => setHtn({ check: htn.check, remark: e.target.value })} type="text" />
                    ) : null}
                </div>
                <div className={classes.check}>
                    <p>
                        Diabetes (DM)<span>{dm.check ? '+' : null}</span>
                    </p>
                    <button
                        onClick={() => setDm({ check: !dm.check, remark: dm.remark })}
                        className={dm.check ? classes.active : classes.deactive}>
                        +/-
                    </button>
                    {dm.check ? (
                        <input onChange={(e) => setDm({ check: dm.check, remark: e.target.value })} type="text" />
                    ) : null}
                </div>
                <div className={classes.check}>
                    <p>
                        Tuberculosis (TB)<span>{tb.check ? '+' : null}</span>
                    </p>
                    <button
                        onClick={() => setTb({ check: !tb.check, remark: tb.remark })}
                        className={tb.check ? classes.active : classes.deactive}>
                        +/-
                    </button>
                    {tb.check ? (
                        <input onChange={(e) => setTb({ check: tb.check, remark: e.target.value })} type="text" />
                    ) : null}
                </div>
                <div className={classes.check}>
                    <p>
                        Asthma<span>{asm.check ? '+' : null}</span>
                    </p>
                    <button
                        onClick={() => setAsm({ check: !asm.check, remark: asm.remark })}
                        className={asm.check ? classes.active : classes.deactive}>
                        +/-
                    </button>
                    {asm.check ? (
                        <input onChange={(e) => setAsm({ check: asm.check, remark: e.target.value })} type="text" />
                    ) : null}
                </div>
                <button onClick={submit}>Submit</button>
            </div>
        </div>
    )
}

export default CoMorbidity
