import {Link, useNavigate, useParams} from "react-router-dom";


import {useEffect, useState} from "react";
import {isValidUUID} from "../../../../utils/helper/validation";

import video_icon from '../../../../assets/video-icon.png'
import image_icon from '../../../../assets/image-icon.png'
import publishService from "../../../../services/publishService";

import './CreateEditPostPage.scss'

const CreateEditPostPage = () => {
    let {postId} = useParams();
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState('');
    const [video, setVideo] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [language, setLanguage] = useState('');
    const [req, setReq] = useState('');
    const [numberOfStudents, setNumberOfStudents] = useState('');
    const [duration, setDuration] = useState('');
    const [days, setDays] = useState('');
    const [courseToWho, setCourseToWho] = useState('');
    const [demoDate, setDemoDate] = useState('');
    const [classTime, setClassTime] = useState('');
    const [classStartEndDate] = useState('');
    const [isClassPrivate] = useState(false);
    const [courseRoadMap, setCourseRoadMap] = useState('');
    const [isCourseRoadMapExists, setCourseRoadMapExists] = useState(false);
    const [tags, setTags] = useState('');


    const [isChanged, setChanged] = useState(false)
    const navigate = useNavigate();
    useEffect(() => {
        if (postId && isValidUUID(postId)) {
            publishService.getPostData(postId).then(data => {
                return data;
            }).then(data => {
                const url = `https://d3d9es05pgt6o5.cloudfront.net/${data?.introVideoImgLink}`
                setImage(url)
                return data;
            }).then(data => {
                const url = `https://d3pvu5wfhx0uzg.cloudfront.net/${data?.introVideoLink}`;
                setVideo(url)
                return data;
            }).catch(() => {
                // navigate to some error page
                navigate("/")
            }).finally(() => {
                setLoading(false)
            })
        } else {
            setChanged(true)
            setLoading(false)
        }

    }, []);

    return (
        <div className="CreateEditPostPage">
            <Link to="/publish-post">
                <div className="publish-post-link">Loomo</div>
            </Link>
            <div>
                <div className="edit-post-container">
                    <div className="post-media-wrapper">
                        <div className="media-block">
                            <div className="media-icons-wrapper">
                                <img className="left-icon" src={video_icon} alt="video-icon"/>
                                <img className="center-icon" src={video_icon} alt="video-icon"/>
                                <img className="right-icon" src={video_icon} alt="video-icon"/>
                            </div>
                            <div className="shadow-block"></div>
                            <div className="upload-media-text">Drug and drop your Introduction Video</div>
                            <div className="upload-media-subtext"> or press Button </div>
                            <div className="upload-btn-wrapper">
                                <div className="tmp-memory-btn">Access from temporary memory</div>
                                <div className="local-memory-btn">Select from File</div>
                            </div>
                        </div>
                        <div className="media-block">
                            <div className="media-icons-wrapper">
                                <img className="left-icon" src={image_icon} alt="video-icon"/>
                                <img className="center-icon" src={image_icon} alt="video-icon"/>
                                <img className="right-icon" src={image_icon} alt="video-icon"/>
                            </div>
                            <div className="shadow-block"></div>
                            <div className="upload-media-text">Drug and drop your Introduction Photo</div>
                            <div className="upload-media-subtext"> or press Button </div>
                            <div className="upload-btn-wrapper">
                                <div className="tmp-memory-btn">Access from temporary memory</div>
                                <div className="local-memory-btn">Select from File</div>
                            </div>

                        </div>
                    </div>
                    <div className="post-input-wrapper">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateEditPostPage;