import './View.scss'
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";
import {handleLogout} from "../../utils/auth/authUtils";

const SwitchToLoginView = ({close}) => {
    const navigate = useNavigate();
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        document.documentElement.style.overflow = 'hidden';
        }, []
    )
    const handleClose = () => {
        document.body.style.overflow = 'auto';
        document.documentElement.style.overflow = 'auto';
        close()
    }
    const  handleLogoutLogin=()=>{
        handleLogout();
        navigate("/login")
        window.location.reload()
    }
    return (
        <div className="some-name">
            <div className="SwitchToLoginView">
                Switch to Student Account Please <div className="logout-login" onClick={handleLogoutLogin}> Login</div>
                <div onClick={handleClose} className="btn-close switch-close-button"></div>
            </div>
        </div>
    )
}

export default SwitchToLoginView;