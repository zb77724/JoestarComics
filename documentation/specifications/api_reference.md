# API Reference

## Index
[Description]   (#description)
[Notation]      (#notation)
[Routes Three]  (#routes-three)

## Description

This document aims to provide a detailed explanation of the API's behaviour, a complete description of the server's responses, their content, structure & format; clear indications regarding the request's structure, content, headers, parameters & format; as well as suggestions to optimize, take maximum advantage of the API's features and successfully implement it in the client application. Without further ado, below is the explanaton of the notation used throughout the document.


## Notation

- /         :   A slash indicates a route
- <type>    :   Datatypes are specified between tag symbols
- []        :   The brackets following a method contain information about the request header
- =>        :   Indicates a method's return value
- <=        :   Indicates a method's input value
- $         :   Indicates a required property or value
- :public   :   Indicates that the following routes & or methods are always accessible
- :user     :   Indicates that the following routes & or methods require user authorization
- :admin    :   Indicates that the following routes & or methods require admin privileges
- :param    :   A word preceded by a colon after a method represents the parameters
- ?         :   Indicates conditional data, when preceding parameters, it indicates they're optional


## Routes Three

/api

    /signup
    -----------------------------------------------------------------
    :public

        POST [
            Content-Type    :   application/json
        ] => {
            $ username      :   <string>
            $ password      :   <string>
            $ email         :   <string>
        }

    -----------------------------------------------------------------
    -----------------------------------------------------------------
    -----------------------------------------------------------------

    /users
    -----------------------------------------------------------------
    :public

        GET :id
        <= {
            status      :   200
            users       :   [
                                {
                                    id          :   <int>
                                    username    :   <string>
                                    role        :   <string>
                                    email       :   <string>
                                    pfp_path    :   <string>
                                }
                            ]
        }

    -----------------------------------------------------------------
    :user

        PUT [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            username        :   <string>
            password        :   <string>
            email           :   <string>
        }
        <= {
            status    :    204
        }

        -------------------------------------------------------------
        -------------------------------------------------------------

        /images
        
            PUT [
                Content-Type    :   multipart/form-data
                Authorization   :   Bearer  <token>
            ] => "pfp"          :   <file: img>
                
            <= {
                status          :   204
            }


    <!-- The user ID is provided automatically after authentication -->

    -----------------------------------------------------------------
    -----------------------------------------------------------------
    -----------------------------------------------------------------

    /auth
    -----------------------------------------------------------------
    :public

        /signin
            
            POST [
                Content-Type    :   application/json
            ] => {
                $ username      :   <string>
                $ password      :   <string>
            }
            <= {
                status          :   200,
                role            :   <string>
                access_token    :   <string>
            }
        
        -------------------------------------------------------------
        -------------------------------------------------------------

        /refresh

            POST
            <= {
                status          :   200,
                role            :   <string>
                access_token    :   <string>
            }
        
    -----------------------------------------------------------------
    -----------------------------------------------------------------
    -----------------------------------------------------------------

    /age_ratings
    -----------------------------------------------------------------
    :public

        GET
        <= {
            status      :   200
            age_ratings :   [
                                {
                                    id          :   <int>
                                    age_rating  :   <string>
                                }
                            ]
        }
    
    -----------------------------------------------------------------
    :admin

        POST [
            Content-Type        :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            $ age_rating        :   <string>
        }
        <= {
            status              :   201
            message             :   "Age rating added sucessfully"
        }

        -------------------------------------------------------------
        -------------------------------------------------------------

        PUT [
            Content-Type        :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            $ age_rating        :   <string>
        }
        <= {
            status              :   204
        }
        
    -----------------------------------------------------------------
    -----------------------------------------------------------------
    -----------------------------------------------------------------

    /languages
    -----------------------------------------------------------------
    :public

        GET
        <= {
            status      :   200
            languages   :   [
                                {
                                    id          :   <int>
                                    language    :   <string>
                                }
                            ]
        }
    
    -----------------------------------------------------------------
    :admin

        POST [
            Content-Type        :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            $ language          :   <string>
        }
        <= {
            status              :   201
            message             :   "Language added sucessfully"
        }

        -------------------------------------------------------------
        -------------------------------------------------------------

        PUT [
            Content-Type        :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            $ language          :   <string>
        }
        <= {
            status              :   204
        }
    
    -----------------------------------------------------------------
    -----------------------------------------------------------------
    -----------------------------------------------------------------

    /countries
    -----------------------------------------------------------------
    :public

        GET
        <= {
            status      :   200
            countries   :   [
                                {
                                    id      :   <int>
                                    name    :   <string>
                                }
                            ]
        }

    -----------------------------------------------------------------
    :admin

        POST [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            $ name          :   <string>
        }
        <= {
            status          :   201
            message         :   "Country added sucessfully"
        }

        -------------------------------------------------------------
        -------------------------------------------------------------

        PUT [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            $ name          :   <string>
        }
        <= {
            status          :   204
        }
    
    -----------------------------------------------------------------
    -----------------------------------------------------------------
    -----------------------------------------------------------------

    /categories
    -----------------------------------------------------------------
    :public

        GET
        <= {
            status      :   200
            categories  :   [
                                {
                                    id      :   <int>
                                    name    :   <string>
                                }
                            ]
        }
    
    -----------------------------------------------------------------
    :admin

        POST [
            Content-Type        :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            $ name              :   <string>
        }
        <= {
            status              :   201
            message             :   "Category added sucessfully"
        }

        -------------------------------------------------------------
        -------------------------------------------------------------

        PUT [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            $ name            :   <string>
        }
        <= {
            status          :   204
        }
    
    -----------------------------------------------------------------
    -----------------------------------------------------------------
    -----------------------------------------------------------------

    /subcategories
    -----------------------------------------------------------------
    :public

        GET
        <= {
            status          :   200
            subcategories   :   [
                                {
                                    id          :   <int>
                                    name        :   <string>
                                    category_id :   <int>
                                }
                            ]
        }
    
    -----------------------------------------------------------------
    :admin

        POST [
            Content-Type        :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            $ subcategory       :   <string>
            $ category_id       :   <int>
        }
        <= {
            status              :   201
            message             :   "Subcategory added sucessfully"
        }

        -------------------------------------------------------------
        -------------------------------------------------------------

        PUT [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            $ subcategory     :   <string>
        }
        <= {
            status          :   204
        }

    -----------------------------------------------------------------
    -----------------------------------------------------------------
    -----------------------------------------------------------------

    /colors
    -----------------------------------------------------------------
    :public

        GET
        <= {
            status  :   200
            colors  :   [
                                {
                                    id      :   <int>
                                    name    :   <string>
                                }
                            ]
        }
    
    -----------------------------------------------------------------
    :admin

        POST [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            $ name          :   <string>
        }
        <= {
            status          :   201
            message         :   "Color added sucessfully"
        }

        -------------------------------------------------------------
        -------------------------------------------------------------

        PUT [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            $ color         :   <string>
        }
        <= {
            status          :   204
        }

    -----------------------------------------------------------------
    -----------------------------------------------------------------
    -----------------------------------------------------------------

    /covers
    -----------------------------------------------------------------
    :public

        GET
        <= {
            status  :   200
            covers  :   [
                                {
                                    id      :   <int>
                                    cover   :   <string>
                                }
                            ]
        }

    -----------------------------------------------------------------
    :admin

        POST [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            $ cover         :   <string>
        }
        <= {
            status          :   201
            message         :   "Cover added sucessfully"
        }

        -------------------------------------------------------------
        -------------------------------------------------------------

        PUT [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            $ cover         :   <string>
        }
        <= {
            status          :   204
        }
    
    -----------------------------------------------------------------
    -----------------------------------------------------------------
    -----------------------------------------------------------------

    /sizes
    -----------------------------------------------------------------
    :public

        GET
        <= {
            status  :   200
            sizes   :   [
                                {
                                    id              :   <int>
                                    size            :   <string>
                                    subcategory_id  :   <int>
                                }
                            ]
        }
    
    -----------------------------------------------------------------
    :admin

        POST [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            $ size          :   <string>
        }
        <= {
            status          :   201
            message         :   "Size added sucessfully"
        }

        -------------------------------------------------------------
        -------------------------------------------------------------

        PUT [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            $ size          :   <string>
        }
        <= {
            status          :   204
        }

    -----------------------------------------------------------------
    -----------------------------------------------------------------
    -----------------------------------------------------------------

    /materials
    -----------------------------------------------------------------
    :public

        GET
        <= {
            status      :   200
            materials   :   [
                                {
                                    id              :   <int>
                                    name            :   <string>
                                    subcategory_id  :   <int>
                                }
                            ]
        }
    
    -----------------------------------------------------------------
    :admin

        POST [
            Content-Type        :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            $ name              :   <string>
            $ subcategory_id    :   <int>
        }
        <= {
            status              :   201
            message             :   "Material added sucessfully"
        }

        -------------------------------------------------------------
        -------------------------------------------------------------

        PUT [
            Content-Type        :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            name                :   <string>
            subcategory_id      :   <int>

        }
        <= {
            status              :   204
        }

    -----------------------------------------------------------------
    -----------------------------------------------------------------
    -----------------------------------------------------------------

    /authors
    -----------------------------------------------------------------
    :public

        GET
        <= {
            status  :   200
            authors :   [
                                {
                                    id          :   <int>
                                    name        :   <string>
                                    country_id  :   <int>
                                }
                            ]
        }
    
    -----------------------------------------------------------------
    :admin

        POST [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            $ name          :   <string>
            $ country_id    :   <int>
        }
        <= {
            status          :   201
            message         :   "Author added sucessfully"
        }

        -------------------------------------------------------------
        -------------------------------------------------------------

        PUT [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            name            :   <string>
            country_id      :   <int>
        }
        <= {
            status          :   204
        }

    -----------------------------------------------------------------
    -----------------------------------------------------------------
    -----------------------------------------------------------------

    /genres
    -----------------------------------------------------------------
    :public

        GET
        <= {
            status  :   200
            genres  :   [
                                {
                                    id              :   <int>
                                    name            :   <string>
                                    age_rating_id   :   <int>
                                }
                            ]
        }
    
    -----------------------------------------------------------------
    :admin

        POST [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            $ name          :   <string>
            $ country_id    :   <int>
        }
        <= {
            status          :   201
            message         :   "Genre added sucessfully"
        }

        -------------------------------------------------------------
        -------------------------------------------------------------

        PUT [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            name            :   <string>
            country_id      :   <int>
        }
        <= {
            status          :   204
        }
    
    -----------------------------------------------------------------
    -----------------------------------------------------------------
    -----------------------------------------------------------------

    /companies
    -----------------------------------------------------------------
    :public

        GET
        <= {
            status      :   200
            companies   :   [
                                {
                                    id          :   <int>
                                    category    :   <string>
                                    country_id  :   <int>
                                }
                            ]
        }

    -----------------------------------------------------------------
    :admin

        POST [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            $ name          :   <string>
            $ country_id    :   <int>
        }
        <= {
            status          :   201
            message         :   "Company added sucessfully"
        }

        -------------------------------------------------------------
        -------------------------------------------------------------

        PUT [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            name            :   <string>
            country-id      :   <int>
        }
        <= {
            status          :   204
        }
    
    -----------------------------------------------------------------
    -----------------------------------------------------------------
    -----------------------------------------------------------------

    /series
    -----------------------------------------------------------------
    :public

        GET
        <= {
            status      :   200
            series :   [
                                {
                                    id      :   <int>
                                    name    :   <string>
                                }
                            ]
        }
    
    -----------------------------------------------------------------
    :admin

        POST [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            $ name          :   <string>
        }
        <= {
            status          :   201
            message         :   "Series added sucessfully"
        }

        -------------------------------------------------------------
        -------------------------------------------------------------

        PUT [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            $ name          :   <string>
        }
        <= {
            status          :   204
        }
    
    -----------------------------------------------------------------
    -----------------------------------------------------------------
    -----------------------------------------------------------------

    /products
    -----------------------------------------------------------------
    :public

        GET ? :id
        <--- {
            status      :   200
            id          :   <int>
            name        :   <string>
            description :   <string>
            age_rating  :   {
                                id          :   <int>
                                age_rating  :   <string>
                            }
            price       :   <double>
            rating      :   <int: 1-5>
            quantity    :   <int>
            series      :   [
                                {
                                    id      :   <int>
                                    name    :   <string>
                                }
                            ]
            country     :   [
                                {
                                    id      :   <int>
                                    name    :   <string>
                                }
                            ]
            category    :   {
                                id          :   <int>
                                name        :   <string>
                            }
            category_details        ?   (category.name === "comics")        
                                    :   {
                                            id              :   <int>
                                            subcategory     :   {
                                                                    id          :   <int>
                                                                    name        :   <string>
                                                                    category_id :   <int>
                                                                }
                                            company         :   {
                                                                    id          :   <int>
                                                                    company     :   <string>
                                                                    country_id  :   <int>
                                                                }
                                            language        :   {
                                                                    id          :   <int>
                                                                    language    :   <string>
                                                                }
                                            cover           :   {
                                                                    id          :   <int>
                                                                    cover       :   <string>
                                                                }
                                            genres          :   [
                                                                    {
                                                                        id              :   <int>
                                                                        name            :   <string>
                                                                        age_rating_id   :   <int>
                                                                    }
                                                                ]
                                            authors         :   [
                                                                    {
                                                                        id              :   <int>
                                                                        name            :   <string>
                                                                        country_id      :   <int>
                                                                    }
                                                                ]
                                            colored         :   <boolean>
                                            release_date    :   <string: yyyy-mm-ss hh:mm:ss>
                                        }

                                    ?   (category.name === "clothes)        
                                    :   {
                                            id              :   <int>
                                            subcategory     :   {
                                                                    id              :   <int>
                                                                    name            :   <string>
                                                                    category_id     :   <int>
                                                                }
                                            material        :   {
                                                                    id              :   <int>
                                                                    name            :   <string>
                                                                    subcategory_id  :   <int>
                                                                }
                                            size            :   {
                                                                    id              :   <int>
                                                                    size            :   <string>
                                                                    subcategory_id  :   <int>
                                                                }
                                            colors          :   [
                                                                    {
                                                                        id          :   <int>
                                                                        name        :   <string>
                                                                    }
                                                                ]
                                        }

                                    ?   (category.name === "collectibles)
                                    :   {
                                            id              :   <int>
                                            subcategory     :   {
                                                                    id          :   <int>
                                                                    name        :   <string>
                                                                    category_id :   <int>
                                                                }
                                            company         :   {
                                                                    id          :   <int>
                                                                    company     :   <string>
                                                                    country_id  :   <int>
                                                                }
                                        }
            images      :   [<string>]
        }

    -----------------------------------------------------------------
    :admin

        POST [
            Content-Type        :   application/json
            Authorization       :   Bearer <token>
        ] => {
            $ name              :   <string>
            $ description       :   <string>
            $ age_rating_id     :   <int>
            $ price             :   <double>
            $ rating            :   <int: 1-5>
            $ quantity          :   <int>
            $ category_id       :   <int>
            $ series_ids        :   [<int>]
            $ category_details        ?   (category.name === "comics")        
                                    :   {
                                            $ subcategory_id  :   <int>
                                            $ company_id      :   <int>
                                            $ language_id     :   <int>
                                            $ cover_id        :   <int>
                                            $ genre_ids       :   [<int>]
                                            $ author_ids      :   [<int>]
                                            $ colored         :   <boolean>
                                            $ release_date    :   <string: yyyy-mm-ss hh:mm:ss>
                                        }

                                    ?   (category.name === "clothes)        
                                    :   {
                                            $ subcategory_id    :   <int>
                                            $ material_id       :   <int>
                                            $ size_id           :   <int>
                                            $ color_ids         :   [<int>]
                                        }

                                    ?   (category.name === "collectibles)
                                    :   {
                                            $ subcategory_id  :   <int>
                                            $ company_id      :   <int>
                                        }
        }
        <= {
            status  :   201,
            message :   "Product added successfully"
        }

        -------------------------------------------------------------
        -------------------------------------------------------------

        PUT [
            Content-Type    :   application/json
            Authorization   :   Bearer <token>
        ] => {
            name        :   <string>
            description :   <string>
            quantity    :   <int>
            price       :   <double>
            age_rating  :   <age_rating>
            series_ids  :   [<int>]
            country_id  :   <int>
        }

        -------------------------------------------------------------
        -------------------------------------------------------------

        /images

            PUT [
                Content-Type    :   application/json
                Authorization   :   Bearer <token>
            ] => <file: img>
            <= {
                status  :   204
            }


    -----------------------------------------------------------------
    -----------------------------------------------------------------
    -----------------------------------------------------------------

    /clothes

    -----------------------------------------------------------------
    :admin

        PUT [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            subcategory_id  :   <int>
            material_id     :   <int>
            size_id         :   <int>
            color_ids       :   [<int>]
        }
        <= {
            status    :    204
        }

    -----------------------------------------------------------------
    -----------------------------------------------------------------
    -----------------------------------------------------------------

    /collectibles
    -----------------------------------------------------------------
    :admin

        PUT [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            subcategory_id  :    <int>
            company_id      :    <int>
        }
        <= {
            status    :    204
        }

    -----------------------------------------------------------------
    -----------------------------------------------------------------
    -----------------------------------------------------------------

    /comics
    -----------------------------------------------------------------
    :admin

        PUT [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            subcategory_id  :   <int>
            company_id      :   <int>
            language_id     :   <int>
            cover_id        :   <int>
            genre_ids       :   [<int>]
            author_ids      :   [<int>]
            colored         :   <boolean>
            release_date    :   <string>
        }
        <= {
            status    :    204
        }

    -----------------------------------------------------------------
    -----------------------------------------------------------------
    -----------------------------------------------------------------

    /ratings
    -----------------------------------------------------------------
    :public

        PUT [
            Content-Type    :   application/json
        ] => {
            five_stars      :   <int: 1 || -1>
            four_stars      :   <int: 1 || -1>
            three_stars     :   <int: 1 || -1> 
            two_stars       :   <int: 1 || -1>
            one_stars       :   <int: 1 || -1>
        }
        <= {
            status          :   204
        }

    -----------------------------------------------------------------
    -----------------------------------------------------------------
    -----------------------------------------------------------------

    /orders
    -----------------------------------------------------------------
    :user

        GET ? :id [
            Authorization   :   Bearer  <token>
        ]
        <= {
            id          :   <int>
            order_date  :   <string: yyyy-mm-ss hh:mm:ss>
            total_price :   <double>
            user_id     :   <int>
            purchases   :   [
                                {
                                    product         :   {
                                                            <product>
                                                        }
                                    quantity        :   
                                    price_instance  :   
                                }
                            ]
        }

    -----------------------------------------------------------------
    -----------------------------------------------------------------
    -----------------------------------------------------------------

    /comments
    -----------------------------------------------------------------
    :public

        GET
        <= {
            id              :   <int>
            user            :   <user>
            product_id      :   <int>
            content         :   [<string>]
            pub_date        :   <string: yyyy-mm-ss hh:mm:ss>
            votes           :   <int>
        }

        -------------------------------------------------------------
        -------------------------------------------------------------
    
        PUT :id [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            vote            :   <int: 1 || -1>
        }
        <= {
            status          :   204
        }
    
    -----------------------------------------------------------------
    :user

        POST [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            $ product_id    :   <int>
            $ content       :   <string>
        }

        -------------------------------------------------------------
        -------------------------------------------------------------

        PUT :id [
            Content-Type    :   application/json
            Authorization   :   Bearer  <token>
        ] => {
            content         :   [<string>]
        }
        <= {
            status          :   204
        }

        -------------------------------------------------------------
        -------------------------------------------------------------

        DELETE :id [
            Authorization   :   Bearer  <token>
        ]
        <= {
            status    :    204
        }

    -----------------------------------------------------------------
    -----------------------------------------------------------------
    -----------------------------------------------------------------

    /anouncements
    -----------------------------------------------------------------
    :public

        GET ? :id
        <= {
            status          :   200,
            anouncements    :   [
                                    {
                                        id          :   <int>
                                        title       :   <string>
                                        content     :   [<string>]
                                        subject     :   <strings>
                                        pub_date    :   <string: yyyy-mm-ss hh:mm:ss>
                                        images      :   [<file: img>]
                                    }
                                ]
        }
    
    -----------------------------------------------------------------
    :admin

        /admin

            POST [
                Content-Type    :   application/json
                Authorization   :   Bearer  <token>
            ] => {
                $ title         :   <string>
                $ content       :   [<string>]
                $ subject       :   <string>
            }
            <= {
                status          :   201
                message            "Anouncement posted successfully"
            }

            -------------------------------------------------------------
            -------------------------------------------------------------

            PUT :id [
                Content-Type    :   application/json
                Authorization   :   Bearer  <token>
            ] => {
                title           :   <string>
                content         :   [<string>]
                subject         :   <string: yyyy-mm-dd hh:mm:ss>
            }
            <= {
                status    :    204
            }

            -------------------------------------------------------------
            -------------------------------------------------------------

            /images

                PUT :id [
                    Content-Type    :   multipart/form-data
                    Authorization   :   Bearer  <token>
                ] => <file: img>