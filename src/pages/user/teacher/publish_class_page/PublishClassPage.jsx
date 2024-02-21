import {useEffect, useState} from "react";

import {jwtDecode} from "jwt-decode";
import Cookie from "js-cookie";
import {Link} from "react-router-dom";

import create_icon from "../../../../assets/create-icon.png"
import publishService from "../../../../services/publishService";

import './PublishClassPage.scss'
const PublishClassPage = () => {
    const [data, setData] = useState({});
    const [totalElements, setTotalElements] = useState(0);
    useEffect(() => {
        const userName = jwtDecode(Cookie.get('access_token')).sub;
        publishService.getPublishedClasses(1, 3, userName).then(data => {

        })
    }, []);
    return (
        <div className="PublishClassPage">
            {totalElements == 0 ?
                <div className="first-class">
                    <div className="wrapper-new-class">
                        <div className="first-class-text">
                            Create new class
                        </div>
                        <Link to={`/edit`} className="user-link">
                            <img src={create_icon} alt="create-class-icon"/>
                        </Link>
                    </div>

                </div> :
                <div>

                </div>
            }

        </div>
    )
}
export default PublishClassPage;