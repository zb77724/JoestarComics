import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <header className="header window">
                <nav>
                    <div class="container rtc">
                        <div className="c-wrapper">
                            <Link 
                            className="h-1 hs"
                            to="/"
                            >
                                JoestarComics
                            </Link>
                        </div>
                        <div className="b-wrapper">
                            <div className="c-wrapper rtc-s">
                                <NavLink 
                                className={ ({isActive}) => isActive ? 
                                "cs active" : 
                                "cs" } 
                                to="history"
                                >
                                    History
                                </NavLink>
                                <NavLink 
                                className={ ({isActive}) => isActive ? 
                                "cs active" : 
                                "cs" } 
                                to="profile"
                                >
                                    Profile
                                </NavLink>
                                <span
                                className={ isMenuOpen ? 
                                "cs active" : 
                                "cs" }
                                onClick={ () => setIsMenuOpen(!isMenuOpen) }
                                >
                                    Menu
                                </span>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
            { isMenuOpen ? 
            <div className="menu window">
                <nav>
                    <div className="container rtc">
                        <div className="gtf">
                            <div className="column">
                                <h3 className="h-3">Categories</h3>
                                <NavLink 
                                className={ ({isActive}) => isActive ? 
                                "cs active" : 
                                "cs" } 
                                to="clothes"
                                >
                                    Clothes
                                </NavLink>
                                <NavLink 
                                className={ ({isActive}) => isActive ? 
                                "cs active" : 
                                "cs" } 
                                to="collectibles"
                                >
                                    Collectibles
                                </NavLink>
                                <NavLink 
                                className={ ({isActive}) => isActive ? 
                                "cs active" : 
                                "cs" } 
                                to="comics"
                                >
                                    Comics
                                </NavLink>
                            </div>
                            <div className="column">
                                <h3 className="h-3">Information</h3>
                                <NavLink 
                                className={ ({isActive}) => isActive ? 
                                "cs active" : 
                                "cs" } 
                                to="about"
                                >
                                    About Us
                                </NavLink>
                                <NavLink 
                                className={ ({isActive}) => isActive ? 
                                "cs active" : 
                                "cs" } 
                                to="guidelines"
                                >
                                    Guidelines
                                </NavLink>
                                <NavLink 
                                className={ ({isActive}) => isActive ? 
                                "cs active" : 
                                "cs" } 
                                to="contact"
                                >
                                    Contact Us
                                </NavLink>
                            </div>
                            <div className="column">
                                <h3 className="h-3">Anouncements</h3>
                                <NavLink 
                                className={ ({isActive}) => isActive ? 
                                "cs active" : 
                                "cs" } 
                                to="anouncements:releases"
                                >
                                    Releases
                                </NavLink>
                                <NavLink 
                                className={ ({isActive}) => isActive ? 
                                "cs active" : 
                                "cs" } 
                                to="anouncements:discounts"
                                >
                                    Discounts
                                </NavLink>
                                <NavLink 
                                className={ ({isActive}) => isActive ? 
                                "cs active" : 
                                "cs" } 
                                to="anouncements:news"
                                >
                                    News
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </nav>
            </div> : null }
        </>
    );
}

export default Header;