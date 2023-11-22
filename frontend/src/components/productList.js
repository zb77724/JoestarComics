import { useFetch } from '../hooks/useFetch';
import { useEffect, useState, useReducer } from 'react';
import { ProductPreview } from './ProductPreview';
import { SearchPanel } from './SearchPanel';

const PRODUCTS_URL = "/products";

// Reducer function for the filter
const filterReducer = (state, action) => {
    switch (action.type) {
        case "search":
            return {
                ...state,
                search: action.payload
            }
        case "ageRating":
            return {
                ...state,
                ageRatingId: action.payload
            }
        case "country":
            return {
                ...state,
                countryId: action.payload
            }
        case "series":
            return {
                ...state,
                seriesId: action.payload
            }
        case "filter":
            return {
                ...state,
                filtered: true
            }
    }
}

export const ProductList = ({ category }) => {
    const { fetch, error } = useFetch();
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [results, setResults] = useState([]);

    // Fetch products
    useEffect(() => {
        (async () => {

            const data = await fetch(PRODUCTS_URL);

            if (!error && data) {
                if (category) {
                    setProducts(data.products.filter(({ category: { name } }) => name === category));
                } else {
                    setProducts(data.products);
                }
                
            }
            
        })();
    }, [category]);

    // Search products
    useEffect(() => {
        if (search) {
            setResults(products.filter(({ name }) => name.toLowerCase().includes(search.toLowerCase())));
        } else {
            setResults([]);
        }
    }, [search]);

    return (
        <div className="productWrapper">
            <SearchPanel search={search} setSearch={setSearch} />
            <div className="wrapper">
                <div 
                className={products.length >=4 ? "productGrid" : "productFlex"}>
                    { results.length > 0 ?
                    results.map((p) => (
                        <ProductPreview key={p.id} product={p} />
                    ))
                    : products.map((p) => (
                        <ProductPreview key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </div>
    );

};