// Middleware function which verifies the given user's role privileges
const isAdmin = (req, res, next) => {

    // Check if required data was provided
    if (!req?.role) {
        return res.status(401).json({ "message": "Access denied" });
    }

    // Check if the user has administrator privileges
    const permission = req.role === "admin";

    // If the user doesn't have the admin role, prevent further execution
    if (!permission) {
        return res.status(401).json({ "message": "Access denied" });
    }

    next();

}

// Export the middleware function
module.exports = isAdmin;