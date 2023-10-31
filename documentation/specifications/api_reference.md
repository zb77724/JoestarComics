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
- [] after a method represent required header information, like the Content-Type for example.

## Routes Tree

/api

    /ratings
        
        GET ?> PARAMS: product_id
        <--- {
            id: <int>,
            product_id: <int>,
            5_stars: <int>,
            4_stars: <int>,
            3_stars: <int>,
            2_stars: <int>,
            1_stars: <int>
        }

        ****************************************************************************

        PUT ?> PARAMS: product_id
        ---> {
            5_stars: <int> **,
            4_stars: <int> **,
            3_stars: <int> **,
            2_stars: <int> **,
            1_stars: <int> **
        }

        <!-- The server will calculate the average by using the stars data in the database, when a user increases or decreases a star's count, it changes the average, it's important to note that, in order to update the rating, an object containing the current stars' count should be provided along the increased or decreased star's count. -->
    
    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

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

    /colors

        GET ?> PARAMS: id
        <--- {
            status: 200,
            colors: [
                {
                    id: <int>,
                    color: <string>
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
            color: <string> **
        }
        <--- {
            status: 201,
            message: "Color added successfully"
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

        PUT ?> PARAMS: product_id
            <--- {
                subcategory_id: <int> **,
                size_id: <int> **,
                colors_id: [<int>] **,
                material_id: <int> **
            }
        
        <!-- Category endpoints contain only one method to update product category details, this will work by passing in a full object which will replace the existing one, so it's essential to somehow save the existing data and send it along with the modified data, or else, the server will return a bad request error (400). -->
    
    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /collectibles

        PUT ?> PARAMS: product_id
            <--- {
                subcategory_id: <int> **,
                company_id: <int> **
            }
        
        <!-- Category endpoints contain only one method to update product category details, this will work by passing in a full object which will replace the existing one, so it's essential to somehow save the existing data and send it along with the modified data, or else, the server will return a bad request error (400). -->

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /comics

        PUT ?> PARAMS: product_id
            <--- {
                subcategory_id: <int> **,
                company_id: <int> **,
                authors_id: <int> **,
                genre_id: <int> **,
                language_id: <int> **,
                color: <boolean> **
            }

        
        <!-- Category endpoints contain only one method to update product category details, this will work by passing in a full object which will replace the existing one, so it's essential to somehow save the existing data and send it along with the modified data, or else, the server will return a bad request error (400). -->

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /products

        GET ?> PARAMS: id
        <--- {
            status: 200,
            products: [
                {
                    id: <int>,
                    name: <string>,
                    description: <string>,
                    category: {
                        id: <int>,
                        name: <string>
                    },
                    category_details:
                        (category = collectibles) ?: {
                            subcategory: {
                                id: <int>,
                                category_id: <int>,
                                name: <string>
                            },
                            company: {
                                id: <int>,
                                name: <string>,
                                country_id: <int>
                            }
                        }
                        (category = comics) ?: {
                            subcategory: {
                                id: <int>,
                                category_id: <int>,
                                name: <string>
                            },
                            company: {
                                id: <int>,
                                name: <string>,
                                country_id: <int>
                            },
                            authors: [{
                                id: <int>,
                                name: <string>,
                                country_id: <int>
                            }],
                            release_date: <string> (format: yyyy/mm/dd),
                            genre: {
                                id: <int>,
                                genre: <string>,
                                age_rating: <string>
                            },
                            language: {
                                id: <int>,
                                language: <string>
                            },
                            colored: <boolean>
                        }
                        (category = clothes) ?: {
                            subcategory: {
                                id: <int>,
                                category_id: <int>,
                                name: <string>
                            },
                            size: {
                                id: <int>,
                                subcategory_id: <int>,
                                size: <string>
                            },
                            colors: [{
                                id: <int>,
                                color: <string>
                            }],
                            material: {
                                id: <int>,
                                subcategory_id: <int>,
                                material: <string>
                            }
                        }
                    age_rating: {
                        id: <int>,
                        age_rating: <string>
                    },
                    series: [{
                        id: <int>,
                        name: <string>
                    }],
                    country: {
                        id: <int>,
                        name: <string>
                    },
                    rating: <int>,
                    quantity: <int>,
                    price: <double>,
                    images: [<string>]
                }
            ]
        }

        <!-- You can get all products or a single one, according to the product category, the server will obtain the related item and specific category details, such as material, color, size, author or language. These category details will be accessible from the same product object, which makes fetching and further interactions which the products much more convenient and easy. -->

        ****************************************************************************
        
        POST
        ---> {
            name: <string> **,
            description: <string> **,
            category_id: <int> **,
            category_details:
                (category = collectibles) ?: {
                            subcategory_id: <int> **,
                            company_id: <int> **
                        }
                        (category = comics) ?: {
                            subcategory_id: <int> **,
                            company_id: <int> **,
                            authors_id: [<int>] **,
                            release_date: <string> (format: yyyy/mm/dd) **,
                            genre_id: <int> **,
                            language_id: <int> **,
                            colored: <boolean> **
                        }
                        (category = clothes) ?: {
                            subcategory_id: <int> **,
                            size_id: <int> **,
                            colors_id: [<int>] **,
                            material_id: <int> **
                        }
            age_rating_id: <int> **,
            series_id: [<int>] **,
            country_id: <string> **,
            quantity: <int> **,
            price: <double> **,
        }
        <--- {
            status: 201,
            message: "Product Uploading Step 1: successful"
        }

         <!-- To add a new product, you have to fill in the generic data, and based on the specified category, category details matching said category must be provided. In this case, the subcategory will be used to match specific values that correspond exclusively to each subcategory, e.g: a ring's size is measured differently than clothing's size and their possible materials may be different as well. For this reason, having selected a subcategory, it's required to also provide values that are legal within that subcategory. It's encouraged to fetch the options and select from them instead of handwriting the values which would eventually lead to data inconsistencies in the system, which in turn would enourmously & negatively affect user experience because things like searching & filtering would start failing. This endpoint is for creating a product and specifying its data, but it should always be followed by the /images/products endpoint's POST method, in order to provide images for the product, by using multipart form data instead of JSON like in this method. -->

        ****************************************************************************

        PUT PARAMS: id
        ---> [Content-Type: multipart/form-data] {
            name: <string> **,
            description: <string> **,
            age_rating_id: <int> **,
            series_id: [<int>] **,
            country_id: <int> **,
            rating: <int> **,
            quantity: <int> **,
            price: <double> **,
        }
        <--- {
            status: 204,
            message: "Changes saved successfully"
        }

        <!-- This allows for updating generic product data, categories cannot be changed, and category details must be changed using the category endpoints (/clothes, /collectibles & /comics). -->

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
        }

        <!-- This is the same as the users' POST method, with the slight difference that in this case, users will not be able to specify their roles and will be assigned "customer" by default by the server. After submiting the data, a user will be created. -->

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

        GET ?> PARAMS: user_id &|| id
        <--- {
            status: 200,
            orders: [
                {
                    id: <int>,
                    order_date: <string> (format:  YYYY-MM-DD HH:MI:SS),
                    delivery_date: <string> (format:  YYYY-MM-DD HH:MI:SS),
                    total_price: <float>,
                    user_id: <int>,
                    products: [
                        {
                            id: <int>,
                            name: <string>,
                            description: <string>,
                            category: {
                                id: <int>,
                                name: <string>
                            },
                            category_details:
                                (category = collectibles) ?: {
                                    subcategory: {
                                        id: <int>,
                                        category_id: <int>,
                                        name: <string>
                                    },
                                    company: {
                                        id: <int>,
                                        name: <string>,
                                        country_id: <int>
                                    }
                                }
                                (category = comics) ?: {
                                    subcategory: {
                                        id: <int>,
                                        category_id: <int>,
                                        name: <string>
                                    },
                                    company: {
                                        id: <int>,
                                        name: <string>,
                                        country_id: <int>
                                    },
                                    authors: [{
                                        id: <int>,
                                        name: <string>,
                                        country_id: <int>
                                    }],
                                    release_date: <string> (format: yyyy/mm/dd),
                                    genre: {
                                        id: <int>,
                                        genre: <string>,
                                        age_rating: <string>
                                    },
                                    language: {
                                        id: <int>,
                                        language: <string>
                                    },
                                    colored: <boolean>
                                }
                                (category = clothes) ?: {
                                    subcategory: {
                                        id: <int>,
                                        category_id: <int>,
                                        name: <string>
                                    },
                                    size: {
                                        id: <int>,
                                        subcategory_id: <int>,
                                        size: <string>
                                    },
                                    colors: [{
                                        id: <int>,
                                        color: <string>
                                    }],
                                    material: {
                                        id: <int>,
                                        subcategory_id: <int>,
                                        material: <string>
                                    }
                                }
                            age_rating: {
                                id: <int>,
                                age_rating: <string>
                            },
                            series: [{
                                id: <int>,
                                name: <string>
                            }],
                            country: {
                                id: <int>,
                                name: <string>
                            },
                            rating: <int>,
                            quantity: <int>,
                            price: <double>,
                            images: [<string>]
                        }
                    ]
                }   
            ]
        }

        <!-- The orders will contain their order data and will also return details about the products that were purchased in that specific order. -->

        ****************************************************************************

        POST
        ---> {
            total_price **,
            products_id: [<int>] **,
            shipping_address: <string> (format: country-state/province-city-address-floor)
        }

        <!-- To add a new order, an array of product id's must be sent along a total price, from that, the server will build the order by using the provided product list's data as well as automatically generating other information. -->

        ****************************************************************************

        PUT ?> id
        ---> {
            delivery_date: <string> (format:  YYYY-MM-DD HH:MI:SS) **
        }

        <!-- This method will only be used to add a delivery date to an order, which signifies it's been successfully delivered to the customer. This can be used to track an order's state, if empty, it's pending, if present, it's delivered. -->

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /anouncements
        
        GET ?> PARAMS id
        <--- {
            status: 200,
            anouncements: [
                {
                    id: <int>,
                    title: <string>,
                    content: <string>,
                    pub_date: <string> (format:  YYYY-MM-DD HH:MI:SS),
                    images: [<string>]
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
            title: <string> **,
            content: <string> **
        }

        ****************************************************************************

        PUT ?> PARAMS: id
        ---> {
            title: <string> **,
            content: <string> **
        }

        ****************************************************************************

        DELETE ?> PARAMS: id
        <--- {
            status: 204,
            message: "Anouncement deleted successfully"
        }

        <!-- When deleting an anouncement, all images are deleted first to prevent relational database constraints from blocking the delete operation, and then the anouncement is eliminated from the database. -->

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /comments
        
        GET ?> PARAMS id
        <--- {
            status: 200,
            comments: [
                {
                    id: <int>,
                    user_id: <int>,
                    product_id: <int>,
                    content: <string>,
                    pub_date: <string> (format:  YYYY-MM-DD HH:MI:SS),
                    votes: <int>
                }
            ]
        }

        ****************************************************************************

        POST
        ---> {
            user_id: <int>,
            product_id: <int>,
            content: <string>,
        }

        ****************************************************************************

        PUT ?> PARAMS: id
        ---> {
            content: <string> **,
            votes: <int> **
        }

        <!-- A comment's content can be updated by the user who posted it, and the votes are increased or decreased by any users. -->

        ****************************************************************************

        DELETE ?> PARAMS: id
        <--- {
            status: 204,
            message: "Comment deleted successfully"
        }

        <!-- Comments can always be deleted without any restriction from the database either by the user who posted it or by administrators who may consider the comment as violating some sort of use policy. -->

    ****************************************************************************
    ****************************************************************************
    ****************************************************************************

    /images

        /products
            
            POST 
            ---> [Content-Type: multipart/form-data] {
                product_id: <int> **,
                images: [<file>] **
            }
            <--- {
                status: 201,
                message: "Image successfully added"
            }
        
            <!-- Images will be received and stored in the corresponding folder in the server's file system, as well as stored in the database along with the corresponding product_id, in order to later return them inside the product. (this implementation was chosen since this project does not require to store a high amount of images). -->
            
            ****************************************************************************

            DELETE PARAMS: product_id & id
            <--- {
                status: 204,
                message: "Image successfully deleted"
            }

            <!-- The image will be deleted from the file system and the database.  -->
        
        ****************************************************************************
        ****************************************************************************
        
        /anouncements
            
            POST 
            ---> [Content-Type: multipart/form-data] {
                anouncement_id: <int> **,
                images: [<file>] **
            }
            <--- {
                status: 201,
                message: "Image successfully added"
            }
        
            <!-- Images will be received and stored in the corresponding folder in the server's file system, as well as stored in the database along with the corresponding anouncement_id, in order to later return them inside the anouncement. -->
            
            ****************************************************************************

            DELETE PARAMS: anouncement_id & id
            <--- {
                status: 204,
                message: "Image successfully deleted"
            }

            <!-- The image will be deleted from the file system and the database.  -->
        
        ****************************************************************************
        ****************************************************************************
        
        /users
            
            POST 
            ---> [Content-Type: multipart/form-data] {
                user_id: <int> **,
                image: <file> **
            }
            <--- {
                status: 201,
                message: "Image updated successfully"
            }
        
            <!-- Images will be received and stored in the corresponding folder in the server's file system, as well as stored in the database along with the corresponding user_id, in order to later return them inside the user. -->
            
            ****************************************************************************

            DELETE PARAMS: user_id & id
            <--- {
                status: 204,
                message: "Image successfully deleted"
            }

            <!-- All users can delete their profile pictures anytime (unless they are using the default icecream cat profile picture). -->