import update from 'react-addons-update';
import * as actionsTypes from '../actions/user';
import isCookieMessageRequired from '../lib/isCookieMessageRequired';

export const initialState = {
    user_id: undefined,
    email: undefined,
    username: undefined,
    is_lecturer: undefined,
    is_super_admin: undefined,
    isFetchingUser: false,
    isCookieAccepted: isCookieMessageRequired(),
    error: undefined
};

export function user (state = initialState, action ) {
    switch (action.type) {

    case actionsTypes.SET_USER_DETAILS:
    case actionsTypes.GET_USER_DETAILS_SUCCESS:
        return setUserDetails(state, action);

    case actionsTypes.GET_USER_DETAILS_REQUEST:
        return update(state, {
            isFetchingUser: { $set: true }
        });

    case actionsTypes.GET_USER_DETAILS_FAILURE:
        return update(state, {
            isFetchingUser: { $set: false },
            error: { $set: action.error }
        });

    case actionsTypes.TOGGLE_COOKIE_MESSAGE:
        return update(state, {
            isCookieAccepted: { $set: false }
        });

    default:
        return state;
    }
}

function setUserDetails (state, action) {
    return update(state, {
        user_id: { $set: action.data.user_id },
        email: { $set: action.data.email },
        username: { $set: action.data.username },
        is_lecturer: { $set: action.data.is_lecturer },
        is_super_admin: { $set: action.data.is_super_admin }
    });
}
