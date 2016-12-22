import test from 'tape';
import sinon from 'sinon';
import createThunk from '../../utils/mockThunk';
import * as actions from '../../../src/js/actions/register';
import * as userActions from '../../../src/js/actions/user.js';
import deepFreeze from '../../utils/deepFreeze';
import { registeringUserError as error } from '../../utils/action-fixtures';
// modules that get stubbed with sinon
import axios from 'axios';
import { hashHistory } from 'react-router';


const createSandbox = () => sinon.sandbox.create();

test('updateInputField action creator returns expected action', (t) => {

    t.plan(1);
    const value = 'emailaddress';
    const inputKey = 'email';

    const expected = {
        type: actions.UPDATE_INPUT_FIELD,
        value,
        inputKey
    };

    const actual2 = deepFreeze(actions.updateInputField(inputKey, value));
    t.deepEqual(actual2, expected);
});

test('UserExists action creator returns expected action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.USER_EXISTS
    };
    const actual = deepFreeze(actions.userExists());
    t.deepEqual(actual, expected);
});

// -----
// REGISTERING USER
// -----

test('registeringUser async action creator: user exists', (t) => {

    t.plan(2);
    let email = 'test@test.com';
    let username = 'testing';
    let password = 'testing';
    let is_lecturer = true;
    const { dispatch, queue } = createThunk();

    const userExistsPromise = new Promise((resolve) => {
        resolve({ data: true });
    });
    const sandbox = createSandbox();
    sandbox.stub(axios, 'post').returns(userExistsPromise);

    dispatch(actions.registeringUser(email, username, password, is_lecturer));

    setTimeout(() => {

        let actual = queue.shift();
        let expected = {
            type: actions.REGISTERING_USER_REQUEST
        };
        t.deepEqual(actual, expected, 'flags request');

        actual = queue.shift();
        expected = {
            type: actions.USER_EXISTS
        };
        t.deepEqual(actual, expected, 'flags a "user exists message"');
        sandbox.restore();
    }, 300);

});

test('registeringUser async action creator: verification email sent', (t) => {

    t.plan(2);
    let email = 'test@test.com';
    let username = 'testing';
    let password = 'testing';
    let is_lecturer = true;
    const { dispatch, queue } = createThunk();

    const userExistsPromise = new Promise((resolve) => {
        resolve({ data: { emailSent: true } });
    });
    const sandbox = createSandbox();
    sandbox.stub(axios, 'post').returns(userExistsPromise);
    const spyHashHistory = sandbox.spy(hashHistory, 'push');

    dispatch(actions.registeringUser(email, username, password, is_lecturer));

    setTimeout(() => {

        const actual = queue.shift();
        const expected = {
            type: actions.REGISTERING_USER_REQUEST
        };
        t.deepEqual(actual, expected, 'flags request');
        t.ok(spyHashHistory.calledWith('/please-verify'), 'redirects to "please-verify"');
        sandbox.restore();
    }, 300);

});

test('registeringUser async action creator: redirect to dashboard', (t) => {

    t.plan(4);
    let email = 'test@test.com';
    let username = 'testing';
    let password = 'testing';
    let is_lecturer = false;
    const { dispatch, queue } = createThunk();

    const responseData = {
        ...require('../../utils/data-fixtures.js').userDetails,
        is_lecturer: false
    };
    const userExistsPromise = new Promise((resolve) => {
        resolve({ data: responseData });
    });
    const sandbox = createSandbox();
    sandbox.stub(axios, 'post').returns(userExistsPromise);
    const spyHashHistory = sandbox.spy(hashHistory, 'push');

    dispatch(actions.registeringUser(email, username, password, is_lecturer));

    setTimeout(() => {

        let actual = queue.shift();
        let expected = {
            type: actions.REGISTERING_USER_REQUEST
        };
        t.deepEqual(actual, expected, 'flags request');

        actual = queue.shift();
        expected = {
            type: actions.REGISTERING_USER_SUCCESS,
            data: true
        };
        t.deepEqual(actual, expected, 'flags request success');

        actual = queue.shift();
        expected = {
            type: userActions.SET_USER_DETAILS,
            data: responseData
        };
        t.deepEqual(actual, expected, 'saves user details');
        t.ok(spyHashHistory.calledWith('/dashboard'), 'redirects to "dashboard"');
        sandbox.restore();
    }, 300);

});

test('registeringUserRequest creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.REGISTERING_USER_REQUEST,
    };

    const actual2 = deepFreeze(actions.registeringUserRequest());
    t.deepEqual(actual2, expected);
});

test('registeringUserSuccess creates the correct action', (t) => {

    t.plan(1);
    const data = true;
    const expected = {
        type: actions.REGISTERING_USER_SUCCESS,
        data
    };

    const actual2 = deepFreeze(actions.registeringUserSuccess(data));
    t.deepEqual(actual2, expected);
});

test('registeringUserFailure creates the correct action', (t) => {

    t.plan(1);

    const expected = {
        type: actions.REGISTERING_USER_FAILURE,
        error
    };
    const actual = deepFreeze(actions.registeringUserFailure(error));
    t.deepEqual(actual, expected);
});
