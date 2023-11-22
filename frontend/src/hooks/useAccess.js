import { useState } from 'react';
import { useAuth } from './useAuth';
import axios from '../api/axios';

const ACCESS_URL = "/auth/signin";

export const useAccess = () => {

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useAuth();

    const access = async (username, password) => {

        setIsLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await axios.post(ACCESS_URL, { username, password }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            if (response?.data.status >= 300) {
                return setError(response.data.message);
            };

            // Obtain access data from the response
            const auth = response.data;

            // Save the access data in local storage
            localStorage.setItem('auth', JSON.stringify(auth));

            // Update the auth context
            dispatch({ type: 'signin', payload: auth });

            setIsLoading(false);
            setSuccess("Access granted");

        } catch (err) {

            setIsLoading(false);

            if (!err?.response) {
                setError("Something went wrong");
            } else {
                setError(err.response.data.message);
            }

        }

    };

    return { access, isLoading, error, setError, success };

};