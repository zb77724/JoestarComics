import { useAuth } from './useAuth';

export const useLogout = () => {
    const { dispatch } = useAuth();

    const logout = () => {
        // Clear local storage
        localStorage.removeItem('auth');

        // Clear auth context
        dispatch({ type: "logout" });
    }

    return logout;

};