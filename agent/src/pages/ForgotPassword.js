import { useState } from 'react';
import axios from 'axios';

function ForgotPassword() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [emailVerified, setEmailVerified] = useState(false);

    const checkEmail = async () => {

        try {

            const res = await axios.post(
                'http://localhost:5000/api/agency/checkEmail',
                { email }
            );

            if (res.data.success) {
                setEmailVerified(true);
            }

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                error.message ||
                "Something went wrong"
            );

        }
    };


    const updatePassword = async () => {

        try {

            const res = await axios.post(
                'http://localhost:5000/api/agency/resetPassword',
                {
                    email,
                    password
                }
            );

            alert(res.data.message);

        } catch (error) {

            console.log(error);

            alert(
                error.response?.data?.message ||
                error.message ||
                "Something went wrong"
            );

        }
    };


    return (
        <div>

            <h2>Forgot Password</h2>

            {/* EMAIL INPUT */}
            <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            {!emailVerified ? (

                <button onClick={checkEmail}>
                    Verify Email
                </button>

            ) : (

                <>
                    <input
                        type="password"
                        placeholder="Enter new password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button onClick={updatePassword}>
                        Update Password
                    </button>
                </>

            )}

        </div>
    );
}

export default ForgotPassword;