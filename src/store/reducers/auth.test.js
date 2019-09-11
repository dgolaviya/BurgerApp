import authReducer from './auth';
import * as actionsTypes from '../actions/actionsTypes';
describe('Auth Reducer', () => {
    it('should return initial State', () => {
        expect(authReducer(undefined, {})).toEqual({
            userId: '',
            token: null,
            loading: false,
            error: null,
            authRedirectPath: '/'
        });
    });

    it('should store token upon login', () => {
        expect(authReducer({
            userId: '',
            token: null,
            loading: false,
            error: null,
            authRedirectPath: '/'
        },{
                type: actionsTypes.AUTH_SUCCESS,
                token: 'some-token',
                userId: 'some-userId'

            })).toEqual({
                userId: 'some-userId',
                token: 'some-token',
                loading: false,
                error: null,
                authRedirectPath: '/'
            });
    });
});