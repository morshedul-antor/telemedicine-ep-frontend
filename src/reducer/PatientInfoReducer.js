import { EpGetStorage, EpSetStorage, EpDefStorage } from '../utils/EpLocalStorage'

const demoId = parseInt(process.env.REACT_APP_DEMO_ID)

//Set state as default storage value
export const patientState = EpDefStorage('patient', {
    patient: {
        id: demoId,
        cause_of_consultation: '',
        name: '',
        phone: '',
        sex: 'not selected',
        year: '',
        month: '',
        address: '',
    },
})

export const patientReducer = (state, action) => {
    switch (action.type) {
        case 'input':
            EpSetStorage('patient', { patient: action.payload })
            return JSON.parse(EpGetStorage('patient'))
        case 'remove':
            EpSetStorage('patient', {
                patient: {
                    id: demoId,
                    cause_of_consultation: '',
                    name: '',
                    phone: '',
                    sex: 'not selected',
                    year: '',
                    month: '',
                    address: '',
                },
            })
            return JSON.parse(EpGetStorage('patient'))
        default:
            return state
    }
}
