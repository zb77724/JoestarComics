import { useState, useEffect, useReducer } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useData } from '../hooks/useData';
import axios from '../api/axios';
import { ModalForm } from './ModalForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { faClose } from '@fortawesome/free-solid-svg-icons';

// -------------> Declare request URL's
const PRODUCTS_URL = "/products/admin";
const PRODUCTIMAGES_URL = "/products/admin/images";

// ----------------------------------------------------------------->
// -------------------------- REDUCER FUNCTIONS -------------------------->
// ----------------------------------------------------------------->

// -------------> Reducer function to manage form input data
const inputReducer = (state, action) => {
    switch(action.type) {
        case "name":
            return {
                ...state,
                name: action.payload
            }
            break;
        case "description":
            return {
                ...state,
                description: action.payload
            }
            break;
        case "price":
            return {
                ...state,
                price: parseFloat(action.payload)
            }
            break;
        case "quantity":
            return {
                ...state,
                quantity: parseInt(action.payload)
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
        case "seriesIds":
            console.log("series: ", state.series_ids);
            if (state.series_ids.length > 0) {
                console.log(action.payload)
                return {
                    ...state,
                    series_ids: [...state.series_ids, parseInt(action.payload)]
                }
            } else {
                return {
                    ...state,
                    series_ids: [parseInt(action.payload)]
                }
            }
            break;
        case "resetSeriesIds":
            return {
                ...state,
                series_ids: []
            }
            break;
        case "subcategoryId":
            return {
                ...state,
                subcategory_id: parseInt(action.payload)
            }
            break;
        case "languageId":
            return {
                ...state,
                language_id: parseInt(action.payload)
            }
            break;
        case "companyId":
            return {
                ...state,
                company_id: parseInt(action.payload)
            }
            break;
        case "sizeId":
            return {
                ...state,
                size_id: parseInt(action.payload)
            }
            break;
        case "materialId":
            return {
                ...state,
                material_id: parseInt(action.payload)
            }
            break;
        case "coverId":
            return {
                ...state,
                cover_id: parseInt(action.payload)
            }
            break;
        case "genreIds":
            if (state.genre_ids.length > 0) {
                return {
                    ...state,
                    genre_ids: [...state.genre_ids, parseInt(action.payload)]
                }
            } else {
                return {
                    ...state,
                    genre_ids: [parseInt(action.payload)]
                }
            }
            break;
        case "resetGenreIds":
            return {
                ...state,
                genre_ids: []
            }
            break;
        case "authorIds":
            if (state.author_ids.length > 0) {
                return {
                    ...state,
                    author_ids: [...state.author_ids, parseInt(action.payload)]
                }
            } else {
                return {
                    ...state,
                    author_ids: [parseInt(action.payload)]
                }
            }
            break;
        case "resetAuthorIds":
            return {
                ...state,
                author_ids: []
            }
            break;
        case "colorIds":
            if (state.color_ids.length > 0) {
                return {
                    ...state,
                    color_ids: [...state.color_ids, parseInt(action.payload)]
                }
            } else {
                return {
                    ...state,
                    color_ids: [parseInt(action.payload)]
                }
            }
            break;
        case "resetColorIds":
            return {
                ...state,
                colors_ids: []
            }
            break;
        case "colored":
            return {
                ...state,
                colored: action.payload
            }
            break;
        case "year":
            return {
                ...state,
                year: action.payload
            }
            break;
        case "month":
            return {
                ...state,
                month: action.payload
            }
            break;
        case "day":
            return {
                ...state,
                day: action.payload
            }
            break;
        case "images":
            return {
                ...state,
                images: action.payload
            }
            break;
        case "cleanse":
            return {
                name: "",
                description: "",
                price: null,
                quantity: null,
                age_rating_id: null,
                country_id: null,
                series_ids: [],
                category_id: null,
                subcategory_id: null,
                language_id: null,
                cover_id: null,
                company_id: null,
                author_ids: [],
                genre_ids: [],
                color_ids: [],
                material_id: null,
                size_id: null,
                colored: null,
                year: "",
                month: "",
                day: "",
                images: []
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

// ----------------------------------------------------------------->
// ----------------------------------------------------------------------->
// ----------------------------------------------------------------->

export const ProductForm = () => {

    const { auth } = useAuth();
    const data = useData();

    // -------------> Get the access token from the auth context
    const { access_token } = auth;

    // -------------> State for managing modal form
    const [modalState, setModalState] = useState({ open: false, datatype: "" });

    // -------------> Handle secondary modal forms
    const openModalForm = (datatype) => {
        setModalState({ open: true, datatype });
    };

    const closeModalForm = () => {
        setModalState({ open: false });
    }

    // -------------> State to manage form input data
    const [input, inputDispatch] = useReducer(inputReducer, { 
        name: "",
        description: "",
        price: null,
        quantity: null,
        age_rating_id: null,
        country_id: null,
        series_ids: [],
        category_id: null,
        subcategory_id: null,
        language_id: null,
        cover_id: null,
        company_id: null,
        author_ids: [],
        genre_ids: [],
        color_ids: [],
        material_id: null,
        size_id: null,
        colored: null,
        year: "",
        month: "",
        day: "",
        images: []
    });

    // -------------> Form state
    const [form, formDispatch] = useReducer(formReducer, {
        isValid: false,
        isLoading: false,
        updatedData: false,
        error: "",
        success: ""
    });

    // -------------> Manage form state based on user input
    useEffect(() => {

        formDispatch({ type: "isValidFalse" });

        // -------------> Destructure user input from state
        const { name,
            description,
            price,
            quantity,
            age_rating_id,
            country_id,
            category_id,
            series_ids,
            images,
            subcategory_id,
            company_id,
            language_id,
            cover_id,
            author_ids,
            genre_ids,
            material_id,
            size_id,
            color_ids,
            colored,
            year,
            month,
            day
        } = input;

        // -------------> Manage form state according to input state
        if (name.length > 0 &&
            description.length > 0 &&
            price &&
            quantity &&
            age_rating_id &&
            country_id &&
            category_id &&
            subcategory_id &&
            series_ids.length > 0 &&
            images.length > 0) {
                if (parseInt(category_id) === parseInt(data?.categories?.filter(({ name }) => name === "comics")[0].id)) {
                    if (author_ids.length > 0 &&
                        genre_ids.length > 0 &&
                        language_id &&
                        cover_id &&
                        company_id &&
                        colored &&
                        year &&
                        month &&
                        day) {
                            formDispatch({ type: "error", payload: "" });
                            formDispatch({ type: "isValidTrue"});
                        }
                } else if (parseInt(category_id) === parseInt(data?.categories?.filter(({ name }) => name === "collectibles")[0].id)) {
                    if (company_id) {
                        formDispatch({ type: "error", payload: "" });
                        formDispatch({ type: "isValidTrue"});
                }
                } else if (parseInt(category_id) === parseInt(data?.categories?.filter(({ name }) => name === "clothes")[0].id)) {
                    if (color_ids.length > 0 &&
                        size_id &&
                        material_id) {
                        formDispatch({ type: "error", payload: "" });
                        formDispatch({ type: "isValidTrue"});
                        }
                }
            
        }
        
    }, [input]);

    // -------------> Handle form submission
    const handleSubmit = async (e) => {

        formDispatch({ type: "isLoading" });

        e.preventDefault();

        // -------------> Initialize a variable to store the request data
        let req_data;

        // -------------> Destructure user input from state
        const { name,
            description,
            price,
            quantity,
            age_rating_id,
            country_id,
            category_id,
            series_ids,
            subcategory_id,
            company_id,
            language_id,
            cover_id,
            author_ids,
            genre_ids,
            material_id,
            size_id,
            color_ids,
            colored,
            year,
            month,
            day
        } = input;

        // -------------> Structure the request data according to the category ID
        if (parseInt(input.category_id) === parseInt(data?.categories?.filter(({ name }) => name === "comics")[0].id)) {
            req_data = {
                name,
                description,
                price,
                quantity,
                age_rating_id,
                country_id,
                category_id,
                series_ids,
                subcategory_id,
                company_id,
                language_id,
                cover_id,
                author_ids,
                genre_ids,
                colored,
                release_date: `${year}/${month}/${day}`
            };
        }

        if (parseInt(input.category_id) === parseInt(data?.categories?.filter(({ name }) => name === "collectibles")[0].id)) {
            req_data = {
                name,
                description,
                price,
                quantity,
                age_rating_id,
                country_id,
                category_id,
                series_ids,
                subcategory_id,
                company_id,
            }
        }

        if (parseInt(input.category_id) === parseInt(data?.categories?.filter(({ name }) => name === "clothes")[0].id)) {
            req_data = {
                name,
                description,
                price,
                quantity,
                age_rating_id,
                country_id,
                category_id,
                series_ids,
                subcategory_id,
                material_id,
                size_id,
                color_ids
            };
        }

        try {

            let response = await axios.post(PRODUCTS_URL, JSON.stringify(req_data), {
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
                },
                withCredentials: true
            });

            const product_id = response.data.product_id;

            const formData = new FormData();

            for (let x in input.images) {
                formData.append('image', input.images[x]);
            }

            await axios.put(`${PRODUCTIMAGES_URL}/${product_id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${access_token}`
                },
                withCredentials: true
            });

            formDispatch({ type: "isLoadingFalse" });
            formDispatch({ type: "success", payload: response.data.message });

        } catch (err) {
            if (!err?.response) {
                formDispatch({ type: "isLoadingFalse" });
                formDispatch({ type: "error", payload: "Something went wrong" });
            } else {
                formDispatch({ type: "isLoadingFalse" });
                formDispatch({ type: "error", payload: err.response.data.message });
            }
        }

    };

    // -------------> Manage multiselect input data
    const handleSelectedData = (e, data) => {

        // -------------> Obtain the selected data
        const value = Array.from(e.target.selectedOptions, option => option.value)[0];

        // -------------> Update the corresponding input state based on selected values
        if (data === "series") {
            inputDispatch({ type: "seriesIds", payload: value});
        }

        if (data === "genres") {
            inputDispatch({ type: "genreIds", payload: value});
        }

        if (data === "authors") {
            inputDispatch({ type: "authorIds", payload: value});
        }

        if (data === "colors") {
            inputDispatch({ type: "colorIds", payload: value});
        }

    };

    console.log(data.colors);

    return (
        <div className="bg">
            <div className="form-page">
                <form onSubmit={handleSubmit} className="form">
                    <h1 className="title-1">Add new Product</h1>
                    { form?.error && <div className="message warning">{form?.error}</div> }
                    { form?.success && <div className="message success">{form?.success}</div> }
                    <div className="formWrapper">
                        <div className="fields">
                            <div className="labelInput">
                                <label className="label" htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    className="input"
                                    type="text"
                                    onChange={(e) => inputDispatch({ type: "name", payload: e.target.value })}
                                    value={input.name}
                                    required
                                />
                            </div>
                            <div className="labelInput">
                                <label htmlFor="descriptionBtn" className="label">Description</label>
                                <div 
                                id="descriptionbtn"
                                className="formBtn"
                                onClick={() => openModalForm("description")}
                                >
                                    <span>Description</span>
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                            </div>
                            <div className="labelInput">
                                <label className="label" htmlFor="price">Price</label>
                                <input
                                    id="price"
                                    className="input"
                                    type="number"
                                    onChange={(e) => inputDispatch({ type: "price", payload: e.target.value })}
                                    value={input.price}
                                    required
                                />
                            </div>
                            <div className="labelInput">
                                <label className="label" htmlFor="quantity">Quantity</label>
                                <input
                                    id="quantity"
                                    className="input"
                                    type="number"
                                    onChange={(e) => inputDispatch({ type: "quantity", payload: e.target.value })}
                                    value={input.quantity}
                                    required
                                />
                            </div>
                            { data?.countries?.length > 0 ?
                            <div className="labelInput">
                                <label htmlFor="country" className="label">Country</label>
                                <div className="selectBtn">
                                    <select
                                    id="country"
                                    className="select"
                                    value={input.country_id || ""}
                                    onChange={(e) => inputDispatch({ type: "countryId", payload: e.target.value })}
                                    >
                                        <option className="option" value="" selected disabled hidden>Country</option>
                                        { data?.countries.map((c) => (
                                            <option className="option" value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                    <div 
                                    className="sbtn"
                                    onClick={() => openModalForm("country")}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                </div>
                            </div> :
                            <div className="labelInput">
                                <label htmlFor="countryBtn" className="label">Country</label>
                                <div 
                                id="countrybtn"
                                className="formBtn"
                                onClick={() => openModalForm("country")}
                                >
                                    <span>Country</span>
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                            </div>
                            }
                        </div>
                        <div className="fields">
                            { data?.ageRatings?.length > 0 ?
                            <div className="labelInput">
                                <label className="label" htmlFor="age-rating">Age Rating</label>
                                <div className="selectBtn">
                                    <select
                                    id="age-rating"
                                    className="select"
                                    value={input.age_rating_id || ""}
                                    onChange={(e) => inputDispatch({ type: "ageRatingId", payload: e.target.value })}
                                    >
                                        <option className="option" value="" selected disabled hidden>Age Rating</option>
                                        { data?.ageRatings.map((ar) => (
                                            <option className="option" value={ar.id}>{ar.age_rating}</option>
                                        ))}
                                    </select>
                                    <div 
                                    className="sbtn"
                                    onClick={() => openModalForm("age_rating")}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                </div>
                            </div> :
                            <div className="labelInput">
                                <label htmlFor="ageRatingBtn" className="label">Age Rating</label>
                                <div 
                                id="ageRatingBtn"
                                className="formBtn"
                                onClick={() => openModalForm("age_rating")}
                                >
                                    <span>Age rating</span>
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                            </div>
                            }
                            { data?.categories?.length > 0 ?
                                <div className="labelInput">
                                    <label className="label" htmlFor="category">Category</label>
                                    <div className="selectBtn">
                                        <select
                                        id="category"
                                        className="select"
                                        value={input.category_id || ""}
                                        onChange={(e) => inputDispatch({ type: "categoryId", payload: e.target.value })}
                                        >
                                            <option className="option" value="" selected disabled hidden>Category</option>
                                            { data?.categories.map((c) => (
                                                <option className="option" value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                        <div 
                                        className="sbtn"
                                        onClick={() => openModalForm("category")}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </div>
                                    </div>
                                </div> :
                                <div className="labelInput">
                                    <label htmlFor="categoryBtn" className="label">Category</label>
                                    <div 
                                    id="categoryBtn"
                                    className="formBtn"
                                    onClick={() => openModalForm("category")}
                                    >
                                        <span>Category</span>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                </div>
                            }
                            { data?.series?.length > 0 ?
                            <div className="labelInput">
                                <label className="label" htmlFor="series">Series</label>
                                <div className="selectBtn">
                                    <select
                                    id="series"
                                    className="select"
                                    multiple={true}
                                    onChange={(e) => handleSelectedData(e, "series")}
                                    value={input.series_ids}
                                    >
                                        { data?.series.map((s) => (
                                            <option className="option" value={s.id}>{s.name}</option>
                                        ))}
                                    </select>
                                    <div
                                    className="sbtn" 
                                    onClick={() => inputDispatch({ type: "resetSeriesIds" })}
                                    >
                                        <FontAwesomeIcon icon={faClose} />
                                    </div>
                                    <div 
                                    className="sbtn"
                                    onClick={() => openModalForm("series")}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                </div>
                            </div> :
                            <div className="labelInput">
                                <label htmlFor="seriesBtn" className="label">Series</label>
                                <div 
                                id="seriesBtn"
                                className="formBtn"
                                onClick={() => openModalForm("series")}
                                >
                                    <span>Series</span>
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                            </div>
                            }
                            { input.category_id && 
                            data?.subcategories?.length > 0 ?
                            <div className="labelInput">
                                <label className="label" htmlFor="subcategories">Subcategory</label>
                                <div className="selectBtn">
                                    <select
                                    id="subcategories"
                                    className="select"
                                    onChange={(e) => inputDispatch({ type: "subcategoryId", payload: e.target.value })}
                                    value={input.subcategory_id}
                                    >
                                        <option className="option" value="" selected disabled hidden>Subcategory</option>
                                        { data?.subcategories?.filter((s) => parseInt(s.category_id) === input.category_id).map((s) => (
                                            <option className="option" value={s.id}>{s.name}</option>
                                        ))}
                                    </select>
                                    <div 
                                    className="sbtn"
                                    onClick={() => openModalForm("subcategory")}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                </div>
                            </div> :
                            <div className="labelInput">
                                <label htmlFor="subcategoryBtn" className="label">Subcategory</label>
                                <div 
                                id="subcategoryBtn"
                                className="formBtn"
                                onClick={() => openModalForm("subcategory")}
                                >
                                    <span>Subcategory</span>
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                            </div>
                            }
                        </div>
                        { input.category_id === data?.categories?.filter(({ name }) => name === "comics")[0].id ||
                        input.category_id === data?.categories?.filter(({ name }) => name === "collectibles")[0].id ?
                        <div className="fields">
                            { input.country_id &&
                            (input?.category_id === parseInt(data?.categories?.filter(({ name }) => name === "comics")[0].id) ||
                            input?.category_id === parseInt(data?.categories?.filter(({ name }) => name === "collectibles")[0].id)) ?
                            data?.companies?.length > 0 ?
                            <div className="labelInput">
                                <label className="label" htmlFor="company">Company</label>
                                <div className="selectBtn">
                                    <select
                                    id="company"
                                    className="select"
                                    value={input.company_id || ""}
                                    onChange={(e) => inputDispatch({ type: "companyId", payload: e.target.value })}
                                    >
                                        <option className="option" value="" selected disabled hidden>Company</option>
                                        { data?.companies?.filter((c) => parseInt(c.country_id) === input.country_id).map((c) => (
                                            <option className="option" value={c.id}>{c.name}</option>
                                        ))}
                                    </select>
                                    <div 
                                    className="sbtn"
                                    onClick={() => openModalForm("company")}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                </div>
                            </div> :
                            <div className="labelInput">
                                <label htmlFor="companyBtn" className="label">Company</label>
                                <div 
                                id="companyBtn"
                                className="formBtn"
                                onClick={() => openModalForm("company")}
                                >
                                    <span>Company</span>
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                            </div> : null
                            }
                            { input?.category_id === parseInt(data?.categories?.filter(({ name }) => name === "collectibles")[0].id) &&
                            <div className="labelInput">
                                <label htmlFor="images" className="label">Images</label>
                                    <input
                                    id="images"
                                    type="file"
                                    multiple={true}
                                    onChange={(e) => inputDispatch({ type: "images", payload: e.target.files })}
                                    />
                            </div>
                            }
                            { input.category_id === parseInt(data?.categories?.filter(({ name }) => name === "comics")[0].id) ?
                            data?.languages?.length > 0 ?
                            <div className="labelInput">
                                <label className="label" htmlFor="language">Language</label>
                                <div className="selectBtn">
                                    <select
                                    id="language"
                                    className="select"
                                    value={input.language_id || ""}
                                    onChange={(e) => inputDispatch({ type: "languageId", payload: e.target.value })}
                                    >
                                        <option className="option" value="" selected disabled hidden>Language</option>
                                        { data?.languages.map((l) => (
                                            <option className="option" value={l.id}>{l.language}</option>
                                        ))}
                                    </select>
                                    <div 
                                    className="sbtn"
                                    onClick={() => openModalForm("language")}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                </div>
                            </div> :
                            <div className="labelInput">
                                <label htmlFor="languageBtn" className="label">Language</label>
                                <div 
                                id="languageBtn"
                                className="formBtn"
                                onClick={() => openModalForm("language")}
                                >
                                    <span>Language</span>
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                            </div> : null
                            }
                            { input.category_id === data?.categories?.filter(({ name }) => name === "comics")[0].id ?
                            data?.covers?.length > 0 ?
                            <div className="labelInput">
                                <label className="label" htmlFor="cover">Cover</label>
                                <div className="selectBtn">
                                    <select
                                    id="cover"
                                    className="select"
                                    value={input.cover_id || ""}
                                    onChange={(e) => inputDispatch({ type: "coverId", payload: e.target.value })}
                                    >
                                        <option className="option" value="" selected disabled hidden>Cover</option>
                                        { data?.covers.map((c) => (
                                            <option className="option" value={c.id}>{c.cover}</option>
                                        ))}
                                    </select>
                                    <div 
                                    className="sbtn"
                                    onClick={() => openModalForm("cover")}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                </div>
                            </div> :
                            <div className="labelInput">
                                <label htmlFor="coverBtn" className="label">Cover</label>
                                <div 
                                id="coverBtn"
                                className="formBtn"
                                onClick={() => openModalForm("cover")}
                                >
                                    <span>Cover</span>
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                            </div> : null
                            }
                            { input.age_rating_id && 
                            input.category_id === data?.categories?.filter(({ name }) => name === "comics")[0].id ?
                            data?.genres?.length > 0 ?
                            <div className="labelInput">
                                <label className="label" htmlFor="genres">Genres</label>
                                <div className="selectBtn">
                                    <select
                                    id="genres"
                                    className="select"
                                    multiple={true}
                                    onChange={(e) => handleSelectedData(e, "genres")}
                                    value={input.genre_ids}
                                    >
                                        { data?.genres?.filter((g) => parseInt(g.age_rating_id) === input.age_rating_id).map((g) => (
                                            <option className="option" value={g.id}>{g.genre}</option>
                                        ))}
                                    </select>
                                    <div
                                    className="sbtn" 
                                    onClick={() => inputDispatch({ type: "resetGenreIds" })}
                                    >
                                        <FontAwesomeIcon icon={faClose} />
                                    </div>
                                    <div 
                                    className="sbtn"
                                    onClick={() => openModalForm("genre")}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                </div>
                            </div> :
                            <div className="labelInput">
                                <label htmlFor="genreBtn" className="label">Genre</label>
                                <div 
                                id="genreBtn"
                                className="formBtn"
                                onClick={() => openModalForm("genre")}
                                >
                                    <span>Genre</span>
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                            </div> : null
                            }
                            { input.country_id &&
                            input.category_id === data?.categories?.filter(({ name }) => name === "comics")[0].id ?
                            data?.authors?.length > 0 ?
                            <div className="labelInput">
                                <label className="label" htmlFor="authors">Authors</label>
                                <div className="selectBtn">
                                    <select
                                    id="authors"
                                    className="select"
                                    multiple={true}
                                    onChange={(e) => handleSelectedData(e, "authors")}
                                    value={input.author_ids}
                                    >
                                        { data?.authors?.filter((a) => parseInt(a.country_id) === input.country_id).map((a) => (
                                            <option className="option" value={a.id}>{a.name}</option>
                                        ))}
                                    </select>
                                    <div
                                    className="btn" 
                                    onClick={() => inputDispatch({ type: "resetAuthorIds" })}>
                                        <FontAwesomeIcon icon={faClose} />
                                    </div>
                                    <div 
                                    className="sbtn"
                                    onClick={() => openModalForm("author")}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                </div>
                            </div> :
                            <div className="labelInput">
                                <label htmlFor="authorBtn" className="label">Author</label>
                                <div 
                                id="authorBtn"
                                className="formBtn"
                                onClick={() => openModalForm("author")}
                                >
                                    <span>Author</span>
                                    <FontAwesomeIcon icon={faPlus} />
                                </div>
                            </div> : null
                            }
                        </div> : null
                        }
                        { input.category_id === data?.categories?.filter(({ name }) => name === "comics")[0].id ||
                        input.category_id === data?.categories?.filter(({ name }) => name === "clothes")[0].id &&
                        <div className="fields">
                            { input.category_id === data?.categories?.filter(({ name }) => name === "comics")[0].id &&
                            <>
                                <div className="labelInput">
                                    <label htmlFor="colored" className="label">Colored</label>
                                    <select
                                    id="colored"
                                    className="select"
                                    value={input.colored || ""}
                                    onChange={(e) => inputDispatch({ type: "colored", payload: e.target.value })}
                                    >
                                        <option value="" className="option" selected hidden disabled>Colored</option>
                                        <option value={true} className="option">Yes</option>
                                        <option value={false} className="option">No</option>
                                    </select>
                                </div>
                                <div className="labelInput">
                                    <label className="label">Release date</label>
                                    <div className="dateField">
                                        <div className="labelInput">
                                            <label htmlFor="year" className="label">Year</label>
                                            <input
                                            id="year"
                                            type="number"
                                            className="microInput"
                                            value={input.year}
                                            onChange={(e) => inputDispatch({ type: "year", payload: e.target.value })}
                                            />
                                        </div>
                                        <div className="labelInput">
                                            <label htmlFor="month" className="label">Month</label>
                                            <input
                                            id="month"
                                            type="number"
                                            className="microInput"
                                            value={input.month}
                                            onChange={(e) => inputDispatch({ type: "month", payload: e.target.value })}
                                            />
                                        </div>
                                        <div className="labelInput">
                                            <label htmlFor="day" className="label">Day</label>
                                            <input
                                            id="day"
                                            type="number"
                                            className="microInput"
                                            value={input.day}
                                            onChange={(e) => inputDispatch({ type: "day", payload: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </>
                            }
                            { input.category_id === parseInt(data?.categories?.filter(({ name }) => name === "clothes")[0].id) &&
                            <>
                                { input.subcategory_id &&
                                    data?.materials?.length > 0 ?
                                    <div className="labelInput">
                                        <label className="label" htmlFor="material">Material</label>
                                        <div className="selectBtn">
                                            <select
                                            id="material"
                                            className="select"
                                            value={input.material_id || ""}
                                            onChange={(e) => inputDispatch({ type: "materialId", payload: e.target.value })}
                                            >
                                                <option className="option" value="" selected disabled hidden>Material</option>
                                                { data?.materials?.filter((m) => m.subcategory_id === input.subcategory_id).map((m) => (
                                                    <option className="option" value={m.id}>{m.name}</option>
                                                ))}
                                            </select>
                                            <div 
                                            className="sbtn"
                                            onClick={() => openModalForm("material")}
                                            >
                                                <FontAwesomeIcon icon={faPlus} />
                                            </div>
                                        </div>
                                    </div> :
                                    <div className="labelInput">
                                        <label htmlFor="materialBtn" className="label">Material</label>
                                        <div 
                                        id="materialBtn"
                                        className="formBtn"
                                        onClick={() => openModalForm("material")}
                                        >
                                            <span>Material</span>
                                            <FontAwesomeIcon icon={faPlus} />
                                        </div>
                                    </div>
                                }
                                { input.subcategory_id && 
                                data?.sizes?.length > 0 ?
                                <div className="labelInput">
                                    <label className="label" htmlFor="sizes">Sizes</label>
                                    <div className="selectBtn">
                                        <select
                                        id="sizes"
                                        className="select"
                                        value={input.size_id || ""}
                                        onChange={(e) => inputDispatch({ type: "sizeId", payload: e.target.value })}
                                        >
                                            <option className="option" value="" selected disabled hidden>Size</option>
                                            { data?.sizes?.filter((s) => s.subcategory_id === input.subcategory_id).map((s) => (
                                                <option className="option" value={s.id}>{s.size}</option>
                                            ))}
                                        </select>
                                        <div 
                                        className="sbtn"
                                        onClick={() => openModalForm("size")}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </div>
                                    </div>
                                </div> :
                                <div className="labelInput">
                                    <label htmlFor="sizeBtn" className="label">Size</label>
                                    <div 
                                    id="sizeBtn"
                                    className="formBtn"
                                    onClick={() => openModalForm("size")}
                                    >
                                        <span>Size</span>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                </div>
                                }
                                { data?.colors?.length > 0 ?
                                <div className="labelInput">
                                    <label className="label" htmlFor="colors">Colors</label>
                                    <div className="selectBtn">
                                        <select
                                        id="colors"
                                        className="select"
                                        multiple={true}
                                        onChange={(e) => handleSelectedData(e, "colors")}
                                        value={input.color_ids}
                                        >
                                            { data?.colors.map((c) => (
                                                <option className="option" value={c.id}>{c.name}</option>
                                            ))}
                                        </select>
                                        <div
                                        className="sbtn" 
                                        onClick={() => inputDispatch({ type: "resetColorIds" })}
                                        >
                                            <FontAwesomeIcon icon={faClose} />
                                        </div>
                                        <div 
                                        className="sbtn"
                                        onClick={() => openModalForm("color")}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </div>
                                    </div>
                                </div> :
                                <div className="labelInput">
                                    <label htmlFor="colorBtn" className="label">Color</label>
                                    <div 
                                    id="colorBtn"
                                    className="formBtn"
                                    onClick={() => openModalForm("color")}
                                    >
                                        <span>Color</span>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </div>
                                </div>
                                }
                                <div className="labelInput">
                                    <label htmlFor="images" className="label">Images</label>
                                    <input
                                    id="images"
                                    type="file"
                                    multiple={true}
                                    onChange={(e) => inputDispatch({ type: "images", payload: e.target.files })}
                                    />
                                </div>
                            </>
                            }
                        </div>        
                        } 
                    </div>
                    <button 
                    disabled={form?.isLoading || !form?.isValid || form?.error}
                    className={ form?.isLoading ? "btn loading" : "btn" }>
                        Submit
                    </button>
                </form>
            </div>
            { modalState.open === true &&
            <ModalForm datatype={modalState.datatype} PI={input} PIDispatch={inputDispatch} closeModal={closeModalForm} />
            }
        </div>
    );
};