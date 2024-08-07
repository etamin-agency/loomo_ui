import {Link} from "react-router-dom";
import Loading from "../../../../components/loading/Loading";
import create_icon from "../../../../assets/create-icon.png";
import {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";
import Cookie from "js-cookie";
import publishService from "../../../../services/publishService";
import {IconButton} from "@mui/material";
import MoreVertIcon from '@mui/icons-material/MoreVert';

import './PostListPage.scss'
import IconMenu from "../../../../components/icon_menu/IconMenu";
import MenuItems from "../../../../components/icon_menu/MenuItems";

const PostListPage = () => {
    const [data, setData] = useState({});
    const [totalElements, setTotalElements] = useState(0);
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const userName = jwtDecode(Cookie.get('access_token')).sub;
        publishService.getPosts(0, 14, userName).then(obj => {
            setData(obj?.data)
            setTotalElements(obj?.totalElements)
            setLoading(false)
        })
    }, []);


    const handlePostDelete = (postId) => {
        setData(data.filter((post) => post.postId !== postId));
        setTotalElements(totalElements - 1);
    };


    return (
        <div className='PostListPage'>

            {loading ? <Loading/> :
                totalElements > 0 ?
                    <div className="classes-wrapper">
                        <div className="published-post-create ">
                            <Link to={`/edit/`}>
                                <img src={create_icon} alt="create-class-icon" className="create-icon"/>
                            </Link>
                        </div>
                        {data?.map((item) => (
                            <div className="published-post" key={item?.postId}>
                                <MenuItems postId={item?.postId} onDelete={handlePostDelete}/>
                                <Link to={`/edit/${item?.postId}`}>
                                    <img className="post-image"
                                        src={`https://d37zebxsdrcn1w.cloudfront.net/${item?.imageId}`}
                                        alt="post-photo"/>
                                </Link>
                                <div className="post-title">
                                    {item?.title}
                                </div>
                            </div>
                        ))}

                    </div> :
                    <div className="classes-wrapper">

                        <div className="published-post-create ">
                            <Link to={`/edit/`}>
                                <img src={create_icon} alt="create-class-icon" className="create-icon"/>
                            </Link>
                        </div>

                    </div>
            }

        </div>

    )
}

export default PostListPage;