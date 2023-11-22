import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { useCart } from '../hooks/useCart';

const PRODUCTURL = "/products"

export const ProductDetails = () => {
    const { purchases, dispatch } = useCart();
    const { fetch } = useFetch();
    const [product, setProduct] = useState();
    const [added, setAdded] = useState(false);

    // ----------> Get the product ID from the route parameters
    const { id } = useParams();

    // ----------> Fetch the product by ID
    useEffect(() => {
        (async () => {
            const data = await fetch(`${PRODUCTURL}/${id}`);
            const product = data.products[0];
            setProduct(product);
        })();
    }, []);

    // ----------> Check if the product was already added to cart
    useEffect(() => {

        // ----------> Obtain the IDs of the products already added to the cart
        const addedProductIds = purchases.map(({ product_id }) => parseInt(product_id));

        if (addedProductIds.includes(parseInt(id))) {
            setAdded(true);
        }

    }, [])

    // ----------> Structure the purchase data and add it to the cart context
    const addToCart = () => {
        if (!added) {
            dispatch({ type: "add", payload: { product_id: parseInt(id), quantity: 1 } });
            setAdded(true);
        }
    }

    return (
        <div className="page">
            <div className="wrapper">
                <div className="detailsWrapper">
                    <div className="detailsCell">
                        <div className="detailsBox">
                            <div className="detailsImageWrapper">
                                <img 
                                className="detailsImage" 
                                src={product?.images[0]}
                                alt={product?.name}
                                />
                            </div>
                            { !added ?
                            <button 
                            className="atcbtn"
                            onClick={addToCart}>
                                Add to Cart
                            </button> :
                            <div className="message">
                                Added to Cart
                            </div>
                            }
                            <div className="infoWrapper">
                                <div className="infoCell">
                                    { product?.category?.name === "comics" &&
                                    <>
                                        <span className="text">{`Country: ${product?.country.name}`}</span>
                                        <span className="text">{`Release Date: ${product?.category_details?.release_date.split("T")[0]}`}</span>
                                        <span className="text">{`Language: ${product?.category_details?.language.language}`}</span>
                                        <span className="text">{`Company: ${product?.category_details?.company.name}`}</span>
                                    </>
                                    }
                                    { product?.category?.name === "collectibles" &&
                                    <>
                                        <span className="text">{`Country: ${product?.country.name}`}</span>
                                        <span className="text">{`Company: ${product?.category_details?.company.name}`}</span>
                                        <span className="text">{`Available units: ${product?.quantity}`}</span>
                                    </>
                                    }
                                    { product?.category?.name === "clothes" &&
                                    <>
                                        <span className="text">{`Country: ${product?.country.name}`}</span>
                                        <span className="text">{`Material: ${product?.category_details?.material.name}`}</span>
                                        <span className="text">{`Size: ${product?.category_details?.size.size}`}</span>
                                        <span className="text">{`Available units: ${product?.quantity}`}</span>
                                    </>
                                    }
                                </div>
                                    { product?.category?.name === "comics" && 
                                    <div className="infoCell">
                                        <span className="text">{`Cover: ${product?.category_details?.cover.cover}`}</span>
                                        <span className="text">{`Colored: ${product?.category_details?.colored ? "yes" : "no"}`}</span>
                                        <span className="text">{`Available units: ${product?.quantity}`}</span>
                                    </div>
                                    }
                            </div>
                        </div>
                        <div className="detailsDescriptionWrapper">
                            <div className="productHeader">
                                <h1 className="productName">{product?.name}</h1>
                                <span className="tag">{product?.age_rating.age_rating}</span>
                            </div>
                            <h2 className="title-2">{`$${product?.price}`}</h2>
                            <span className="text">{product?.description}</span>
                        </div>
                    </div>
                    <div className="detailsCell">
                        <div className="tagWrapper">
                            <div className="infoCell">
                                <h3 className="title-3">Series</h3>
                                <div className="tagBox">
                                    { product?.series?.map(({ name }) => (
                                        <span className="tag">{name}</span>
                                    )) }
                                </div>
                            </div>
                            { product?.category?.name === "comics" &&
                            <>
                                <div className="infoCell">
                                    <h3 className="title-3">Authors</h3>
                                    <div className="tagBox">
                                        { product?.category_details?.authors?.map(({ name }) => (
                                            <span className="tag">{name}</span>
                                        )) }
                                    </div>
                                </div>
                                <div className="infoCell">
                                    <h3 className="title-3">Genres</h3>
                                    <div className="tagBox">
                                        { product?.category_details?.genres?.map(({ genre }) => (
                                            <span className="tag">{genre}</span>
                                        )) }
                                    </div>
                                </div>
                            </>
                            }
                            { product?.category?.name === "clothes" &&
                            <>
                                <div className="infoCell">
                                    <h3 className="title-3">Colors</h3>
                                    <div className="tagBox">
                                        { product?.category_details?.colors?.map(({ name }) => (
                                            <span className="tag">{name}</span>
                                        )) }
                                    </div>
                                </div>
                            </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
