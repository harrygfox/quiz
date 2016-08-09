import test from 'tape';
import { newQuiz as newQuizState } from '../../utils/reducer-fixtures';
import { newQuizWithQuestion as newQuizStateWithQuestion } from '../../utils/reducer-fixtures';
import { saveQuizError as error } from '../../utils/action-fixtures';
import reducer from '../../../src/js/reducers/new-quiz';
import deepFreeze from '../../utils/deepFreeze';

test('ADD_QUESTION works', (t) => {

    t.plan(1);

    const initialState = deepFreeze(newQuizState);
    const action = {
        type: 'ADD_QUESTION'
    };

    const expected = Object.assign({}, newQuizState,
        {
            questions: [{
                question: undefined,
                A: undefined,
                B: undefined,
                C: undefined,
                D: undefined,
                correct_answer: undefined
            }]
        }
    );

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

test('UPDATE_VALUE works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(newQuizStateWithQuestion);
    const inputType = 'question';
    const value = 'capital of England?';
    const index = 0;
    const action = {
        type: 'UPDATE_VALUE',
        inputType,
        value,
        index
    };

    const expected = Object.assign({}, newQuizStateWithQuestion,
        {
            questions: [{
                question: 'capital of England?',
                A: undefined,
                B: undefined,
                C: undefined,
                D: undefined,
                correct_answer: undefined
            }]
        }
     );

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);

});

test('UPDATE_QUIZ_NAME works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(newQuizState);
    const value = 'Week 1';
    const action = {
        type: 'UPDATE_QUIZ_NAME',
        value
    };

    const expected = Object.assign({}, newQuizState, { name: 'Week 1' });

    const result = reducer(initialState, action);
    t.deepEqual(result, expected);
});

// -----
// SAVE QUIZ
// -----

test('SAVE_QUIZ_REQUEST works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(newQuizState);
    const action = {
        type: 'SAVE_QUIZ_REQUEST'
    };
    const expected = Object.assign({}, newQuizState, { isSavingQuiz: true });
    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('SAVE_QUIZ_SUCCESS works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(newQuizState);
    const data = true;
    const action = {
        type: 'SAVE_QUIZ_SUCCESS',
        data
    };
    const expected = Object.assign({}, newQuizState, { isSavingQuiz: false });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});

test('SAVE_QUIZ_FAILURE works', (t) => {

    t.plan(1);
    const initialState = deepFreeze(newQuizState);
    const action = {
        type: 'SAVE_QUIZ_FAILURE',
        error
    };
    const expected = Object.assign({}, newQuizState, { isSavingQuiz: false, error: error });

    const result = reducer(initialState, action);

    t.deepEqual(result, expected);
});