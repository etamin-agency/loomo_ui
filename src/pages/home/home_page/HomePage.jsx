import {Link, Outlet} from "react-router-dom";
import SearchBar from "../../../components/searchbar/SearchBar";
import Button from "react-bootstrap/Button";
import {useSelector} from "react-redux";
import profile_picture from "../../../assets/profile.png"
import logout_icon from "../../../assets/logout.png"
import LanguageIcon from '@mui/icons-material/Language';

import './HomePage.scss'
import { Helmet } from "react-helmet-async";

const HomePage = () => {
    const {role} = useSelector(state => state.role);

    return (
        <div className="HomePage">
            <Helmet>
                <title>Home Page</title>
                <meta
                    name="description"
                    content="This is the home page of our application"
                />
                <link rel="canonical" href={`${window.location.origin}/home`} />
            </Helmet>
            <div className="header">
                <h1>Loomo</h1>
                <SearchBar />
                <LanguageIcon fontSize="medium" />
                {role === "" ? (
                    <div className="header__btn">
                        <Link to="/login">
                            <button id="login-button">Login</button>
                        </Link>
                        {/* <Link to="/post-page">
                            <Button id="login-button" variant="secondary" size="sm">
                                post
                            </Button>
                        </Link> */}

                        <Link to="/signup">
                            <button id="sign-up-button">Sign Up</button>
                        </Link>
                    </div>
                ) : (
                    <div className="home__wrapper">
                        <Link to="/classes">
                            <img
                                className="profile_picture"
                                src={profile_picture}
                                alt="profile-picture"
                            />
                        </Link>
                        <Link to="/logout">
                            <img
                                className="logout_icon"
                                src={logout_icon}
                                alt="profile-picture"
                            />
                        </Link>
                    </div>
                )}
            </div>
            <div className="home-intro">
                <Outlet />
            </div>
        </div>
    );
}
export default HomePage;