import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch, useSelector, loginPassword, ELoginState } from '../../store';

import './login-page.scss';

import { ButtonSubmit, InputEmail, InputPassword } from '../../components/ui';


export const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const loginState = useSelector(state => (state.loginState))
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const pending = loginState === ELoginState.pending

    useEffect(() => {
        if (loginState === ELoginState.success) {
            navigate('/users', { replace: true });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loginState]);

    const onLoginSubmitClick = () => {
        dispatch(loginPassword({ email, password }))
    };

    return (
        <div id="page-login" className="page">
            <div className="page-container">
                <div className="page-title">
                    "Please Login"
                </div>
                <div className="form-">
                    <InputEmail
                        id="email"
                        disabled={pending}
                        placeholder="Email"
                        name={'email'}
                        value={email}
                        setValue={setEmail}
                    />
                    <InputPassword
                        id="password"
                        disabled={pending}
                        placeholder="Password"
                        name={'password'}
                        value={password}
                        setValue={setPassword}
                    />
                </div>
                <div className="form-notification">
                    {loginState === ELoginState.error && <div className="error">
                        email or password incorrect
                    </div>}
                </div>
                <ButtonSubmit onClick={onLoginSubmitClick} disabled={pending} label="login" />
            </div>
        </div>
    );
};