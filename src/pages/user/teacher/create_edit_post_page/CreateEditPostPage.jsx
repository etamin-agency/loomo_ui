import {Link, useNavigate, useParams} from "react-router-dom";
import {Box , Button}from '@mui/material';


import {useCallback, useEffect, useState} from "react";
import {isValidUUID} from "../../../../utils/helper/validation";

import video_icon from '../../../../assets/video-icon.png'
import image_icon from '../../../../assets/image-icon.png'
import trash_icon from '../../../../assets/trash.svg'
import publishService from "../../../../services/publishService";
import AddIcon from '@mui/icons-material/Delete';
import {useDropzone} from "react-dropzone";
import ReactPlayer from "react-player";


import PostLanguage from "../../../../components/edit_post_page_items/PostLanguage";
import CourseDuration from "../../../../components/edit_post_page_items/CourseDuration";
import Requirements from "../../../../components/edit_post_page_items/Requirements";
import CourseToWho from "../../../../components/edit_post_page_items/CourseToWho";
import TagsInput from "../../../../components/edit_post_page_items/Tags";
import RoadmapToggle from "../../../../components/edit_post_page_items/Roadmap";
import Duration from "../../../../components/edit_post_page_items/Duration";
import Students from "../../../../components/edit_post_page_items/Students";
import DemoDay from "../../../../components/edit_post_page_items/Demoday";
import './CreateEditPostPage.scss'
import CourseSchedule from "../../../../components/edit_post_page_items/CourseSchedule";
import ClassPrice from "../../../../components/edit_post_page_items/ClassPrice";




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
                const url = `https://d1kcxr0k66kiti.cloudfront.net/${data?.introVideoImgLink}`
                setImage(url)
                return data;
            }).then(data => {
                const url = `https://d1kcxr0k66kiti.cloudfront.net/${data?.introVideoLink}`;
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

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            const message = 'Are you sure you want to leave? The video upload process is not complete yet.';
            event.returnValue = message;
            return message;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        
        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
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
    });

    const handleDelete = (mediaSetter, fileSetter) => {
        mediaSetter('')
        fileSetter('')
    }

    const handleDataChange = (event,setter) => {
      setter(event.target.value)
    }
    const validateDescription = (value) => {
        if (value.trim() === '') {
          return 'Description is required';
        }
        if (value.length < 10) {
          return 'Description must be at least 10 characters long';
        }
        return '';
      };
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
                                    <div onClick={() => handleDelete(setVideo, setVideoFile)} className="trash-icon">
                                    {/* <img
                                        src={trash_icon} alt="trash-icon"/> */}
                                    <AddIcon /> 
                                    </div>
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
                                    <div onClick={() => handleDelete(setVideoFile, setImage)} className="trash-icon">
                                    {/* <img
                                        src={trash_icon} alt="trash-icon"/> */}
                                    <AddIcon />
                                    </div>
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
                                    placeholder="Leave your course description here..."
                                    onChange={(e)=>handleDataChange(e,setDesc)}
                                    value={desc}
                                />
                            </div>
                            <div className="language-wrapper">
                                <div className="edit-post-text">Language</div>
                                <PostLanguage langauge={language} setter={setLanguage}/>
                            </div>
                            <div className="course-duration-wrapper">
                                <div className="edit-post-text">Course Duration</div>
                                <CourseDuration duration={duration} setter={setDuration}/>
                            </div>
                            <div className="schedule-wrapper">
                                <div className="edit-post-text">
                                    Course Schedule
                                </div>
                                <CourseSchedule days={days} setDays={setDays} classTime={classTime} setClassTime={setClassTime} />
                            </div>
                            <div className="Price-wrapper">
                                <div className="edit-post-text">
                                    Price/month
                                </div>
                                <ClassPrice/>
                            </div>
                            <div className="Duration-wrapper">
                                <div className="edit-post-text">
                                    Price/month
                                </div>
                                <Duration/>
                            </div>
                            <div className="Students-wrapper">
                                <div className="edit-post-text">
                                    Students
                                </div>
                                <Students/>
                            </div>
                            <div className="Demo-wrapper">
                                <div className="edit-post-text">
                                    Demoday
                                </div>
                                <DemoDay/>
                            </div>
                            
                            

                        </div>
                        <div className="post-input-second-column">
                            <div className="post-list-inputs-wrapper">
                            </div>
                        </div>
                    </div>
                    <div className="post-form-Wrapper"> 
                        <div className="CourseToWho-wrapper">
                            <h5>Course to who:</h5>
                            <CourseToWho/>
                        </div>
                        <div className="Requirements-wrapper"> 
                            <h5>Requirements:</h5>
                            <Requirements/>
                        </div>
                        
                        <div className="Roadmap-wrapper">
                            
                            <RoadmapToggle/>
                        </div>
                        <div className="Tags-wrapper">
                            <h5>Tags</h5>
                            <TagsInput/>
                        </div>
                        <div className="save">
                            <Box display="flex" justifyContent="flex-end" gap={3} mt={2}>
                                <Button variant="outlined" color="secondary" >
                                Cancel
                                </Button>
                                <Button variant="contained"  color="primary"  >
                                Save
                                </Button>
                                
                            </Box>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateEditPostPage;