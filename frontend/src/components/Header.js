import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useLogout } from '../hooks/useLogout';

export const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { auth } = useAuth();
    const logout = useLogout();

    // Obtain the user's role
    const role = auth?.role || null;

    return (
        <>
            <header className="header">
                <div className="wrapper nav-wrapper">
                    <Link to="/" className="logo">JoestarComics</Link>
                    <nav className="nav-bar">
                        { !auth ?
                            <>
                                <NavLink 
                                to="signup" 
                                className={({ isActive }) => isActive ? "activeLink" : "link"}
                                >
                                    Sign Up
                                </NavLink>
                                <NavLink 
                                to="signin" 
                                className={({ isActive }) => isActive ? "activeLink" : "link"}
                                >
                                    Sign In
                                </NavLink>
                            </>
                        : role === "customer" ?
                            <>
                                <NavLink 
                                to="cart" 
                                className={({ isActive }) => isActive ? "activeLink" : "link"}
                                >
                                    Cart
                                </NavLink>
                                <span onClick={logout} className="link">Logout</span>
                            </>
                        : role === "admin" &&
                            <>
                                <span onClick={logout} className="link">Logout</span>
                            </>
                        }
                        <span 
                        onClick={() => setIsMenuOpen(!isMenuOpen)} 
                        className={ isMenuOpen ? "activeLink" : "link"}>
                            Menu
                        </span>
                    </nav>
                </div>
            </header>
            { isMenuOpen &&
            <div className="menu">
                <div className="wrapper">
                    <div className="menu-wrapper">
                        <nav className="nav-list">
                            <h3 className="title-3">Categories</h3>
                            <NavLink
                            to="/category/comics" 
                            className={({ isActive }) => isActive ? "activeLink" : "link"}>
                                Comics
                            </NavLink>
                            <NavLink
                            to="/category/collectibles" 
                            className={({ isActive }) => isActive ? "activeLink" : "link"}>
                                Collectibles
                            </NavLink>
                            <NavLink
                            to="/category/clothes" 
                            className={({ isActive }) => isActive ? "activeLink" : "link"}>
                                Clothes
                            </NavLink>
                        </nav>
                        { role === "admin" && 
                        <nav className="nav-list">
                            <h3 className="title-3">Admin</h3>
                            <NavLink
                            to="products/upload" 
                            className={({ isActive }) => isActive ? "activeLink" : "link"}>
                                Add products
                            </NavLink>
                        </nav>
                        }
                    </div>
                </div>
            </div> }
        </>
    );
}