const test = require('tape');
const setQuizToPresented = require('../../../server/lib/setQuizToPresented');
const query = require('../../../server/lib/query');
const { pool } = require('../../utils/init');

test('setQuizToPresented updates a quiz\'s `is_presented` column value', (t) => {

    t.plan(2);

    var quiz_id = 1;
    const expectedRows = [{ is_presented: true }];

    setQuizToPresented(pool, quiz_id, (error) => {

        if (error) {
            console.error(error);
        }
        const queryText = "SELECT is_presented FROM quizzes WHERE quiz_id = $1";
        query(pool, queryText, [1], (error, result) => {

            t.notOk(error, 'Function executed without error');
            t.deepEqual(result.rows, expectedRows, "is_presented now set to true");
        });
    });
});
