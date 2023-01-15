import { useState, useEffect } from 'react'

export default function Header({ classes, doc_id }) {
    const [headerData, setHeaderData] = useState([])
    const apiV1 = process.env.REACT_APP_API_V1

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`${apiV1}/ep/doctor-ep-header/${doc_id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            })

            const data = await response.json()
            if (response.ok) {
                setHeaderData(data)
            }
        }
        try {
            fetchData()
        } catch {
            setHeaderData([])
        }
    }, [apiV1, doc_id])

    let leftHeader = headerData?.filter((v) => v.header_side === 'left')
    let rightHeader = headerData?.filter((v) => v.header_side === 'right')

    return (
        <div className={classes.top}>
            <div className={classes.topLeft}>
                <h3>{leftHeader[0]?.heading}</h3>
                {leftHeader[0]?.body.split('\n')?.map((v, i) => {
                    return <p key={i}>{v}</p>
                })}
            </div>
            <div className={classes.topRight}>
                <h3>{rightHeader[0]?.heading}</h3>
                {rightHeader[0]?.body.split('\n')?.map((v, i) => {
                    return <p key={i}>{v}</p>
                })}
            </div>
        </div>
    )
}
