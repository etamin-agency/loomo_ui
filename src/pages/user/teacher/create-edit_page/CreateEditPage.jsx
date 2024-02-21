import {useState} from "react";
import {useSelector} from "react-redux";
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
    setPostClassTime
} from "../../../../actions"

import EditLanguage from "../../../../components/edit_post_page_items/EditLanguage";
import EditNumber from "../../../../components/edit_post_page_items/EditNumber";

import EditPrice from "../../../../components/edit_post_page_items/EditPrice";
import EditList from "../../../../components/edit_post_page_items/EditList";
import EditDemoDate from "../../../../components/edit_post_page_items/EditDemoDate";


import './CreateEditPage.scss';
import EditCourseDays from "../../../../components/edit_post_page_items/EditCourseDays";
const CreateEditPage = () => {
    const {post} = useSelector(state => state.classPost);

    const [showEditItem, setShowEditItem] = useState(false);
    const [maxChars, setMaxChars] = useState(30);
    const [showLanguageBar, setShowLanguageBar] = useState(false);
    const [showNumberEdit, setShowNumberEdit] = useState(false);
    const [showPriceEdit, setShowPriceEdit] = useState(false);
    const [showListEdit, setShowListEdit] = useState(false);
    const [showDemoDateEdit, setShowDemoDateEdit] = useState(false);
    const [showCourseDateEdit, setShowCourseDateEdit] = useState(false);
    const [setter, setSetter] = useState("");

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

    const handleDemoDayChange = () => {
        setShowDemoDateEdit(true);
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
            {showDemoDateEdit && <EditDemoDate setter={setPostDemoDay}  close={() => setShowDemoDateEdit(false)}/>}
            {showCourseDateEdit && <EditCourseDays setter={setPostClassTime}  close={() => setShowCourseDateEdit(false)}/>}
            <div className="wrapper">
                <div className="left">
                    <div className="video-player-block">
                        Introduction video
                    </div>
                    <div className="class-lang-wrapper">
                        <div className="class-time text_32">
                            <img className="edit-text" src={edit_text_icon} alt="edit-text"
                                 onClick={() => handleCourseDayChange()}/>
                            Class
                            time:{post.classTime.year}/{post.classTime.month}/{post.classTime.day} {post.classTime.hour}:{post.classTime.minute}  GMT({post.classTime.gmt})
                           <br/> Days: {post.classTime.days.map(item=>(item+"   "))}
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
                        day: {post.demoDay.year}/{post.demoDay.month}/{post.demoDay.day} {post.demoDay.hour}:{post.demoDay.minute}  GMT({post.demoDay.gmt})
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
                </div>
            </div>
        </div>
    )
}

export default CreateEditPage;
