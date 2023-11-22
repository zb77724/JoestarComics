import { useEffect, useReducer } from 'react';
import axios from '../api/axios';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../hooks/useData';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

// -------------> Reducer function to manage form input data
const inputReducer = (state, action) => {
    switch(action.type) {
        case "name":
            return {
                ...state,
                name: action.payload
            }
            break;
        case "ageRating":
            return {
                ...state,
                age_rating: action.payload
            }
            break;
        case "genre":
            return {
                ...state,
                genre: action.payload
            }
            break;
        case "language":
            return {
                ...state,
                language: action.payload
            }
            break;
        case "size":
            return {
                ...state,
                size: action.payload
            }
            break;
        case "cover":
            return {
                ...state,
                cover: action.payload
            }
            break;
        case "ageRatingId":
            return {
                ...state,
                age_rating_id: parseInt(action.payload)
            }
            break;
        case "countryId":
            return {
                ...state,
                country_id: parseInt(action.payload)
            }
            break;
        case "categoryId":
            return {
                ...state,
                category_id: parseInt(action.payload)
            }
            break;
        case "subcategoryId":
            return {
                ...state,
                subcategory_id: parseInt(action.payload)
            }
            break;
        case "description":
            return {
                ...state,
                description: action.payload
            }
            break;
        case "cleanse":
            return {
                name: "",
                age_rating: "",
                language: "",
                cover: "",
                size: "",
                genre: "",
                age_rating_id: null,
                country_id: null,
                category_id: null,
                subcategory_id: null
            }
    }
}

// -------------> Reducer function to manage form state
const formReducer = (state, action) => {
    switch(action.type) {
        case "isValidFalse":
            return {
                ...state,
                isValid: false
            }
            break;
        case "isValidTrue":
            return {
                ...state,
                isValid: true
            }
            break;
        case "isLoadingFalse":
            return {
                ...state,
                isLoading: false
            }
            break;
        case "isLoadingTrue":
            return {
                ...state,
                isLoading: true
            }
            break;
        case "error":
            return {
                ...state,
                error: action.payload
            }
            break;
        case "success":
            return {
                ...state,
                success: action.payload
            }
            break;
    }
}

export const ModalForm = ({ datatype, PI, PIDispatch, closeModal }) => {

    const { auth } = useAuth();
    const data = useData();

    // -------------> Get the access token from the auth context
    const { access_token } = auth;

    // -------------> State to manage form input data
    const [input, inputDispatch] = useReducer(inputReducer, {
        name: "",
        age_rating: "",
        language: "",
        cover: "",
        size: "",
        genre: "",
        age_rating_id: null,
        country_id: null,
        category_id: null,
        subcategory_id: null,
        description: PI.description
    });

    // -------------> Form state
    const [form, formDispatch] = useReducer(formReducer, {
        isValid: false,
        isLoading: false,
        error: "",
        success: ""
    });

    // -------------> Manage form state based on user input
    useEffect(() => {

        formDispatch({ type: "isValidFalse" });

        // -------------> Destructure user input from state
        const {
            name,
            age_rating,
            language,
            cover,
            size,
            genre,
            age_rating_id,
            country_id,
            category_id,
            subcategory_id,
            description
        } = input;

        // -------------> Manage form state according to input state
        if (datatype === "category") {
            if (name) {
                formDispatch({ type: "error", payload: "" });
                formDispatch({ type: "isValidTrue"});
            }
        } else if (datatype === "subcategory") {
            if (name && category_id) {
                formDispatch({ type: "error", payload: "" });
                formDispatch({ type: "isValidTrue"});
            }
        } else if (datatype === "country") {
            if (name) {
                formDispatch({ type: "error", payload: "" });
                formDispatch({ type: "isValidTrue"});
            }
        } else if (datatype === "age_rating") {
            if (age_rating) {
                formDispatch({ type: "error", payload: "" });
                formDispatch({ type: "isValidTrue"});
            }
        } else if (datatype === "series") {
            if (name) {
                formDispatch({ type: "error", payload: "" });
                formDispatch({ type: "isValidTrue"});
            }
        } else if (datatype === "company") {
            if (name && country_id) {
                formDispatch({ type: "error", payload: "" });
                formDispatch({ type: "isValidTrue"});
            }
        } else if (datatype === "language") {
            if (language) {
                formDispatch({ type: "error", payload: "" });
                formDispatch({ type: "isValidTrue"});
            }
        } else if (datatype === "author") {
            if (name && country_id) {
                formDispatch({ type: "error", payload: "" });
                formDispatch({ type: "isValidTrue"});
            }
        } else if (datatype === "genre") {
            if (genre && age_rating_id) {
                formDispatch({ type: "error", payload: "" });
                formDispatch({ type: "isValidTrue"});
            }
        } else if (datatype === "cover") {
            if (cover) {
                formDispatch({ type: "error", payload: "" });
                formDispatch({ type: "isValidTrue"});
            }
        } else if (datatype === "color") {
            if (name) {
                formDispatch({ type: "error", payload: "" });
                formDispatch({ type: "isValidTrue"});
            }
        } else if (datatype === "material") {
            if (name && subcategory_id) {
                formDispatch({ type: "error", payload: "" });
                formDispatch({ type: "isValidTrue"});
            }
        } else if (datatype === "size") {
            if (size && subcategory_id) {
                formDispatch({ type: "error", payload: "" });
                formDispatch({ type: "isValidTrue"});
            }
        } else if (datatype === "description") {
            if (description) {
                formDispatch({ type: "error", payload: "" });
                formDispatch({ type: "isValidTrue"});
            }
        }
        
    }, [input]);

    // -------------> Handle form submission based on provided data
    const handleSubmit = async (e) => {

        formDispatch({ type: "isLoadingTrue" });

        e.preventDefault();

        // -------------> Initialize a variable to store the request data
        let req_data;

        // -------------> Destructure user input from state
        const {
            name,
            age_rating,
            language,
            cover,
            size,
            genre,
            age_rating_id,
            country_id,
            category_id,
            subcategory_id
        } = input;

        // -------------> Structure the request data according to the selected datatype
        switch(datatype) {
            case "category":
                req_data = { name };
                break;
            case "age_rating":
                req_data = { age_rating };
                break;
            case "country":
                req_data = { name };
                break;
            case "series":
                req_data = { name };
                break;
            case "author":
                req_data = { name, country_id };
                break;
            case "genre":
                req_data = { genre, age_rating_id };
                break;
            case "color":
                req_data = { name };
                break;
            case "language":
                req_data = { language };
                break;
            case "cover":
                req_data = { cover };
                break;
            case "size":
                req_data = { size, subcategory_id };
                break;
            case "material":
                req_data = { name, subcategory_id };
                break;
            case "company":
                req_data = { name, country_id };
                break;
            case "subcategory":
                req_data = { name, category_id };
                break;
        }

        // -------------> Initialize a variable to store the request URL
        let URL;

        // -------------> Set the request URL based on the given datatype
        switch(datatype) {
            case "category":
                URL = "/categories/admin";
                break;
            case "age_rating":
                URL = "/age_ratings/admin";
                break;
            case "country":
                URL = "/countries/admin";
                break;
            case "series":
                URL = "/series/admin";
                break;
            case "author":
                URL = "/authors/admin";
                break;
            case "genre":
                URL = "/genres/admin";
                break;
            case "color":
                URL = "/colors/admin";
                break;
            case "language":
                URL = "/languages/admin";
                break;
            case "cover":
                URL = "/covers/admin";
                break;
            case "size":
                URL = "/sizes/admin";
                break;
            case "material":
                URL = "/materials/admin";
                break;
            case "company":
                URL = "/companies/admin";
                break;
            case "subcategory":
                URL = "/subcategories/admin";
                break;
        }

        // -------------> Submit the data to the server
        try {
            const response = await axios.post(URL, JSON.stringify(req_data), {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                withCredentials: true
            });

            formDispatch({ type: "success", payload: response.data.message });
            formDispatch({ type: "isLoadingFalse" });
            inputDispatch({ type: "cleanse" });

        } catch (err) {
            if (!err?.response) {
                formDispatch({ type: "error", payload: "Something went wrong" });
            } else {
                formDispatch({ type: "error", payload: err.response.data.message });
            }
        }

    };

    return (
        <div className="modalBg">
            <form className="form">
                <div 
                className="s-btn"
                onClick={closeModal}>
                    <FontAwesomeIcon icon={faClose} />
                </div>
                <h1 className="title-1">{`Add new ${datatype.split("_").join(" ")}`}</h1>
                { form.error && <div className="message warning">{form.error}</div> }
                { form.success && <div className="message success">{form.success}</div> }
                <div className="formWrapper">
                    { datatype === "category" ?
                    <div className="labelInput">
                        <label htmlFor="category-name" className="label">Name</label>
                        <input
                        id="category-name"
                        className="input"
                        value={input.name}
                        onChange={(e) => inputDispatch({ type: "name", payload: e.target.value })}
                        />
                    </div>
                    : datatype === "subcategory" ?
                    <div className="fields">
                        <div className="labelInput">
                            <label htmlFor="subcategory-name" className="label">Name</label>
                            <input
                            id="subcategory-name"
                            className="input"
                            value={input.name}
                            onChange={(e) => inputDispatch({ type: "name", payload: e.target.value })}
                            />
                        </div>
                        <div className="labelInput">
                            <label className="label" htmlFor="category_id">Category</label>
                            <select
                            id="category_id"
                            className="select"
                            value={input.category_id || ""}
                            onChange={(e) => inputDispatch({ type: "categoryId", payload: e.target.value })}
                            >
                                <option className="option" value="" selected disabled hidden>Category</option>
                                { data.categories.map((c) => (
                                    <option className="option" value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    : datatype === "age_rating" ?
                    <div className="labelInput">
                        <label htmlFor="age-rating" className="label">Age Rating</label>
                        <input
                        id="age-rating"
                        className="input"
                        value={input.age_rating}
                        onChange={(e) => inputDispatch({ type: "ageRating", payload: e.target.value })}
                        />
                    </div>
                    : datatype === "country" ?
                    <div className="labelInput">
                        <label htmlFor="country-name" className="label">Country</label>
                        <input
                        id="country-name"
                        className="input"
                        value={input.name}
                        onChange={(e) => inputDispatch({ type: "name", payload: e.target.value })}
                        />
                    </div>
                    : datatype === "series" ?
                    <div className="labelInput">
                        <label htmlFor="series-name" className="label">Name</label>
                        <input
                        id="series-name"
                        className="input"
                        value={input.name}
                        onChange={(e) => inputDispatch({ type: "name", payload: e.target.value })}
                        />
                    </div>
                    : datatype === "author" ?
                    <div className="fields">
                        <div className="labelInput">
                            <label htmlFor="author-name" className="label">Name</label>
                            <input
                            id="author-name"
                            className="input"
                            value={input.name}
                            onChange={(e) => inputDispatch({ type: "name", payload: e.target.value })}
                            />
                        </div>
                        <div className="labelInput">
                            <label className="label" htmlFor="author-country_id">Country</label>
                            <select
                            id="author-country_id"
                            className="select"
                            value={input.country_id || ""}
                            onChange={(e) => inputDispatch({ type: "countryId", payload: e.target.value })}
                            >
                                <option className="option" value="" selected disabled hidden>Country</option>
                                { data.countries.map((c) => (
                                    <option className="option" value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    : datatype === "genre" ?
                    <div className="fields">
                        <div className="labelInput">
                            <label htmlFor="genre-name" className="label">Name</label>
                            <input
                            id="genre-name"
                            className="input"
                            value={input.genre}
                            onChange={(e) => inputDispatch({ type: "genre", payload: e.target.value })}
                            />
                        </div>
                        <div className="labelInput">
                            <label className="label" htmlFor="genre-age_rating">Age Rating</label>
                            <select
                            id="genre-age_rating"
                            className="select"
                            value={input.age_rating_id || ""}
                            onChange={(e) => inputDispatch({ type: "ageRatingId", payload: e.target.value })}
                            >
                                <option className="option" value="" selected disabled hidden>Age Rating</option>
                                { data.ageRatings.map((ar) => (
                                    <option className="option" value={ar.id}>{ar.age_rating}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    : datatype === "color" ?
                    <div className="labelInput">
                        <label htmlFor="color-name" className="label">Name</label>
                        <input
                        id="color-name"
                        className="input"
                        value={input.name}
                        onChange={(e) => inputDispatch({ type: "name", payload: e.target.value })}
                        />
                    </div>
                    : datatype === "language" ?
                    <div className="labelInput">
                        <label htmlFor="language" className="label">Language</label>
                        <input
                        id="language"
                        className="input"
                        value={input.language}
                        onChange={(e) => inputDispatch({ type: "language", payload: e.target.value })}
                        />
                    </div>
                    : datatype === "company" ?
                    <div className="fields">
                        <div className="labelInput">
                            <label htmlFor="company-name" className="label">Name</label>
                            <input
                            id="company-name"
                            className="input"
                            value={input.name}
                            onChange={(e) => inputDispatch({ type: "name", payload: e.target.value })}
                            />
                        </div>
                        <div className="labelInput">
                            <label className="label" htmlFor="company-country_id">Country</label>
                            <select
                            id="company-country_id"
                            className="select"
                            value={input.country_id || ""}
                            onChange={(e) => inputDispatch({ type: "countryId", payload: e.target.value })}
                            >
                                <option className="option" value="" selected disabled hidden>Country</option>
                                { data.countries.map((c) => (
                                    <option className="option" value={c.id}>{c.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    : datatype === "cover" ?
                    <div className="labelInput">
                        <label htmlFor="cover" className="label">Cover</label>
                        <input
                        id="cover"
                        className="input"
                        value={input.cover}
                        onChange={(e) => inputDispatch({ type: "cover", payload: e.target.value })}
                        />
                    </div>
                    : datatype === "size" ?
                    <div className="fields">
                        <div className="labelInput">
                            <label htmlFor="size" className="label">Size</label>
                            <input
                            id="size"
                            className="input"
                            value={input.size}
                            onChange={(e) => inputDispatch({ type: "size", payload: e.target.value })}
                            />
                        </div>
                        <div className="labelInput">
                            <label htmlFor="size-subcategory" className="label">Subcategory</label>
                            <select
                            id="size-subcategory"
                            className="select"
                            value={input.subcategory_id || ""}
                            onChange={(e) => inputDispatch({ type: "subcategoryId", payload: e.target.value })}
                            >
                                <option className="option" value="" selected disabled hidden>Subcategory</option>
                                { data.subcategories.map((s) => (
                                    <option className="option" value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    : datatype === "material" ?
                    <div className="fields">
                        <div className="labelInput">
                            <label htmlFor="material-name" className="label">Name</label>
                            <input
                            id="material-name"
                            className="input"
                            value={input.name}
                            onChange={(e) => inputDispatch({ type: "name", payload: e.target.value })}
                            />
                        </div>
                        <div className="labelInput">
                            <label htmlFor="material-subcategory" className="label">Subcategory</label>
                            <select
                            id="material-subcategory"
                            className="select"
                            value={input.subcategory_id || ""}
                            onChange={(e) => inputDispatch({ type: "subcategoryId", payload: e.target.value })}
                            >
                                <option className="option" value="" selected disabled hidden>Subcategory</option>
                                { data?.subcategories.map((s) => (
                                    <option className="option" value={s.id}>{s.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    : datatype === "description" &&
                    <div className="labelInput">
                        <label className="label" htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            placeholder="Add a brief description"
                            className="textarea"
                            value={input.description}
                            onChange={(e) => inputDispatch({ type: "description", payload: e.target.value })}
                        />
                    </div>
                    }
                </div>
                { datatype === "description" ?
                <button className="btn" onClick={() => {
                PIDispatch({ type: "description", payload: input.description });
                closeModal();
                }}>
                    Close
                </button> :
                <button 
                className="btn"
                onClick={handleSubmit}
                >
                    Submit
                </button>
                }
            </form>
        </div>
    );
};