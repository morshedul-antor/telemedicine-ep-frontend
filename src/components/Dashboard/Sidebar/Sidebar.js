import { faStethoscope, faPills } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useContext } from 'react'
import { FieldContext } from '../../../allContext'
import classes from './Sidebar.module.css'
import SubmitEP from './SubmitEP/SubmitEP'

const Sidebar = () => {
    const { state, dispatch } = useContext(FieldContext)

    return (
        <div className={classes.Sidebar}>
            <div className={classes.epLogo}>
                <p>
                    <FontAwesomeIcon icon={faStethoscope} />
                    LiveDoc
                </p>
            </div>

            <ul className={classes.nav}>
                <li
                    onClick={() => dispatch({ type: 'medicine' })}
                    className={state.field === 'medicine' ? classes.active : null}>
                    <FontAwesomeIcon icon={faPills} />
                    Medicine
                </li>
            </ul>
            <SubmitEP />
        </div>
    )
}

export default Sidebar
