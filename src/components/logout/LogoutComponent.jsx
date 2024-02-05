import React, {useEffect} from "react";
import {handleLogout} from '../../utils/auth/authUtils'
import {useNavigate} from 'react-router-dom';

const LogoutComponent = () => {
    const navigate = useNavigate();

    useEffect(() => {
        handleLogout();
        navigate("/login");
        window.location.reload()

    }, []);
    return (
        <div>Logging out...</div>
    );
};

export default LogoutComponent;
