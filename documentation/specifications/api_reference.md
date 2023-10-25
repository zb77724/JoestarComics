# API Reference

## Document Description

This is the first version of the API Reference, which aims to explain with as much detail as possible how the server will interact with the frontend, specifying what data of what type should be sent to a specific endpoint and in which format for the request to be successfully processed, as well as the structure of the server's responses, in order to facilitate the consumption of the API. In the next version this document will also specify details about authentication & authorization related data that should be sent and returned in order to ensure the system's security.

## Notation Glossary

- ?> indicates that parameters are optional
- || and & indicate parameter combinability
- / indicates a route
- ---> specifies the required input
- <--- specifies the returned data
- <type> specifies the required type/s of the data sent
- ** indicates that a property cannot be ommited
- [<type>] indicates an array whose elements are of the specified type
- PARAMS refers to the request parameters

## Routes Tree

/api

    /countries

        GET
        <--- {
            status: 200,
            contries: [
                {
                    id: <int>,
                    name: <string>
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
            name: <string> **
        }
        <--- {
            status: 201,
            message: "Country added successfully"
        }
    
    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /languages

        GET
        <--- {
            status: 200,
            languages: [
                {
                    id: <int>,
                    language: <string>
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
            language: <string> **
        }
        <--- {
            status: 201,
            message: "Language added successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************
    
    /age_ratings

        GET
        <--- {
            status: 200,
            age_ratings: [
                {
                    id: <int>,
                    age_rating: <string>
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
            age_rating: <string> **
        }
        <--- {
            status: 201,
            message: "Age rating added successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /genres

        GET ?> PARAMS: age_rating
        <--- {
            status: 200,
            genres: [
                {
                    id: <int>,
                    genre: <string>
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
            genre: <string> **
        }
        <--- {
            status: 201,
            message: "Genre added successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************
    
    /series

        GET ?> PARAMS: genre_id
        <--- {
            status: 200,
            series: [
                {
                    id: <int>,
                    series: <string>
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
            series: <string> **
        }
        <--- {
            status: 201,
            message: "Series added successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /publishers

        GET ?> PARAMS: country_id
        <--- {
            status: 200,
            publishers: [
                {
                    id: <int>,
                    name: <string>,
                    country_id: <string>
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
            name: <string> **,
            country_id: <string> **
        }
        <--- {
            status: 201,
            message: "Publisher added successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /categories

        GET
        <--- {
            status: 200,
            categories: [
                {
                    id: <int>,
                    category: <string>
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
            category: <string> **,
        }
        <--- {
            status: 201,
            message: "Category added successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /subcategories

        GET ?> PARAMS: category_id
        <--- {
            status: 200,
            subcategories: [
                {
                    id: <int>,
                    category_id: <int>,
                    subcategory: <string>
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
            category_id: <id> **,
            subcategory: <string> **
        }
        <--- {
            status: 201,
            message: "Subcategory added successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /sizes

        GET
        <--- {
            status: 200,
            sizes: [
                {
                    id: <int>,
                    size: <string>
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
            size: <string> **
        }
        <--- {
            status: 201,
            message: "Size added successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /authors

        GET ?> PARAMS: country_id
        <--- {
            status: 200,
            authors: [
                {
                    id: <int>,
                    name: <string>,
                    country_id: <int>
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
            name: <string> **,
            country_id: <int> **
        }
        <--- {
            status: 201,
            message: "Author added successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /producers

        GET ?> PARAMS: country_id
        <--- {
            status: 200,
            producers: [
                {
                    id: <int>,
                    producer: <string>,
                    country_id: <int>
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
            producer: <string> **,
            country_id: <int> **
        }
        <--- {
            status: 201,
            message: "Producer added successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /clothes

        GET ?> PARAMS: id || product_id || subcategory_id &|| size_id
        <--- {
            status: 200,
            clothes: [
                {
                    id: <int>,
                    product_id: <int>,
                    subcategory_id: <int>,
                    size_id: <int>
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
            product_id: <int> **,
            subcategory_id: <int> **,
            size_id: <int> **
        }
        <--- {
            status: 201,
            message: "Item saved successfully"
        }
    
    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /collectibles

        GET ?> PARAMS: id || product_id || subcategory_id &|| series_id &|| producer_id
        <--- {
            status: 200,
            collectibles: [
                {
                    id: <int>,
                    product_id: <int>,
                    subcategory_id: <int>,
                    series_id: <int>,
                    producer_id: <int>
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
                    product_id: <int> **,
                    subcategory_id: <int> **,
                    series_id: <int> **,
                    producer_id: <int> **
        }
        <--- {
            status: 201,
            message: "Item saved successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /comics

        GET ?> PARAMS: id || product_id || series_id &|| publisher_id &|| author_id &|| release_date &|| genre_id &|| language_id &|| colored
        <--- {
            status: 200,
            comics: [
                {
                    id: <int>,
                    product_id: <int>,
                    series_id: <int>,
                    publisher_id: <int>,
                    author_id: <int>,
                    release_date: <string> (format: yyyy/mm/dd),
                    genre_id: <int>,
                    language_id: <int>,
                    colored: boolean
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
            product_id: <int> **,
            series_id: <int> **,
            publisher_id: <int> **,
            author_id: <int> **,
            release_date: <string> (format: yyyy/mm/dd) **,
            genre_id: <int> **,
            language_id: <int> **,
            colored: <boolean> **
        }
        <--- {
            status: 201,
            message: "Item saved successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /products

        GET ?> PARAMS: id || description &|| category_id &|| age_rating_id &|| country_id &|| rating &|| price
        <--- {
            status: 200,
            products: [
                {
                    id: <int>,
                    description: <string>,
                    category_id: <int>,
                    age_rating_id: <int>,
                    country_id: <int>,
                    rating: <int>,
                    quantity: <int>,
                    price: <double>,
                    images: [<string>]
                }
            ]
        }

        ****************************************************************************
        
        POST
        ---> {
            description: <string> **,
            category_id: <int> **,
            age_rating_id: <int> **,
            country_id: <int> **,
            rating: <int> **,
            quantity: <int> **,
            price: <double> **,
            images: [<string>] **
        }
        <--- {
            status: 201,
            message: "Product saved successfully"
        }

        ****************************************************************************

        PUT PARAMS: id
        ---> {
            description: <string> **,
            category_id: <int> **,
            age_rating_id: <int> **,
            country_id: <int> **,
            rating: <int> **,
            quantity: <int> **,
            price: <double> **,
            images: [<string>] **
        }
        <--- {
            status: 204,
            message: "Changes saved successfully"
        }

        ****************************************************************************

        DELETE PARAMS: id
        <--- {
            status: 204,
            message: "Product disabled successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /users

        GET ?> id || username
        <--- {
            status: 200,
            users: [
                {
                    id: <int>,
                    username: <string>,
                    email: <string>
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
            username: <string> **,
            password: <string> **,
            email: <string> **,
            role_id: <int> **,
            pfp_path: <string>
        }
        <--- {
            status: 201,
            message: "User created successfully"
        }

        ****************************************************************************

        PUT PARAMS: id
        ---> {
            email: <string>,
            password: <string>
        }
        <--- {
            status: 204,
            message: "Changes saved successfully"
        }

        ****************************************************************************

        DELETE PARAMS: id
        <--- {
            status: 204,
            message: "User disabled successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /signup

        POST
        ---> {
            username: <string> **,
            password: <string> **,
            email: <string> **,
            pfp_path: <string>,
        }
        <--- {
            status: 201,
            message: "User created successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    TODO....