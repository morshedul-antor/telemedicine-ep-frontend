import { faStethoscope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classes from './Landing.module.css'

const Landing = () => {
    return (
        <div className={classes.Landing}>
            <div className={classes.Wrap}>
                <h1>
                    <FontAwesomeIcon icon={faStethoscope} />
                    LiveDoc
                </h1>
            </div>
        </div>
    )
}

export default Landing
