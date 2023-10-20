# Software Requirement Specification

## Description

This document describes the technical requirements that are expected of the system, based on the business requirement specification document.

## Requirements

### Database

    It is required in order to efficiently store information about customers, products & orders, and have that information be accessible for the purposes of the system. For this project, a relational sql database will be implemented, using MYSQL as a management system & phpmyadmin as an administration tool.

    The database must have tables for users, their orders, comments & announcements; as well as products and their categories.

### API

    An API will be used to manage the flow of information within the application, allowing for interactions with the database as well as the successful implementation of core functionalities such as product sales and data analytics.

    It should manage user authentication & authorization, database queries, transactions & processing of user & sales data, all while guaranteeing security & good performance.

### Client-Side Application

    A system with a straightforward & visually appealing user interface, whose purpose is to serve as the means through which customers & administrators interact with the system, it must fulfill the following conditions:

    - API Requests

        It must efficiently handle requests to the API in order to display relevant information to the users, add or modify information within the database & perform most core functionalities such as searching, rating & buying products, making announcements, or commenting.
    
    - Responsive Layout

        The user interface must be comfortable, organized & pleasing to the eye in most screen sizes, from a mobile phone or a tablet, to a desktop computer.
    
    - Intuitive Navigation

        It must be crystal clear where you are & where you may want to go, a navigation bar or menu has to be present in all pages in this application, it will contain several links related to the different categories & admin pages, as well as options regarding the user's session, such as a logout button.
    
    - Product searching & filtering

        The customer should be able to search for specific products and further narrow down the results by applying customized filters according to the category they're currently in, e.g. in the comics section, customers should be able to filter by age-rating or color. All of this funcionality will be directly implemented in the frontend application through an intuitive searchbar and filter menu.
    
    - Cart

        Customers must be able to easily add as many products as they wish, in the quantities specified, to a cart or list of products which minimalistically displays products (only specifiying key details such as the name, price & quantity) and a total price at the end, these products should be removable by the customers, and their quantities, decreased or increased. From here, the customers should be able to make an order which will then be processed in the backend for statistics generation, order registration & order delivery.
    
    - User Authentication & Authorization

        The system should enforce general user authentication & authorization, as well as role-based authorization & protected routes. It should not be possible, for instance, to access the analytics page or to update a product's data without an administrator role, or to make comments or product ratings without having accessed with a valid user.
    
    - Customizable Theme

        Users should be able to switch between light & dark mode to the one which best suites their preference with a simple theme button in the page header.

    - Profile customization

        Users must be able to create, view & update their profiles, including an image, name, password, email & country. This data will be used for identifying & contacting the user, as well as gathering sales related statistics.

     