import test from 'tape';
import verifyCode from '../../../server/lib/verifyCode';
import { testClient } from '../../utils/init';
import query from '../../../server/lib/query';

test(' `verifyCode` returns true if the user code matches the one in the database', (t) => {
    t.plan(2);

    const verification_code = 'testing-verification-code';
    const expected = true;

    const queryText = 'SELECT * FROM users WHERE verification_code = $1';
    query(testClient, queryText, [verification_code], (error, user) => {

        verifyCode(testClient, verification_code, (error, isVerified) => {
            t.deepEqual(isVerified, expected, 'user is verfied');

            const queryText = 'SELECT * FROM users WHERE email = $1';
            const userEmail = [user.rows[0].email];
            query(testClient, queryText, userEmail, (error, result) => {
                if (error) {
                    t.error(error);
                }
                const expectedUser = Object.assign({}, user.rows[0], { is_verified: true, verification_code: null });
                t.deepEqual(result.rows[0], expectedUser, 'verification_code has been deleted');
            });

        });

    });



});
