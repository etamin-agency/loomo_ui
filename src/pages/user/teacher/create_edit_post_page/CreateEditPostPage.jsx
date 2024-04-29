import {Link, useNavigate, useParams} from "react-router-dom";


import {useCallback, useEffect, useState} from "react";
import {isValidUUID} from "../../../../utils/helper/validation";

import video_icon from '../../../../assets/video-icon.png'
import image_icon from '../../../../assets/image-icon.png'
import trash_icon from '../../../../assets/trash.svg'
import publishService from "../../../../services/publishService";

import {useDropzone} from "react-dropzone";
import ReactPlayer from "react-player";


import PostLanguage from "../../../../components/edit_post_page_items/PostLanguage";
import CourseDuration from "../../../../components/edit_post_page_items/CourseDuration";

import './CreateEditPostPage.scss'

const CreateEditPostPage = () => {
    let {postId} = useParams();
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState('');
    const [imageFile, setImageFile] = useState('');
    const [video, setVideo] = useState('');
    const [videoFile, setVideoFile] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [language, setLanguage] = useState('');
    const [req, setReq] = useState('');
    const [numberOfStudents, setNumberOfStudents] = useState('');
    const [duration, setDuration] = useState({startDate:'',endDate:''});
    const [days, setDays] = useState('');
    const [courseToWho, setCourseToWho] = useState('');
    const [demoDate, setDemoDate] = useState('');
    const [classTime, setClassTime] = useState('');
    const [classStartEndDate] = useState('');
    const [isClassPrivate] = useState(false);
    const [courseRoadMap, setCourseRoadMap] = useState('');
    const [isCourseRoadMapExists, setCourseRoadMapExists] = useState(false);
    const [tags, setTags] = useState('');

    const [videoLoading, setVideoLoading] = useState(false);


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

    const onDropVideo = useCallback(acceptedFiles => {
        setVideoLoading(true);
        try {
            const file = acceptedFiles[0];
            setVideoFile(file);
            if (file.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.preload = 'metadata';
                video.onloadedmetadata = () => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        setVideoLoading(false);
                        setVideo(reader.result);
                    };
                };
                video.src = URL.createObjectURL(file);
            } else {
                console.log('File is not a video.');
            }
        } catch (error) {
            console.error("Error reading file:", error);
        }
    }, []);
    const onDropImage = useCallback(acceptedFiles => {
        try {
            const imageFile = acceptedFiles[0];

            if (!imageFile || !imageFile.type.startsWith('image/')) {
                console.error("File is not an image.");
                return false;
            }
            setImageFile(imageFile)
            const reader = new FileReader();
            reader.readAsDataURL(acceptedFiles[0]);
            reader.onload = () => {
                setImage(reader.result);
            };
        } catch (error) {
            console.error("Error reading file:", error);
        }
    }, []);
    const {
        getRootProps: getRootPropsForVideo,
        getInputProps: getInputPropsForVideo,
        isDragActive: isDragActiveForVideo
    } = useDropzone({
        onDrop: onDropVideo,
        accept: 'video/*'
    });
    const {
        getRootProps: getRootPropsForImage,
        getInputProps: getInputPropsForImage,
        isDragActive: isDragActiveForImage
    } = useDropzone({
        onDrop: onDropImage,
        accept: 'image/*'
    })

    const handleDelete = (mediaSetter, fileSetter) => {
        mediaSetter('')
        fileSetter('')
    }

    const handleDataChange = (event,setter) => {
      setter(event.target.value)
    }
    return (
        <div className="CreateEditPostPage">
            <Link to="/publish-post">
                <div className="publish-post-link">Loomo</div>
            </Link>
            <div>
                <div className="edit-post-container">
                    <div className="post-media-wrapper">
                        {video ? (
                                <div className="player-wrapper">
                                    <ReactPlayer
                                        width="100%"
                                        height="100%"
                                        url={video}
                                        controls
                                        className={"react-player"}
                                        config={{file: {attributes: {controlsList: 'nodownload'}}}}
                                    />
                                    <div onClick={() => handleDelete(setVideo, setVideoFile)} className="trash-icon"><img
                                        src={trash_icon} alt="trash-icon"/></div>
                                </div>
                            ) :
                            (
                                <div className="media-block">
                                    <div className="dropzone-video" {...getRootPropsForVideo()} >
                                        <input type="file"   {...getInputPropsForVideo()} accept="video/*"/>
                                        {
                                            isDragActiveForVideo ?
                                                <p className="drag-active-center-text">Drop the files here ...</p> :
                                                <>
                                                    <div className="media-icons-wrapper">
                                                        <img className="left-icon" src={video_icon} alt="video-icon"/>
                                                        <img className="center-icon" src={video_icon} alt="video-icon"/>
                                                        <img className="right-icon" src={video_icon} alt="video-icon"/>
                                                    </div>
                                                    <div className="shadow-block"></div>
                                                    <div className="upload-media-text">Drag and drop your Introduction
                                                        Video
                                                    </div>
                                                    <div className="upload-media-subtext"> or press Button</div>
                                                    <div className="upload-btn-wrapper">
                                                        <div className="tmp-memory-btn">Access from temporary memory
                                                        </div>
                                                        <div className="local-memory-btn">Select from File</div>
                                                    </div>
                                                </>
                                        }
                                    </div>
                                </div>
                            )}
                        {image ? (
                                <div className="image-wrapper">
                                    <img className={'post-image'} src={image} alt="course-image"/>
                                    <div onClick={() => handleDelete(setVideoFile, setImage)} className="trash-icon"><img
                                        src={trash_icon} alt="trash-icon"/></div>
                                </div>
                            ) :
                            (
                                <div className="media-block">
                                    <div className="dropzone-video" {...getRootPropsForImage()} >
                                        <input   {...getInputPropsForImage()} accept="image/*"/>
                                        {
                                            isDragActiveForImage ?
                                                <p className="drag-active-center-text">Drop the files here ...</p> :
                                                <>
                                                    <div className="media-icons-wrapper">
                                                        <img className="left-icon" src={image_icon} alt="video-icon"/>
                                                        <img className="center-icon" src={image_icon} alt="video-icon"/>
                                                        <img className="right-icon" src={image_icon} alt="video-icon"/>
                                                    </div>
                                                    <div className="shadow-block"></div>
                                                    <div className="upload-media-text">Drug and drop your Introduction
                                                        Photo
                                                    </div>
                                                    <div className="upload-media-subtext"> or press Button</div>
                                                    <div className="upload-btn-wrapper">
                                                        <div className="tmp-memory-btn">Access from temporary memory
                                                        </div>
                                                        <div className="local-memory-btn">Select from File</div>
                                                    </div>
                                                </>
                                        }
                                    </div>
                                </div>
                            )}
                    </div>
                    <div className="post-input-wrapper">
                        <div className="post-input-first-column">
                          <div className="title-wrapper">
                              <div className="edit-post-text">Title</div>
                              <input type="text" className='post-title-input text-input-focus-blue' placeholder="Course Name" name="title" value={title} onChange={(e)=>handleDataChange(e,setTitle)}/>
                          </div>
                            <div className="description-wrapper">
                                <div className="edit-post-text edit-post-desc-text">Description</div>
                                <textarea
                                    className="post-desc-textarea text-input-focus-blue"
                                    id="desc"
                                    name="bio"
                                    placeholder="Write your course description to here..."
                                    onChange={(e)=>handleDataChange(e,setDesc)}
                                    value={desc}
                                />
                            </div>
                            <div className="language-wrapper">
                                <div className="edit-post-text">Language</div>
                                <PostLanguage langauge={language} setter={setLanguage}/>
                            </div>
                            <div className="duration-wrapper">
                                <div className="edit-post-text">Course Duration</div>
                                <CourseDuration/>
                            </div>

                        </div>
                        <div className="post-input-second-column">
                            <div className="post-list-inputs-wrapper">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateEditPostPage;