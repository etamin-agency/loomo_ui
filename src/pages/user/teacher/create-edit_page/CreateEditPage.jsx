import {useCallback, useState} from "react";
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
    setPostVideImg, setPostVideo
} from "../../../../actions"

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
    const [showVideo, setShowVideo] = useState(false);
    const isButtonDisabled = post.postVideo === '' || post.postVideo == null || post.price == '' || post.price < 15 || post.title === '' || post.title == null

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
    const onDrop = useCallback(acceptedFiles => {
        try {
            const file = acceptedFiles[0];

            if (file.type.startsWith('video/')) {
                const video = document.createElement('video');
                video.preload = 'metadata';
                video.onloadedmetadata = () => {
                    const duration = Math.round(video.duration);
                    console.log('Video duration:', duration, 'seconds');
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => {
                        setFile(reader.result);
                        setShowVideo(true);
                        dispatch(setPostVideo(file))
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

    const handleEditCreateClass = () => {
        const formData = new FormData();
        formData.append("photoFile", post.videoImg);
        formData.append("videoFile", post.postVideo);

        const obj = {
            title: post.title,
            description: post.desc,
            courseTarget: post.courseToWho,
            requirements: post.req,
            language: post.language,
            price: post.price,
            maxStudents: post.studentNum,
            demoTime: new Date(),
            classDays: post.classTime.days,
            classTime: new Date(),
            category: "some category",
            tags: ["some", 'tags']
        };

        formData.append("classDto", JSON.stringify(obj));

        publishService.createUpdatePost('',formData).then(data => console.log("hellooo"))
    };

    return (
        <div className={'CreateEditPage'}>
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
                            <ReactPlayer
                                url={file}
                                controls
                                className="react-player"
                                config={{file: {attributes: {controlsList: 'nodownload'}}}}
                            />
                        }

                    </div>
                    <div className="class-lang-wrapper">
                        <div className="class-time text_32">
                            <img className="edit-text" src={edit_text_icon} alt="edit-text"
                                 onClick={() => handleCourseDayChange()}/>
                            Class
                            time:{post.classTime.year}/{post.classTime.month}/{post.classTime.day} {post.classTime.hour}:{post.classTime.minute} GMT({post.classTime.gmt})
                            <br/> Days: {post.classTime.days.map(item => (item + "   "))}
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
                        {post.courseToWho.map((text, i) => (<li key={i}>{text}</li>))}
                    </div>
                    <div className="requirements">
                        <div>
                            <img className="edit-text" src={edit_text_icon} alt="edit-text"
                                 onClick={() => handleArrChange('req')}/>
                            Requirements:
                        </div>
                        {post.req.map((text, i) => (<li key={i}>{text}</li>))}
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
