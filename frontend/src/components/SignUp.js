import { useState, useEffect } from 'react';
import { useAccess } from '../hooks/useAccess';
import axios from '../api/axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const SIGNUP_URL = '/signup';

export const SignUp = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [matchPassword, setMatchPassword] = useState("");
    const [viewPassword, setViewPassword] = useState(false);
    const [viewMatchPassword, setViewMatchPassword] = useState(false);
    const [isValid, setIsValid] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const navigate = useNavigate();
    const { state } = useLocation();
    const { from = "/" } = state || {};
    const { access, isLoading: isAccessLoading, error: accessError, success: accessSuccess } = useAccess();

    const handleSubmit = async (e) => {

        setIsLoading(true);

        e.preventDefault();
        
        try {
            const response = await axios.post(SIGNUP_URL,
                JSON.stringify({ username, email, password }), 
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

            if (response?.data.status >= 300) {
                return setError(response.data.message);
            };

            setSuccess(response.data.message);

        } catch (err) {
            if (!err?.response) {
                setError("Something went wrong");
            } else {
                setError(err.response.data.message);
            }
        }

        if (!error) {
            try {

                setSuccess(false);
            
                await access(username, password);
                
                setIsLoading(isAccessLoading);
                setSuccess(accessSuccess);

                if(accessError) {
                    setError(accessError);
                }
        
                if (!error) {
                    setUsername("");
                    setEmail("");
                    setPassword("");
                    setMatchPassword("");
                    navigate(from);
                }
                
            } catch {
                setError(accessError);
            }
        }
    }

    useEffect(() => {

        if (username.length > 0 && 
            email.length > 0 && 
            password.length > 0 && 
            matchPassword.length > 0) {
            if (matchPassword === password) {
                setError(null);
                setIsValid(true);
            } else {
                setIsValid(false);
            }
        } else {
            setIsValid(false);
        }
        
    }, [username, email, password, matchPassword]);

    return (
        <div className="bg">
            <div className="form-page">
                <form onSubmit={handleSubmit} className="form">
                    <h1 className="title-1 ">Join the Dark Side</h1>
                    { error && <div className="message warning">{error}</div> }
                    { success && <div className="message success">{success}</div> }
                    <div className="fields">
                        <div className="labelInput">
                            <label className="label" htmlFor="username">Username</label>
                            <input
                                id="username"
                                className="input"
                                type="text"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                            />
                        </div>
                        <div className="labelInput">
                            <label className="label" htmlFor="email">Email</label>
                            <input
                                id="email"
                                className="input"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                            />
                        </div>
                        <div className="labelInput">
                            <label className="label" htmlFor="password">Password</label>
                            <div className="inputBtn">
                                <input
                                    id="password"
                                    className="field"
                                    type={viewPassword ? "text" : "password"}
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                                <div
                                onClick={() => setViewPassword(!viewPassword)}
                                className="ibtn"
                                >
                                    { viewPassword ?
                                        <FontAwesomeIcon icon={faEye} /> :
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="labelInput">
                            <label className="label" htmlFor="matchPassword">Match Password</label>
                            <div className="inputBtn">
                                <input
                                    id="matchPassword"
                                    className={matchPassword.length > 0 ? "filled field" : "field"}
                                    type={viewMatchPassword ? "text" : "password"}
                                    onChange={(e) => setMatchPassword(e.target.value)}
                                    value={matchPassword}
                                    required
                                />
                                <div
                                onClick={() => setViewMatchPassword(!viewMatchPassword)}
                                className="ibtn"
                                >
                                    { viewMatchPassword ?
                                        <FontAwesomeIcon icon={faEye} /> :
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <button 
                    disabled={isLoading || !isValid || error} 
                    className={ isLoading ? "btn loading" : "btn"}>Submit</button>
                    <span className="text">Have an account already?</span>
                    <Link to="/signin" className="link">Access your account</Link>
                </form>
            </div>
        </div>
    );
};