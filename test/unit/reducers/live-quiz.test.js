import test from 'tape';
import { liveQuiz as liveQuizState } from '../../utils/reducer-fixtures';
import reducer from '../../../src/js/reducers/live-quiz';
import deepFreeze from '../../utils/deepFreeze';

test('SET_QUIZ_ID works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(liveQuizState);
    const quiz_id = 1;
    const action = {
        type: 'SET_QUIZ_ID',
        quiz_id
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { quiz_id });

    t.deepEqual(actual, expected);
});


test('START_QUIZ works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(liveQuizState);
    const action = {
        type: 'START_QUIZ',
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { isQuizStarted: true });

    t.deepEqual(actual, expected);
});

test('END_QUIZ works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(liveQuizState);
    const action = {
        type: 'END_QUIZ',
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { isQuizStarted: false });

    t.deepEqual(actual, expected);
});

test('NEXT_QUESTION works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(liveQuizState);
    const action = {
        type: 'NEXT_QUESTION',
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { nextQuestionIndex: 1 });

    t.deepEqual(actual, expected);
});

test('PREVIOUS_QUESTION works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(
        Object.assign(
            {},
            liveQuizState,
            { nextQuestionIndex: 4 }
        )
    );

    const action = {
        type: 'PREVIOUS_QUESTION',
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { nextQuestionIndex: 3 });

    t.deepEqual(actual, expected);
});

test('SAVE_INTERVAL_ID works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(Object.assign({}, liveQuizState));
    const interval_id = 100;
    const action = {
        type: 'SAVE_INTERVAL_ID',
        interval_id
    };

    const actual = reducer(initialState, action);
    const expected = Object.assign({}, liveQuizState, { interval_id: 100 });

    t.deepEqual(actual, expected);
});