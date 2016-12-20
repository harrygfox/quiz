import test from 'tape';
import saveExpiringTokenForUser from '../../../server/lib/saveExpiringTokenForUser';
import { testClient } from '../../utils/init';
import query from '../../../server/lib/query';

test('`saveExpiringTokenForUser` works', (t) => {

    t.plan(3);
    const email = 'student@city.ac.uk';
    const reset_password_code = 'testing-resetting-password-code';
    const code_expiry = '12345667890';
    const expected = {
        email: 'student@city.ac.uk',
        username: 'student'
    };
    saveExpiringTokenForUser(testClient, email, reset_password_code, code_expiry, (error, response) => {

        if (error) {
            console.error(error);
        }
        t.deepEquals(response, expected, 'database returns correct details for the user');

        const queryText = 'SELECT * FROM users WHERE email = $1';
        const userEmail = [email];
        query(testClient, queryText, userEmail, (error, result) => {
            if (error) {
                t.error(error);
            }
            const expected_reset_password_code = result.rows[0].reset_password_code;
            const expected_code_expiry = result.rows[0].code_expiry;
            t.deepEqual(expected_reset_password_code, reset_password_code, 'password code has been set');
            t.deepEqual(expected_code_expiry, code_expiry, 'code expiry has been set');
        });
    });
});
