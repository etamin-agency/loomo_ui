import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import EditText from "../../../../components/edit_post_page_items/EditText";
import edit_text_icon from "../../../../assets/edit-text.png";
import {
    setPostTitle,
    setPostDesc,
    setPostStudentNum,
    setPostPrice,
    setPostCourseToWho,
    setPostReq,
    setPostDemoDay,
    setPostClassTime,
    setPostVideImg, setPostVideo, setPost
} from "../../../../actions"

import any_image from "../../../../assets/loomo.png"

import EditLanguage from "../../../../components/edit_post_page_items/EditLanguage";
import EditNumber from "../../../../components/edit_post_page_items/EditNumber";

import EditPrice from "../../../../components/edit_post_page_items/EditPrice";
import EditList from "../../../../components/edit_post_page_items/EditList";
import EditDemoDate from "../../../../components/edit_post_page_items/EditDemoDate";


import './CreateEditPage.scss';
import EditCourseDays from "../../../../components/edit_post_page_items/EditCourseDays";
import {useDropzone} from "react-dropzone";
import ReactPlayer from "react-player";
import EditPostImg from "../../../../components/edit_post_page_items/EditPostImg";
import Button from "react-bootstrap/Button";
import publishService from "../../../../services/publishService";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../../../../components/loading/Loading";
import adjustDateByHour from "../../../../utils/helper/math";
import {isValidUUID} from "../../../../utils/helper/validation";

const CreateEditPage = () => {
    const {post} = useSelector(state => state.classPost);
    const dispatch = useDispatch();
    const [showEditItem, setShowEditItem] = useState(false);
    const [maxChars, setMaxChars] = useState(30);
    const [showLanguageBar, setShowLanguageBar] = useState(false);
    const [showNumberEdit, setShowNumberEdit] = useState(false);
    const [showPriceEdit, setShowPriceEdit] = useState(false);
    const [showListEdit, setShowListEdit] = useState(false);
    const [showDemoDateEdit, setShowDemoDateEdit] = useState(false);
    const [showCourseDateEdit, setShowCourseDateEdit] = useState(false);
    const [showPhotoEdit, setShowPhotoEdit] = useState(false);
    const [setter, setSetter] = useState("");
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(true);
    const [showVideo, setShowVideo] = useState(false);
    const navigate = useNavigate();
    const isButtonDisabled =  post?.postVideo?.data === '' || post?.price ==='' || post?.price < 15 || post?.title === '' || (!post?.changed && !post?.postVideo?.changed &&  !post?.videoImg?.changed)
    let {id} = useParams();
    const handleSetterChange = (text, num) => {
        setSetter(text)
        setMaxChars(num)
        setShowEditItem(true);
    };
    const handleArrChange = (text) => {
        setSetter(text)
        setShowListEdit(true);
    };
    const handleNumberChange = () => {
        setShowNumberEdit(true);
    };
    const handleCourseDayChange = () => {
        setShowCourseDateEdit(true);
    };
    const handlePriceChange = () => {
        setShowPriceEdit(true);
    };

    const handleLanguageChange = () => {
        setShowLanguageBar(true);
    };

    const handlePhotoChange = () => {
        setShowPhotoEdit(true);
    };

    const handleDemoDayChange = () => {
        setShowDemoDateEdit(true);
    };
    const handleVideoChange = () => {
        setShowVideo(false);
        dispatch(setPostVideo({changed: true, data: ''}))
    };
    useEffect(() => {
        setLoading(true)
        if (id && isValidUUID(id)) {
            publishService.getPostData(id).then(data => {
                const demoDay = new Date(data?.demoTime)
                const classTime = new Date(data?.classTime)
                const demoDayObj = {
                    year: demoDay.getFullYear(),
                    month: demoDay.getMonth() + 1,
                    day: demoDay.getDate(),
                    hour: demoDay.getHours() + demoDay.getTimezoneOffset() / 60 * -1,
                    minute: demoDay.getMinutes(),
                    gmt: demoDay.getTimezoneOffset() / 60 * -1
                };
                const classTimeObj = {
                    year: classTime.getFullYear(),
                    month: classTime.getMonth() + 1,
                    day: classTime.getDate(),
                    hour: classTime.getHours() + demoDay.getTimezoneOffset() / 60 * -1,
                    minute: classTime.getMinutes(),
                    gmt: classTime.getTimezoneOffset() / 60 * -1
                };
                const obj = {
                    postVideo: '',
                    videoImg: '',
                    title: data?.title,
                    desc: data?.description,
                    courseToWho: data?.courseTarget,
                    req: data?.requirements,
                    price: data?.price,
                    classTime: {
                        ...classTimeObj,
                        days: data?.classDays
                    },
                    studentNum: data?.maxStudents,
                    demoDay: demoDayObj,
                    language: data?.language,
                    changed: false,
                }
                dispatch(setPost(obj))
                return data;
            }).then(data => {
                const url=`https://d1oxvzb6zdyzdk.cloudfront.net/${data?.introVideoLink}`;
                setFile(url)
                dispatch(setPostVideo({changed: false, data: url}));
                return data;
            }).then(data => {
                publishService.getFile(data?.introVideoImgLink).then(img => {
                    dispatch(setPostVideImg(
                        {
                            changed: false,
                            data: img
                        }
                    ))
                })
            }).finally(() => {
                setShowVideo(true);
                setLoading(false)
            });
        } else {
            const obj = {
                postVideo: {
                    changed: false,
                    data: ''
                },
                videoImg: {
                    changed: false,
                    data: ''
                },
                title: "Write title of Your Course",
                desc: "Write your course Description here",
                courseToWho: ["write here about course to who"],
                req: ["write requirements here"],
                price: 180,
                classTime: {
                    year: 0,
                    month: 0,
                    day: 0,
                    hour: 0,
                    minute: 0,
                    gmt: 0,
                    days: []
                },
                studentNum: 12,
                demoDay: {
                    year: 0,
                    month: 0,
                    day: 0,
                    hour: 0,
                    minute: 0,
                    gmt: 0,
                },
                language: "English",
                changed: false,
            }
            dispatch(setPost(obj))
            setImageHandle()
            setLoading(false)
        }
    }, [])

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
    const setImageHandle = async () => {
        await fetch(any_image)
            .then(response => response.blob())
            .then(blob => {
                const file = new File([blob], "loomo.png", {type: "image/png"});
                dispatch(setPostVideImg({data: file, changed: true}))
            });
    };




    const onDrop = useCallback(acceptedFiles => {
        try {
            const file = acceptedFiles[0];

            if (file.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.preload = 'metadata';
                video.onloadedmetadata = () => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        setFile(reader.result);
                        setShowVideo(true);
                        dispatch(setPostVideo({changed: true, data: file}))
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
    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: 'video/*'
    });

    const handleEditCreateClass = async () => {
        setLoading(true)
        if (id && isValidUUID(id)) {
            const formData = new FormData();
            if (post.videoImg?.changed) {
                formData.append("photoFile", post.videoImg?.data);
            }
            if (post.postVideo?.changed) {
                formData.append("videoFile", post.postVideo?.data);
            }
            const {year, month, day, hour, minute, gmt} = post.classTime;
            const demoDay = post.demoDay;
            const obj = {
                title: post.title,
                description: post.desc,
                courseTarget: post.courseToWho,
                requirements: post.req,
                language: post.language,
                price: post.price,
                maxStudents: post.studentNum,
                classTime: adjustDateByHour(year, month, day, hour, minute, -gmt),
                classDays: post.classTime.days,
                demoTime: adjustDateByHour(demoDay.year, demoDay.month, demoDay.day, demoDay.hour, demoDay.minute, -gmt),
                category: "some category",
                tags: ["some", 'tags']
            };
            formData.append("classDto", JSON.stringify(obj));
            publishService.editPost(id, formData).then(data => {
                if (data) {
                    setLoading(false)
                    navigate("/publish-class");
                }
            })
        } else {
            const formData = new FormData();
            formData.append("photoFile", post.videoImg?.data);
            formData.append("videoFile", post.postVideo?.data);
            const {year, month, day, hour, minute, gmt} = post.classTime;
            const demoDay = post.demoDay;
            const obj = {
                title: post.title,
                description: post.desc,
                courseTarget: post.courseToWho,
                requirements: post.req,
                language: post.language,
                price: post.price,
                maxStudents: post.studentNum,
                classTime: adjustDateByHour(year, month, day, hour, minute, -gmt),
                classDays: post.classTime.days,
                demoTime: adjustDateByHour(demoDay.year, demoDay.month, demoDay.day, demoDay.hour, demoDay.minute, -gmt),
                category: "some category",
                tags: ["some", 'tags']
            };
            formData.append("classDto", JSON.stringify(obj));
            publishService.createPost(formData).then(data => {
                if (data) {
                    setLoading(false)
                    navigate("/publish-class");
                }
            })
        }
    };
    return (
        <div className={'CreateEditPage'}>
            {loading ? <Loading/> : ''}
            {showEditItem &&
                <EditText setter={setter === 'title' ? setPostTitle : setPostDesc}
                          num={maxChars}
                          close={() => setShowEditItem(false)}/>}
            {showLanguageBar && <EditLanguage close={() => setShowLanguageBar(false)} langauge={post.language}/>}
            {showNumberEdit && <EditNumber setter={setPostStudentNum} close={() => setShowNumberEdit(false)}/>}
            {showPriceEdit && <EditPrice setter={setPostPrice} close={() => setShowPriceEdit(false)}/>}
            {showListEdit && <EditList setter={setter === 'req' ? setPostReq : setPostCourseToWho}
                                       items={setter === 'req' ? post.req : post.courseToWho}
                                       close={() => setShowListEdit(false)}/>}
            {showDemoDateEdit && <EditDemoDate setter={setPostDemoDay} close={() => setShowDemoDateEdit(false)}/>}
            {showCourseDateEdit &&
                <EditCourseDays setter={setPostClassTime} close={() => setShowCourseDateEdit(false)}/>}
            {showPhotoEdit &&
                <EditPostImg setter={setPostVideImg} close={() => setShowPhotoEdit(false)}/>}
            <div className="wrapper">
                <div className="left">
                    <img className="edit-text" src={edit_text_icon} alt="edit-text"
                         onClick={() => handlePhotoChange()}/>
                    <div className="video-player-block">
                        {
                            !showVideo
                            &&
                            <div className="dropzone-video" {...getRootProps()} >
                                <input type="file"   {...getInputProps()} />
                                {
                                    isDragActive ?
                                        <p>Drop the files here ...</p> :
                                        <p> Introduction video</p>
                                }
                            </div>
                        }
                        {
                            showVideo &&
                            <div className="player-wrapper">
                                <ReactPlayer
                                    url={file}
                                    controls
                                    className="react-player"
                                    config={{file: {attributes: {controlsList: 'nodownload'}}}}

                                />
                                <div className="btn-close close-react-player" onClick={handleVideoChange}></div>
                            </div>
                        }

                    </div>
                    <div className="class-lang-wrapper">
                        <div className="class-time text_32">
                            <img className="edit-text" src={edit_text_icon} alt="edit-text"
                                 onClick={() => handleCourseDayChange()}/>
                            Class
                            time:{post.classTime.year}/{post.classTime.month}/{post.classTime.day} {post.classTime.hour}:{post.classTime.minute} GMT({post.classTime.gmt})
                            <br/> Days: {post?.classTime?.days?.map(item => (item + "   "))}
                        </div>
                        <div className="class-language text_32">
                            <img className="edit-text" src={edit_text_icon} alt="edit-text"
                                 onClick={() => handleLanguageChange()}/>
                            {post.language}
                        </div>
                    </div>
                    <div className="price text_32">
                        <img className="edit-text" src={edit_text_icon} alt="edit-text"
                             onClick={() => handlePriceChange()}/>
                        Price: {post.price}$/month
                    </div>
                    <div className="student-amount text_32">
                        <img className="edit-text" src={edit_text_icon} alt="edit-text"
                             onClick={() => handleNumberChange()}/>
                        Students: {post.studentNum}
                    </div>
                    <div className="demo-day text_32">
                        <img className="edit-text" src={edit_text_icon} alt="edit-text"
                             onClick={() => handleDemoDayChange()}/>
                        Demo
                        day: {post.demoDay.year}/{post.demoDay.month}/{post.demoDay.day} {post.demoDay.hour}:{post.demoDay.minute} GMT({post.demoDay.gmt})
                    </div>
                </div>


                <div className="right">
                    <div className="class-title ">
                        <img className="edit-text" src={edit_text_icon} alt="edit-text"
                             onClick={() => handleSetterChange('title', 30)}/>

                        Title: <div>{post.title} </div>
                    </div>
                    <div className="class-dec">
                        <div>
                            <img className="edit-text" src={edit_text_icon} alt="edit-text"
                                 onClick={() => handleSetterChange('desc', 100)}/>
                            Description:
                        </div>
                        <p>{post.desc}</p>
                    </div>

                    <div className="class-to-who ">
                        <div>
                            <img className="edit-text" src={edit_text_icon} alt="edit-text"
                                 onClick={() => handleArrChange('course_to_who')}/>
                            Course to who:
                        </div>
                        {post?.courseToWho?.map((text, i) => (<li key={i}>{text}</li>))}
                    </div>
                    <div className="requirements">
                        <div>
                            <img className="edit-text" src={edit_text_icon} alt="edit-text"
                                 onClick={() => handleArrChange('req')}/>
                            Requirements:
                        </div>
                        {post?.req?.map((text, i) => (<li key={i}>{text}</li>))}
                    </div>
                    <Button className="save-button" type="submit" size="sm" disabled={isButtonDisabled}
                            onClick={handleEditCreateClass}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default CreateEditPage;
