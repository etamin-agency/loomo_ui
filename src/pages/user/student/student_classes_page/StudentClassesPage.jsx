import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import postService from "../../../../services/postService";
import create_icon from "../../../../assets/white-create-icon.png";
import classService from "../../../../services/classService";

import ClassTimer from "../../../../components/timer/ClassTimer";


import './StudentClassesPage.scss'

const StudentClassesPage = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        classService.fetchAttendingClassesForStudent().then(data => {
            if (!data) {
                console.log("student attending to 0 classes")
            }else {
                console.log(data)
                fetchImages(data)
            }
        })
    }, [])
    const fetchImages = async (classes) => {
            const newData =await Promise.all(classes?.map( async(classData) => {
                const file = await postService.getImage(classData?.classImgLink);
                return {
                    ...classData,
                    image: file
                };
            }))
            setClasses(newData)
            setLoading(false)

    }
    // console.log(demoClass)

    const handleOpenDemoRoom = (classId) => {
        // navigate(`/demo-room/${postId}`)

    }
    const isJoinDemoRoom = (classTime) => {
        const endTime = new Date(classTime).getTime();
        const currentTime = new Date().getTime();
        const userGMTOffsetInMilliseconds = new Date().getTimezoneOffset() * 60 * 1000;
        const adjustedEndTime = endTime - userGMTOffsetInMilliseconds;
        const timeDiff = adjustedEndTime - currentTime;
        const twoHoursInMilliseconds = 2 * 60 * 60 * 1000;
        return (timeDiff <= 0) && (Math.abs(timeDiff) <= twoHoursInMilliseconds);
    };


    return (
        <div className="StudentClassPage">
            {loading&&
                <div className="loading-to-center">
                    <div className="Loading">
                        <div>

                        </div>
                    </div>
                </div>
            }
            <div className="class-wrapper">
                {classes?.map(data=>{
                    const isClassTime=isJoinDemoRoom(data?.classTime)
                    return(
                        <div className="class" key={data?.postId}>
                            <div className="class-image-wrapper">
                                <img className="class-image" src={`data:image/jpeg;base64, ${data?.image}`}
                                     alt="post-image"/>

                                <div className="timer-wrapper">
                                    {isClassTime ?
                                        <div className="plus" onClick={()=>handleOpenDemoRoom(data?.postId)}>
                                            <img src={create_icon} alt="create-class-icon" className="create-icon"/>
                                        </div>
                                        : <ClassTimer classDays={data?.classDays} classTime={data?.classTime} classId={data?.classId} teacherId={data?.teacherId}/>}
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