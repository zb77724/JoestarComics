import axios from "../api/axios";
import { useState } from 'react';

export const useFetch = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetch = async (URL) => {

        try {
            setIsLoading(true);
    
            const response = await axios.get(URL, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            });

            const { data } = response;
            
            setIsLoading(false);
            
            return data;
    
        } catch (err) {
    
            setIsLoading(false);
    
            if (!err?.response) {
                setError("Something went wrong");
            } else {
                setError(err.response.data.message);
            }
    
        }

    };
    
    return { fetch, error, isLoading };
};