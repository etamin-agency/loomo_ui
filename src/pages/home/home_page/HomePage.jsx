import {Link, Outlet} from "react-router-dom";
import SearchBar from "../../../components/searchbar/SearchBar";
import Button from "react-bootstrap/Button";
import {useSelector} from "react-redux";
import profile_picture from "../../../assets/profile.png"
import logout_icon from "../../../assets/logout.png"

import './HomePage.scss'

const HomePage = () => {
    const {role} = useSelector(state => state.role);

    return (
        <div className="HomePage">
            <div className="header">
                <SearchBar />
                {role ==='' ?
                    <div className="header__btn">
                        <Link to="/login">
                            <Button id="login-button" variant="secondary" size="sm">
                                Log In
                            </Button>
                        </Link>
                        

                        <Link to="/signup">
                            <Button id="signup-button" variant="primary" size="sm">
                                Sign Up
                            </Button>
                        </Link>
                    </div>:
                        <div className="home__wrapper">
                            <Link to="/classes">
                                <img className="profile_picture" src={profile_picture} alt="profile-picture"/>
                            </Link>
                            <Link to="/logout">
                                <img className="logout_icon" src={logout_icon} alt="profile-picture"/>
                            </Link>
                        </div>
                }
            </div>
            <div className="home-intro">
                <Outlet/>
            </div>
        </div>

    );
}
export default HomePage;