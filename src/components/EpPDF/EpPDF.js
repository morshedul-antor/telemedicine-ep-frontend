import React, { useRef, useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useReactToPrint } from 'react-to-print'
import { UserInfo } from '../../allContext'
import classes from './EpPDF.module.css'
import { GeneratePDF } from './GeneratePDF/GeneratePDF'
import HeaderUpdate from './HeaderUpdate'

const EpPDF = () => {
    const componentRef = useRef()
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const { stateUser } = useContext(UserInfo)
    const userDetail = stateUser.info

    const title = 'LiveDoc Prescription'
    useEffect(() => {
        document.title = title
    }, [title])

    const [header, setHeader] = useState(false)

    return (
        <div className={classes.EpPDF}>
            {userDetail.role_name === 'doctor' ? '' : ''}
            <GeneratePDF ref={componentRef} />
            <div className={classes.btnGroup}>
                <Link to="/">Back</Link>
                {userDetail.role_name === 'doctor' ? (
                    <button onClick={() => setHeader(!header)}>Update Prescription Header</button>
                ) : (
                    ''
                )}
                <button onClick={handlePrint}>Print</button>
            </div>
            <>{header ? <HeaderUpdate setter={setHeader} /> : null}</>
        </div>
    )
}

export default EpPDF
