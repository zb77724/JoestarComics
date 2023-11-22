import { createContext, useReducer, useEffect } from "react";
import { useFetch } from '../hooks/useFetch';

// -------------> Declare request URL's
const AGERATINGS_URL = "/age_ratings";
const COUNTRIES_URL = "/countries";
const SERIES_URL = "/series";
const CATEGORIES_URL = "/categories";
const SUBCATEGORIES_URL = "/subcategories";
const COMPANIES_URL = "/companies";
const LANGUAGES_URL = "/languages";
const AUTHORS_URL = "/authors";
const GENRES_URL = "/genres";
const COLORS_URL = "/colors";
const MATERIALS_URL = "/materials";
const SIZES_URL = "/sizes";
const COVERS_URL = "/covers";

// -------------> Create data context
export const DataContext = createContext({});

// -------------> Reducer function to manage fetched data
const dataReducer = (state, action) => {
    switch (action.type) {
        case "ageRatings":
            return  {
                ...state,
                ageRatings: action.payload
            }
            break;
        case "countries":
            return  {
                ...state,
                countries: action.payload
            }
            break;
        case "categories":
            return  {
                ...state,
                categories: action.payload
            }
            break;
        case "subcategories":
            return  {
                ...state,
                subcategories: action.payload
            }
            break;
        case "series":
            return  {
                ...state,
                series: action.payload
            }
            break;
        case "genres":
            return  {
                ...state,
                genres: action.payload
            }
            break;
        case "authors":
            return  {
                ...state,
                authors: action.payload
            }
            break;
        case "colors":
            return  {
                ...state,
                colors: action.payload
            }
            break;
        case "materials":
            return  {
                ...state,
                materials: action.payload
            }
            break;
        case "sizes":
            return  {
                ...state,
                sizes: action.payload
            }
            break;
        case "companies":
            return  {
                ...state,
                companies: action.payload
            }
            break;
        case "languages":
            return  {
                ...state,
                languages: action.payload
            }
            break;
        case "covers":
            return  {
                ...state,
                covers: action.payload
            }
            break;
    }
};

export const DataContextProvider = ({ children }) => {

    // -------------> Obtain the fetch method
    const { fetch } = useFetch();

    // -------------> State to manage fetched data
    const [data, dispatch] = useReducer(dataReducer, { 
        ageRatings: [],
        countries: [],
        series: [],
        categories: [],
        subcategories: [],
        companies: [],
        languages: [],
        authors: [],
        genres: [],
        covers: [],
        materials: [],
        sizes: [],
        colors: []
    });

    // -------------> Fetch data
    useEffect(() => {
        // -------------> Declare an asynchronous, immediately invoked function expression
        (async () => {

            // -------------> Initialize a variable to store fetched data
            let data = await fetch(AGERATINGS_URL);

            // -------------> Save obtained data in state
            if (data) {
                dispatch({ type: "ageRatings", payload: data.age_ratings });
            }

            data = await fetch(COUNTRIES_URL);

            if (data) {
                dispatch({ type: "countries", payload: data.countries });
            } 

            data = await fetch(SERIES_URL);

            if (data) {
                dispatch({ type: "series", payload: data.series });
            }

            data = await fetch(CATEGORIES_URL);

            if (data) {
                dispatch({ type: "categories", payload: data.categories });
            } 

            data = await fetch(SUBCATEGORIES_URL);

            if (data) {
                dispatch({ type: "subcategories", payload: data.subcategories });
            } 

            data = await fetch(COMPANIES_URL);

            if (data) {
                dispatch({ type: "companies", payload: data.companies });
            } 

            data = await fetch(LANGUAGES_URL);

            if (data) {
                dispatch({ type: "languages", payload: data.languages });
            } 

            data = await fetch(COVERS_URL);

            if (data) {
                dispatch({ type: "covers", payload: data.covers });
            } 

            data = await fetch(GENRES_URL);

            if (data) {
                dispatch({ type: "genres", payload: data.genres });
            } 

            data = await fetch(AUTHORS_URL);

            if (data) {
                dispatch({ type: "authors", payload: data.authors });
            } 

            data = await fetch(COLORS_URL);

            if (data) {
                dispatch({ type: "colors", payload: data.colors });
            } 

            data = await fetch(SIZES_URL);

            if (data) {
                dispatch({ type: "sizes", payload: data.sizes });
            } 

            data = await fetch(MATERIALS_URL);

            if (data) {
                dispatch({ type: "materials", payload: data.materials });
            } 

        })();
    }, []);

    return (
        <DataContext.Provider value={{ ...data }}>
            { children }
        </DataContext.Provider>
    );
};