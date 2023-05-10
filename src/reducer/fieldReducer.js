import { EpGetStorage, EpSetStorage, EpDefStorage } from '../utils/EpLocalStorage'

//Set state as default storage value
export const fieldState = EpDefStorage('field', { field: 'medicine' })

export const fieldReducer = (state, action) => {
    switch (action.type) {
        case 'medicine':
            EpSetStorage('field', { field: 'medicine' })
            return JSON.parse(EpGetStorage('field'))
        case 'chief':
            EpSetStorage('field', { field: 'chief' })
            return JSON.parse(EpGetStorage('field'))
        case 'history':
            EpSetStorage('field', { field: 'history' })
            return JSON.parse(EpGetStorage('field'))
        case 'onexam':
            EpSetStorage('field', { field: 'onexam' })
            return JSON.parse(EpGetStorage('field'))
        case 'investigation':
            EpSetStorage('field', { field: 'investigation' })
            return JSON.parse(EpGetStorage('field'))
        case 'diagnosis':
            EpSetStorage('field', { field: 'diagnosis' })
            return JSON.parse(EpGetStorage('field'))
        case 'advice':
            EpSetStorage('field', { field: 'advice' })
            return JSON.parse(EpGetStorage('field'))
        case 'next':
            EpSetStorage('field', { field: 'next' })
            return JSON.parse(EpGetStorage('field'))
        case 'refer':
            EpSetStorage('field', { field: 'refer' })
            return JSON.parse(EpGetStorage('field'))
        default:
            return state
    }
}
