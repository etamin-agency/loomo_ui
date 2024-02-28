import './Post.scss';
import {useParams} from "react-router-dom";
import {useEffect} from "react";

const Post = () => {
    let {uuid} = useParams();
    useEffect(()=>{

    },[]);
return(
    <div className="Post">
        Post: {uuid}
    </div>
)
}
export default Post;