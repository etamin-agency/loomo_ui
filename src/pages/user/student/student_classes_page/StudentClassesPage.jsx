import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import postService from "../../../../services/postService";
import create_icon from "../../../../assets/white-create-icon.png";
import classService from "../../../../services/classService";

import ClassTimer from "../../../../components/timer/ClassTimer";


import './StudentClassesPage.scss'
import {calculateTimeRemaining} from "../../../../utils/helper/math";
import {useSelector} from "react-redux";
import demoRoomService from "../../../../services/demoRoomService";
import Loading from "../../../../components/loading/Loading";

const StudentClassesPage = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState();
    const [loading, setLoading] = useState(true);
    const {role} = useSelector(state => state.role);

    useEffect(() => {
        if (role === 'teacher') {
            classService.fetchTeacherClasses().then(data => {
                if (!data) {
                    console.log("teacher has  0 classes")
                } else {
                    console.log(data)
                    fetchImages(data)
                }
            })
        } else {
            classService.fetchAttendingClassesForStudent().then(data => {
                if (!data) {
                    console.log("student attending to 0 classes")
                } else {
                    console.log(data)
                    fetchImages(data)
                }
            })
        }

    }, [])
    const fetchImages = async (classes) => {
        const newData = await Promise.all(classes?.map(async (classData) => {
            const file = await postService.getImage(classData?.classImgLink);
            return {
                ...classData,
                image: file
            };
        }))
        setClasses(newData)
        setLoading(false)

    }

    const handleOpenClass = (classId, teacherId) => {
        if (isJoinClass) {
            if (role === 'teacher') {
                demoRoomService.createRoom(classId, teacherId).then((data) => {
                    navigate(`/demo-room/${data}`)
                })
            } else {
                navigate(`/demo-room/${classId}`)
            }

        } else {
            navigate(`/classes`)

        }
    }
    const isJoinClass =  (classDays, classTime) => {
        let twoHoursAgo = new Date(new Date().getTime() + (2 * 60 * 60 * 1000));
        const data =  calculateTimeRemaining(classDays, classTime,twoHoursAgo);
        console.log(data)
        if (data?.hours===-1&&data?.days===-1&&data?.minutes===-1&&data?.seconds===-1){
            return false;
        }

        if (role === 'teacher') {
            if ((data?.hours > 20 && data?.days === 6) || (data?.hours < 4 && data?.days === 0)) {
                return true;
            }
        } else {
            if (data?.hours < 2 && data?.days === 0)
                return true;
        }
        return false;

    };


    return (
        <div className="StudentClassPage">
            {loading && <Loading />}
            <div className="class-wrapper">
                {classes?.map(data => {
                    const isClassTime = isJoinClass(data?.classDays, data?.classTime)
                    return (
                        <div className="class" key={data?.classId}>
                            <div className="class-image-wrapper">
                                <img className="class-image" src={`data:image/jpeg;base64, ${data?.image}`}
                                     alt="post-image"/>

                                <div className="timer-wrapper">
                                    {isClassTime ?
                                        <div className="plus"
                                             onClick={() => handleOpenClass(data?.classId, data?.teacherId)}>
                                            <img src={create_icon} alt="create-class-icon" className="create-icon"/>
                                        </div>
                                        : <ClassTimer className={data?.className} classDays={data?.classDays}
                                                      classTime={data?.classTime} classId={data?.classId}
                                                      teacherId={data?.teacherId}/>}
                                </div>
                            </div>
                            <div className="class-title">
                                {data?.className}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
export default StudentClassesPage;