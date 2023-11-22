import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext({});

// -------------> Reducer function to manage auth state
export const authReducer = (state, action) => {
    switch(action.type) {
        case "signin":
            return {
                auth: action.payload
            }
        case "logout":
            return {
                auth: null
            }
        default:
            return {
                state
            }
    }
};

// -------------> Auxiliary function to check for auth data in local storage
export const checkSession = (dispatch) => {
    const lsAuth = JSON.parse(localStorage.getItem('auth'));

    if (lsAuth) {
        dispatch({ type: "signin", payload: lsAuth });
    } 
};

export const AuthContextProvider = ({ children }) => {
    // -------------> State to manage auth data
    const [state, dispatch] = useReducer(authReducer, { auth: null });

    // -------------> Check local storage
    useEffect(() => {
        checkSession(dispatch);
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            { children }
        </AuthContext.Provider>
    );
};