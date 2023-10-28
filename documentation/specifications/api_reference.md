# API Reference

## Document Description

This is the API Reference, which aims to explain with as much detail as possible how the server will interact with the frontend, specifying what data of what type should be sent to a specific endpoint and in which format for the request to be successfully processed, as well as the structure of the server's responses, in order to facilitate the consumption of the API. In the next version this document will also specify details about authentication & authorization related data that should be sent and returned in order to ensure the system's security.

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

    /countries ?> PARAMS: id || name

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

        GET ?> PARAMS: id || language
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

        GET ?> PARAMS: id || age_rating
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

        GET ?> PARAMS: id || genre || age_rating_id
        <--- {
            status: 200,
            genres: [
                {
                    id: <int>,
                    genre: <string>,
                    age_rating_id: <int>
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
            genre: <string> **,
            age_rating_id: <int> **
        }
        <--- {
            status: 201,
            message: "Genre added successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************
    
    /series

        GET ?> PARAMS: id || name

        ''

        <--- {
            status: 200,
            series: [
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
            message: "Series added successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /categories

        GET ?> PARAMS: id || name
        <--- {
            status: 200,
            categories: [
                {
                    id: <int>,
                    name: <string>
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
            name: <string> **,
        }
        <--- {
            status: 201,
            message: "Category added successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /subcategories

        GET ?> PARAMS: id || category_id || name
        <--- {
            status: 200,
            subcategories: [
                {
                    id: <int>,
                    category_id: <int>,
                    name: <string>
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
            category_id: <id> **,
            name: <string> **
        }
        <--- {
            status: 201,
            message: "Subcategory added successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /sizes

        GET ?> PARAMS: id || subcategory_id || size
        <--- {
            status: 200,
            sizes: [
                {
                    id: <int>,
                    subcategory_id: <int>,
                    size: <string>
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
            subcategory_id: <int> **,
            size: <string> **
        }
        <--- {
            status: 201,
            message: "Size added successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /materials

        GET ?> PARAMS: id || subcategory_id || material
        <--- {
            status: 200,
            materials: [
                {
                    id: <int>,
                    subcategory_id: <int>,
                    material: <string>
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
            subcategory_id: <int> **,
            material: <string> **
        }
        <--- {
            status: 201,
            message: "Material added successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /authors

        GET ?> PARAMS: id || name || country_id
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

    /companies

        GET ?> PARAMS: id || company || country_id
        <--- {
            status: 200,
            companies: [
                {
                    id: <int>,
                    company: <string>,
                    country_id: <int>
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
            company: <string> **,
            country_id: <int> **
        }
        <--- {
            status: 201,
            message: "Company added successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /clothes

        GET ?> PARAMS: id || product_id || subcategory_id &|| size_id &|| color_id &|| material_id
        <--- {
            status: 200,
            clothes: [
                {
                    id: <int>,
                    product_id: <int>,
                    subcategory_id: <int>,
                    size_id: <int>,
                    color_id <int>,
                    material_id <int>
                }
            ]
        }

        <!-- get all sizes where subcategory is ring. -->

        <!-- refactor sizes & materials for different subcategories. -->

        ****************************************************************************

        POST
        ---> {
            product_id: <int> **,
            subcategory_id: <int> **,
            size_id: <int> **,
            color_id <int> **,
            material_id <int> **
        }
        <--- {
            status: 201,
            message: "Item saved successfully"
        }
    
    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /collectibles

        GET ?> PARAMS: id || product_id || subcategory_id &|| company_id
        <--- {
            status: 200,
            collectibles: [
                {
                    id: <int>,
                    product_id: <int>,
                    subcategory_id: <int>,
                    company_id: <int>
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
                    product_id: <int> **,
                    subcategory_id: <int> **,
                    company_id: <int> **
        }
        <--- {
            status: 201,
            message: "Item saved successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /comics

        GET ?> PARAMS: id || product_id || company_id &|| author_id &|| release_date &|| genre_id &|| subcategory_id &|| language_id &|| colored
        <--- {
            status: 200,
            comics: [
                {
                    id: <int>,
                    product_id: <int>,
                    company_id: <int>,
                    author_id: <int>,
                    release_date: <string> (format: yyyy/mm/dd),
                    genre_id: <int>,
                    subcategory_id: <int>,
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
            company_id: <int> **,
            release_date: <string> (format: yyyy/mm/dd) **,
            subcategory_id: <int> **,
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

        GET ?> id || username || email
        <--- {
            status: 200,
            users: [
                {
                    id: <int>,
                    username: <string>,
                    email: <string>,
                    role_id: <int>,
                    pfp_path: <string>
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
            username: <string>,
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
            pfp_path: <string>
        }
        <--- {
            status: 201,
            message: "User created successfully"
        }

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    TODO....



// Figure out how to more efficiently send images and add the signin and logout endpoints.