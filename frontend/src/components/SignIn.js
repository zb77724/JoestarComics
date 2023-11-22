import { useState, useEffect } from 'react';
import { useAccess } from '../hooks/useAccess';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

export const SignIn = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [viewPassword, setViewPassword] = useState(false);
    const { access, isLoading, error, setError, success } = useAccess();
    const navigate = useNavigate();
    const { state } = useLocation();
    const { from = "/" } = state || {};

    const handleSubmit = async (e) => {

        e.preventDefault();

        await access(username, password);

        if (!error) {
            setUsername("");
            setPassword("");
            navigate(from);
        }

    };

    useEffect(() => {

        setIsValid(false);

        if (username.length > 0) {
            if (password.length > 0) {
                setError(null);
                setIsValid(true);
            }
        }
        
    }, [username, password]);

    return (
        <div className="bg">
            <div className="form-page">
                <form onSubmit={handleSubmit} className="form">
                    <h1 className="title-1">Access your account</h1>
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
                                className="ibtn">
                                    { viewPassword ?
                                        <FontAwesomeIcon icon={faEye} /> :
                                        <FontAwesomeIcon icon={faEyeSlash} />
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <button 
                    disabled={isLoading || !isValid || error}
                    className={ isLoading ? "btn loading" : "btn" }>Submit</button>
                    <span className="text">Don't have an account yet?</span>
                    <Link to="/signup" className="link">Sign Up</Link>
                </form>
            </div>
        </div>
    );
};