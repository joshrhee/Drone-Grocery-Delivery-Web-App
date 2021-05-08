import {FIRST_NAME, STREET, LAST_NAME, CITY, USER_NAME, STATE, PASSWORD, ZIP,
    CARD_NUMBER, CVV, EXP, CHAIN_NAME, STORE_NAME} from './type.js'
import {combineReducers} from 'redux';


const initialState = {
    FirstName: "",
    Street: "",
    LastName: "",
    City: "",
    Username: "",
    State: "AL",
    Pass: "",
    Zipcode: "",
    CcNumber: "",
    CVV: "",
    EXP_DATE: "",
    ChainName: "",
    StoreName: ""
};

const userInfoReducer =(state=initialState, action) => {
    switch (action.type) {
        case FIRST_NAME:
            return {
                ...state,
                FirstName: action.payload == null ? "" : action.payload
            }
        case LAST_NAME:
            return {
                ...state,
                LastName: action.payload == null ? "" : action.payload
            }
        case STREET:
            return {
                ...state,
                Street: action.payload == null ? "" : action.payload
            }
        case CITY:
            return {
                ...state,
                City: action.payload == null ? "" : action.payload
            }
        case USER_NAME:
            return {
                ...state,
                Username: action.payload == null ? "" : action.payload
            }
        case STATE:
            return {
                ...state,
                State: action.payload == null ? "" : action.payload
            }
        case PASSWORD:
            return {
                ...state,
                Pass: action.payload == null ? "" : action.payload
            }
        case ZIP:
            return {
                ...state,
                Zipcode: action.payload  == null ? "" : action.payload
            }
        case CARD_NUMBER:
            return {
                ...state,
                CcNumber: action.payload == null ? "" : action.payload
            }
        case CVV:
            return {
                ...state,
                CVV: action.payload == null ? "" : action.payload
            }
        case EXP:
            return {
                ...state,
                EXP_DATE: action.payload == null ? "" : action.payload
            }
        case CHAIN_NAME:
            return {
                ...state,
                ChainName: action.payload == null ? "" : action.payload
            }
        case STORE_NAME:
            return {
                ...state,
                StoreName: action.payload == null ? "" : action.payload
            }
        default:
            return state
    }
 }
 

export default combineReducers({
    userInfoReducer
})
