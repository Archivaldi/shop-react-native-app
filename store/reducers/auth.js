import { AUTHENTICATE, LOGOUT, SET_TRID_LOGIN } from "../actions/auth";

const initialState = {
    token: null,
    userId: null,
    triedLogin: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case AUTHENTICATE: 
            return {
                token: action.token,
                userId: action.userId,
                triedLogin: true
            }
        case SET_TRID_LOGIN: 
            return {
                ...state,
                triedLogin: true
            }
        case LOGOUT: 
            return initialState;
        default:
            return state;
    }
}