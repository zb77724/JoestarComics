import { useAuth } from '../hooks/useAuth';
import axios from '../api/axios';
import { useEffect, useReducer, useState } from 'react';
import { useCart } from '../hooks/useCart';
import { useFetch } from '../hooks/useFetch';

const PRODUCTURL = "/products";
const ORDERSURL = "/orders";

const productReducer = (state, action) => {
    switch(action.type) {
        case "add":
            if (state.products?.length > 0) {
                console.log("stateproducts:", state.products);
                return {
                    products: [...state.products, action.payload]
                }
            } else {
                return {
                    products: [action.payload]
                }
            }
            break;
        case "reset":
            return {
                products: []
            }
            break;
    }
};

export const Cart = () => {
    const { fetch } = useFetch();
    const { purchases, dispatch } = useCart();
    const [reset, setReset] = useState(false);
    const { auth } = useAuth();
    const { user_id, access_token } = auth;
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [state, productDispatch] = useReducer(productReducer, { products: [] });

    // --------> Fetch the added products by ID
    useEffect(() => {
        if (purchases?.length > 0) {

            const productIds = purchases.map(({product_id}) => product_id);

            for (let x in productIds) {
                (async () => {
                    const data = await fetch(`${PRODUCTURL}/${productIds[x]}`);
                    console.log(data);
                    productDispatch({ type: "add", payload: data.products[0] });
                })();
            }

        } else {
            productDispatch({ type: "reset" });
        }
    }, [purchases, reset]);

    // --------> Make an order
    const handlePurchase = async () => {

        const data = { user_id, purchases };

        try {
            const response = await axios.post(ORDERSURL, JSON.stringify(data), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                withCredentials: true
            });

            setSuccess(response.data.message);
        } catch (err) {
            if (!err?.response) {
                setError("Something went wrong");
            } else {
                setError(err.response.data.message);
            }
        }
    };

    return (
        <div className="page">
            <div className="wrapper">
                <div className="cartWrapper">
                    <h1 className="title-1">Cart</h1>
                    { error && <div className="message warning">{error}</div> }
                    { success && <div className="message success">{success}</div> }
                    <div className="cartPanel">
                        <span className="title-2">{`Total Price: $${state.products?.reduce((accum, product) => accum + product?.price, 0)}`}</span>
                        <button 
                        className="btn"
                        onClick={() => {
                            dispatch({ type: "reset" });
                            setReset(!reset);
                        }}
                        >
                            Reset
                        </button>
                        <button 
                        className="btn"
                        onClick={handlePurchase}
                        >
                            Purchase
                        </button>
                    </div>
                    { state.products?.length > 0 &&
                    <div className="smallProductWrapper">
                        <div className="smallProductList">
                            { state.products?.map((p) => (
                                <div className="productRow">
                                    <img 
                                    className="smallProductImage"
                                    src={p?.images[0]}
                                    alt={p?.name}
                                    />
                                    <div className="smallProductDetails">
                                        <span className="title-2">{p?.name}</span>
                                        <span className="title-2">{`$${p?.price}`}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    }
                </div>
            </div>
        </div>
    );

};