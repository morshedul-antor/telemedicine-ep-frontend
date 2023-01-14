const HistoryChildView = ({ data, title }) => {
    return (
        <div>
            {data.length !== 0 ? (
                <p>
                    {title}:{' '}
                    {data.map((v, i, array) => (
                        <b key={i}>
                            {v.history}
                            {array.length !== i + 1 ? ', ' : null}
                        </b>
                    ))}
                </p>
            ) : null}
        </div>
    )
}

export default HistoryChildView
