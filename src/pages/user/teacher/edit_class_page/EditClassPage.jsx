import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import classService from "../../../../services/classService";
import Button from "react-bootstrap/Button";

import EditText from "../../../../components/edit_post_page_items/EditText";
import edit_text_icon from "../../../../assets/edit-text.png";


import EditCourseDays from "../../../../components/edit_post_page_items/EditCourseDays";
import EditLanguage from "../../../../components/edit_post_page_items/EditLanguage";
import EditPrice from "../../../../components/edit_post_page_items/EditPrice";


import './EditClassPage.scss'
import adjustDateByHour from "../../../../utils/helper/math";

const EditClassPage = () => {
    let {classId} = useParams();
    const [classTime, setClassTime] = useState(null);
    const [className, setClassName] = useState(null);
    const [language, setLanguage] = useState(null);
    const [price, setPrice] = useState(null);
    // const [maxStudents, setMaxStudents] = useState(null);
    const [classDays, setClassDays] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showEditClassName, setShowEditClassName] = useState(false);
    const [showEditLanguage, setShowEditLanguage] = useState(false);
    const [showPriceEdit, setShowPriceEdit] = useState(false);

    const [showEditClassDayAndTime, setShowEditClassDayAndTime] = useState(false);

    const [isChanged, setIsChanged] = useState(false);

    const [errorText, setErrorText] = useState('');
    const navigate=useNavigate();

    useEffect(() => {
        classService.fetchClass(classId).then((data) => {
            const classTime = new Date(data?.classTime)

            const classTimeObj = {
                year: classTime.getFullYear(),
                month: classTime.getMonth() + 1,
                day: classTime.getDate(),
                hour: classTime.getHours() + classTime.getTimezoneOffset() / 60 ,
                minute: classTime.getMinutes(),
                gmt: classTime.getTimezoneOffset() / 60 * -1,
                classTime: classTime
            };
            setClassDays(data?.classDays);
            console.log(classTimeObj)
            setClassTime(classTimeObj);
            setClassName(data?.className);
            setLanguage(data?.language);
            setPrice(data?.price);
            // setMaxStudents(data?.maxStudents);
            setLoading(false);
        })
    }, []);

    const handleEditClass = () => {
        const currentTime = new Date();

        if (classTime.classTime < currentTime) {
            setErrorText("Class time  has to be in present")
        }
        else if(classDays === null ||className===''||price===''||language===''  ){
            setErrorText('items have to be filled')
        }else {
            const {year, month, day, hour, minute, gmt}=classTime;

            const newObj = {
                classTime: adjustDateByHour(year, month, day, hour, minute, -gmt),
                classDays: classDays,
                price:price,
                language:language,
                className:className,
            }
            classService.updateClass(classId,newObj).then(isUpdated=>{
                if (isUpdated){
                    navigate('/edit-class')
                }
            })
        }
    }
    const handleClassEditDayAndTime = (data) => {
        setClassTime(data);
        setClassDays(data?.days);
    }
    return (
        <div className="EditClassPage">
            {loading &&
                <div className="loading-to-center">
                    <div className="Loading">
                        <div>

                        </div>
                    </div>
                </div>
            }
            {showEditClassName &&
                <EditText isEditClass={true}
                          setIsChanged={setIsChanged}
                          className={className}
                          setter={setClassName}
                          num={15}
                          close={() => setShowEditClassName(false)}/>}

            {
                showEditClassDayAndTime &&
                <EditCourseDays setIsChanged={setIsChanged} isEditClass={true} setter={handleClassEditDayAndTime}
                                close={() => setShowEditClassDayAndTime(false)}/>
            }
            {
                showEditLanguage &&
                <EditLanguage setIsChanged={setIsChanged} isEditClass={true} setter={setLanguage}
                              close={() => setShowEditLanguage(false)} langauge={language}/>
            }
            {showPriceEdit && <EditPrice setIsChanged={setIsChanged} isEditClass={true} setter={setPrice}
                                         close={() => setShowPriceEdit(false)}/>}

            <div className="wrapper">
                <div className="left-wrapper">

                    <div className="class-name">
                        <img className="edit-text" src={edit_text_icon} alt="edit-text"
                             onClick={() => setShowEditClassName(true)}/>
                        Class Name: {className}</div>
                    <div className="class-time">
                        <img className="edit-text" src={edit_text_icon} alt="edit-text"
                             onClick={() => setShowEditClassDayAndTime(true)}/>
                        Class
                        time: {classTime?.year}/{classTime?.month}/{classTime?.day} {classTime?.hour}:{classTime?.minute} GMT{classTime?.gmt}
                        <br/> Days: {classDays?.map(item => (item + "   "))}
                    </div>
                </div>
                <div className="right-wrapper">
                    <div className="class-language">
                        <img className="edit-text" src={edit_text_icon} alt="edit-text"
                             onClick={() => setShowEditLanguage(true)}/>
                        Class Language: {language}</div>
                    <div className="class-price">
                        <img className="edit-text" src={edit_text_icon} alt="edit-text"
                             onClick={() => setShowPriceEdit(true)}/>
                        Class Price: {price}$
                    </div>
                    {/*<div className="class-max-students">Class Students: {maxStudents}</div>*/}
                </div>
                <div className="button-wrapper">
                    <div className="error-text">{errorText}</div>
                    <Button className="save-button" type="submit" size="sm" disabled={!isChanged}
                            onClick={handleEditClass}>
                        Save
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default EditClassPage;