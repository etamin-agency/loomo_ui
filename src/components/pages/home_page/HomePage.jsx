import SearchBar from "../../searchbar/SearchBar";
import Button from "react-bootstrap/Button";
import Loomo from "../../../assets/loomo.png"
import './HomePage.scss'
import {Link} from "react-router-dom";

const HomePage = () => {
    return (
        <div className="HomePage">
            <div className="header">
                <SearchBar className="header__search"/>
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
                </div>
            </div>
            <div className="home-intro">
                <img src={Loomo} alt="loomo-img"/>
            </div>
        </div>

    );
}
export default HomePage;