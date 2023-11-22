import { AuthContext } from '../context/AuthContext';
import { useContext } from 'react';

export const useAuth = () => {
    // -------------> Obtain data from context
    const context = useContext(AuthContext);

    // -------------> Check if context is not null
    if (!context) {
        throw new Error("useAuth should only be used within an AuthContextProvider");
    }


    return context;

};