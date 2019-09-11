import * as actionTypes from '../actions/actionsTypes';

const initialState = {
    userId: '',
    token: null,
    loading: false,
    error: null,
    authRedirectPath: '/'
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: {

            return { ...state, loading: true, error: null }
        }
        case actionTypes.AUTH_SUCCESS: {
            return { ...state, loading: false, userId: action.userId, token: action.token }
        }
        case actionTypes.AUTH_FAIL: {

            return { ...state, loading: false, error: action.error }
        }
        case actionTypes.AUTH_LOGOUT: {

            return { ...state, userId: null, token: null }
        }
        case actionTypes.SET_AUTH_REDIRECT_PATH: {

            return { ...state, authRedirectPath: action.path }
        }
        default:
            return state
    }
}

export default authReducer;
