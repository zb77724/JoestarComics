import { createContext, useReducer, useEffect } from "react";

export const CartContext = createContext({});

// -------------> Reducer function to manage auth state
export const cartReducer = (state, action) => {
    switch(action.type) {
        case "add":
            if (state?.purchases.length > 0) {
                return {
                    purchases: [...state.purchases, action.payload]
                }
            } else {
                return {
                    purchases: [action.payload]
                }
            }
            break;
        case "reset":
            return {
                purchases: []
            }
        default:
            return {
                state
            }
            break;
    }
};

export const CartContextProvider = ({ children }) => {
    // -------------> State to manage auth data
    const [state, dispatch] = useReducer(cartReducer, { purchases: [] });

    return (
        <CartContext.Provider value={{ ...state, dispatch }}>
            { children }
        </CartContext.Provider>
    );
};