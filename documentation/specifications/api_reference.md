# API Reference

## Document Description

This is the API Reference, which aims to explain with as much detail as possible how the server will interact with the frontend, specifying what data of what type should be sent to a specific endpoint and in which format for the request to be successfully processed, as well as the structure of the server's responses, in order to facilitate the consumption of the API.

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
- ? represents a conditional data return that may or may not happen according to a condition within parentheses "()" before the sign

## Routes Tree

/api

    /countries ?> PARAMS: id

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

        GET ?> PARAMS: id
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

        GET ?> PARAMS: id
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

        GET ?> PARAMS: id || age_rating_id
        <--- {
            status: 200,
            genres: [
                {
                    id: <int>,
                    genre: <string>,
                    age_rating: <string>
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

        GET ?> PARAMS: id

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

        GET ?> PARAMS: id
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

        GET ?> PARAMS: id || category_id
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

        GET ?> PARAMS: id || subcategory_id
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

        GET ?> PARAMS: id || subcategory_id
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

        GET ?> PARAMS: id || country_id || name
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

        GET ?> PARAMS: id || country_id || name
        <--- {
            status: 200,
            companies: [
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

        GET ?> PARAMS: id || name &|| category_id &|| age_rating_id &|| country_id
        <--- {
            status: 200,
            products: [
                {
                    id: <int>,
                    name: <string>,
                    description: <string>,
                    category_id: <int>,
                    category_details:
                        (category_id = collectibles) ?: {
                            subcategory_id: <int>,
                            company_id: <int>
                        }
                        (category_id = comics) ?: {
                            company_id: <int>,
                            author_id: <int>,
                            release_date: <string> (format: yyyy/mm/dd),
                            genre_id: <int>,
                            subcategory_id: <int>,
                            language_id: <int>,
                            colored: boolean
                        }
                        (category_id = clothes) ?: {
                            subcategory_id: <int>,
                            size_id: <int>,
                            color_id <int>,
                            material_id <int>
                        }
                    age_rating_id: <int>,
                    country_id: <int>,
                    rating: <int>,
                    quantity: <int>,
                    price: <double>,
                    images: [<string>]
                }
            ]
        }

        <!-- You can get all products or get them by specific properties, according to the product category's ID, the server will obtain the related item and specific category details, such as material, color, size, author or language. These category details will be accessible from the same product object, which makes fetching and further interactions which the products much more convenient and easy. -->

        ****************************************************************************
        
        POST
        ---> {
            name: <string> **,
            description: <string> **,
            category_id: <int> **,
            category_details:
                (category_id = collectibles) ?: {
                            subcategory_id: <int>,
                            company_id: <int>
                        }
                        (category_id = comics) ?: {
                            company_id: <int>,
                            author_id: <int>,
                            release_date: <string> (format: yyyy/mm/dd),
                            genre_id: <int>,
                            subcategory_id: <int>,
                            language_id: <int>,
                            colored: boolean
                        }
                        (category_id = clothes) ?: {
                            subcategory_id: <int>,
                            size_id: <int>,
                            color_id <int>,
                            material_id <int>
                        }
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

         <!-- To add a new product, you have to fill in the generic data, and based on the specified category, category details matching said category must be provided. In this case, the subcategory will be used to match specific values that correspond exclusively to each subcategory, e.g: a ring's size is measured differently than clothing's size and their possible materials may be different as well. For this reason, having selected a subcategory, it's required to also provide values that are legal within that subcategory. -->

        ****************************************************************************

        PUT PARAMS: id
        ---> {
            description: <string>,
            category_id: <int>,
            category_details:
                (category_id = collectibles) ?: {
                            subcategory_id: <int>,
                            company_id: <int>
                        }
                        (category_id = comics) ?: {
                            company_id: <int>,
                            author_id: <int>,
                            release_date: <string> (format: yyyy/mm/dd),
                            genre_id: <int>,
                            subcategory_id: <int>,
                            language_id: <int>,
                            colored: boolean
                        }
                        (category_id = clothes) ?: {
                            subcategory_id: <int>,
                            size_id: <int>,
                            color_id <int>,
                            material_id <int>
                        }
            age_rating_id: <int>,
            country_id: <int>,
            rating: <int>,
            quantity: <int>,
            price: <double>,
            images: [<string>]
        }
        <--- {
            status: 204,
            message: "Changes saved successfully"
        }

        <!-- Product updates allow administrators to modify the **values** of the product's properties, which means changing subcategories or categories is not possible, you have to provide the data you wish to change. -->

        ****************************************************************************

        DELETE PARAMS: id
        <--- {
            status: 204,
            message: "Product disabled successfully"
        }

        <!-- Due to the potential loss of relevant sales & business data, products cannot be eliminated from the database, but rather disabled, which means they will no longer be available for customers or administrators to see or interact with, but their information will be present when required by the server to process sales data for example. -->

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

        <!-- The roles will be important to implement protected routes and authorization. -->

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

        <!-- Usernames must be unique so that users are more easily distinguishable, emails are used to contact the user or reply to their messages. If no profile picture is provided, the user will be assigned one by default. This is intended for admins, which will be able to specify a user's role as well. -->

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

        <!-- Users can change all this data, that is, as long as they input valid data, for instance, they cannot change their username to one that's already being used or change their password to one that doesn't fulfill the security requirements or format expected. -->

        ****************************************************************************

        DELETE PARAMS: id
        <--- {
            status: 204,
            message: "User disabled successfully"
        }

        <!-- For the same reasons explained above in the products' delete method, users will not be deleted from the database, but rather disabled and invisible to the system, but their information will be kept for data processing purposes. -->

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
            message: "User created successfully",
            accessToken: <string>,
            role_id: <int>
        }

        <!-- This is the same as the users' POST method, with the slight difference that in this case, users will not be able to specify their roles and will be assigned "customer" by default by the server. After submiting the data, a user will be created and the authorization information will be returned to have access to the other endpoints and can be used to authorize users within the client application as well. -->

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /signin

        POST
        ---> {
            username: <string> **,
            password: <string> **,
        }
        <--- {
            status: 200,
            accessToken: <string>,
            role_id: <int>
        }

        <!-- After submiting the data, the authorization information of the authenticated user will be returned to have access to the other endpoints and can be used to authorize users within the client application as well. -->

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /refresh

        GET
        <--- {
            status: 200,
            accessToken: <string>,
            role_id: <int>
        }

        <!-- Once the access token has expired, the client application can generate another one by using the refresh token which is given when the user signs in to their account. This refresh token will be stored in an http only cookie as well as in the database. -->

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /logout

        POST
        <--- {
            status: 204,
            message: "Session terminated successfully"
        }
    
        <!-- This will terminate the user's session by eliminating the refresh token from the cookies and database, and the access token should be eliminated as well in the frontend application to ensure nobody can access that account until authentication process is successfully completed again. -->

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /orders

        GET ?> PARAMS: id || user_id &|| order_date
        <--- {
            status: 200,
            orders: [
                {
                    id: <int>,
                    order_date: <string> (format:  YYYY-MM-DD HH:MI:SS),
                    delivery_date: <string> (format:  YYYY-MM-DD HH:MI:SS),
                    total_price: <float>,
                    user_id: <int>,
                    products: [{
                        id: <int>,
                        name: <string>,
                        description: <string>,
                        category_id: <int>,
                        age_rating_id: <int>,
                        country_id: <int>,
                        rating: <int>,
                        quantity: <int>,
                        price: <double>,
                        images: [<string>]
                    }]
                }
            ]
        }

        <!-- The orders will contain their order data and will also return details about the products that were purchased in that specific order. -->

        ****************************************************************************

        POST
        ---> {
            total_price **,
            product_id_list: [<int>] **
        }

        <!-- To add a new order, an array of product id's must be sent along a total price, from that, the server will build the order by using the provided product list's data as well as automatically generating other information. -->

        ****************************************************************************

        PUT ?> id
        ---> {
            delivery_date: <string> (format:  YYYY-MM-DD HH:MI:SS) **
        }

        <!-- This method will only be used to add a delivery date to an order, which signifies it's been successfully delivered to the customer. This can be used to track an order's state, if empty, it's pending, if present, it's delivered. -->