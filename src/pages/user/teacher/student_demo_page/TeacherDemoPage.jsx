import './TeacherDemoPage.scss'
import {useEffect, useState} from "react";
import demoService from "../../../../services/demoService";
import postService from "../../../../services/postService";
import Loading from "../../../../components/loading/Loading";
import Timer from "../../../../components/timer/Timer";
import {Link, useNavigate} from "react-router-dom";
import create_icon from "../../../../assets/white-create-icon.png";
import demoRoomService from "../../../../services/demoRoomService";

const TeacherDemoPage = () => {
    const [demoClass, setDemoClass] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        fetchDemoClasses();
    }, [])
    const fetchDemoClasses = async () => {
        await demoService.getDemoClasses().then(async data => {
            const newData = await Promise.all(data?.map(async (post) => {
                const file = await postService.getImage(post?.introVideoImgLink);
                return {
                    ...post,
                    image: file
                };
            }));
            setDemoClass(newData)
            setLoading(false)
        });
    }
    console.log(demoClass)
    const viewStudentInDemoClass = (id,isDemoTime,teacherId) => {
        if(isDemoTime){
            demoRoomService.createRoom(id,teacherId).then((data)=>{
                navigate(`/demo-room/${data}`)
            })

        }else {
            navigate(`/teacher-demo/${id}`)

        }
    }
    const isCreateDemoRoom = (demoTime) => {
        const endTime = new Date(demoTime).getTime();
        const currentTime = new Date().getTime();
        const userGMTOffsetInMilliseconds = new Date().getTimezoneOffset() * 60 * 1000;
        const adjustedEndTime = endTime - userGMTOffsetInMilliseconds;
        const timeDiff = adjustedEndTime - currentTime;

        const twoHoursInMilliseconds = 2 * 60 * 60 * 1000;

        return Math.abs(timeDiff) <= twoHoursInMilliseconds;
    };

    return (
        <div className="TeacherDemoPage">
            {loading && <div className="loading-to-center">
                <div className="Loading">
                    <div>

                    </div>
                </div>
            </div>}
            <div className="demo-class-wrapper">
                {demoClass?.map(data => {
                    const isDemoTime=isCreateDemoRoom(data?.demoTime)
                    return (
                        <div className="demo-class" key={data?.postId}
                             onClick={() => viewStudentInDemoClass(data?.postId,isDemoTime,data?.teacherId)}>
                            <div className="demo-class-image-wrapper">
                                <img className="demo-class-image" src={`data:image/jpeg;base64, ${data?.image}`}
                                     alt="post-image"/>

                                <div className="timer-wrapper">
                                    {isDemoTime ?
                                        <div className="plus">
                                            <img src={create_icon} alt="create-class-icon" className="create-icon"/>
                                        </div>
                                        : <Timer demoTime={data?.demoTime}/>}
                                </div>
                            </div>
                            <div className="demo-class-title">
                                {data?.title}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )

}
export default TeacherDemoPage;