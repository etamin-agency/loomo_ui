import {useEffect, useState} from "react";

import {jwtDecode} from "jwt-decode";
import Cookie from "js-cookie";
import {Link} from "react-router-dom";

import create_icon from "../../../../assets/create-icon.png"
import publishService from "../../../../services/publishService";

import './PublishClassPage.scss'
import Loading from "../../../../components/loading/Loading";

const PublishClassPage = () => {
    const [data, setData] = useState({});
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const userName = jwtDecode(Cookie.get('access_token')).sub;
        publishService.getPublishedClasses(0, 10, userName).then(obj => {
            setData(obj.data)
            setTotalElements(obj.totalElements)
            setLoading(false)
        })
    }, []);
    return (
        <div className="PublishClassPage">
            {loading ? <Loading/> :
                totalElements === 0 ?
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
                    <div className="classes-wrapper">
                        {data.map((item) => (
                            <div className="published-post" key={item?.postId}>
                                <Link to={`/edit/${item.postId}`}>
                                    <img className="post-image" src={`data:image/jpeg;base64,${item?.photoFile}`}
                                         alt="post-photo"/>
                                </Link>
                                <div className="post-title">
                                    {item?.title}
                                </div>
                            </div>
                        ))}
                        <div className="published-post">
                            <Link to={`/edit/`}>
                                    <img src={create_icon} alt="create-class-icon" className="create-icon"/>
                            </Link>
                        </div>

                    </div>
            }

        </div>
    )
}
export default PublishClassPage;