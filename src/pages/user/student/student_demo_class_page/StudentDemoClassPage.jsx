import './StudentDemoClassPage.scss'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import demoService from "../../../../services/demoService";
import Loading from "../../../../components/loading/Loading";
import postService from "../../../../services/postService";
import Timer from "../../../../components/timer/Timer";
import create_icon from "../../../../assets/white-create-icon.png";

const StudentDemoClassPage = () => {
    const navigate = useNavigate();
    const [demoClass, setDemoClass] = useState();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        demoService.isStudentAttendingToAnyClass().then(data => {
            if (!data) {
                navigate("/")
            }else {
                fetchDemoClasses();
            }
        })
    }, [])
    const fetchDemoClasses = async () => {
      await demoService.getDemoClassesPost().then(async data => {
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

    const handleOpenDemoRoom = (postId) => {
        navigate(`/demo-room/${postId}`)

    }
    const isJoinDemoRoom = (demoTime) => {
        const endTime = new Date(demoTime).getTime();
        const currentTime = new Date().getTime();
        const userGMTOffsetInMilliseconds = new Date().getTimezoneOffset() * 60 * 1000;
        const adjustedEndTime = endTime - userGMTOffsetInMilliseconds;
        const timeDiff = adjustedEndTime - currentTime;
        const twoHoursInMilliseconds = 2 * 60 * 60 * 1000;
        return (timeDiff <= 0) && (Math.abs(timeDiff) <= twoHoursInMilliseconds);
    };
    return (
        <div className="StudentDemoClassPage">
            {loading&&<Loading/>}
            <div className="demo-class-wrapper">
                {demoClass?.map(data=>{
                    const isDemoTime=isJoinDemoRoom(data?.demoTime)
                    return(
                        <div className="demo-class" key={data?.postId}>
                            <div className="demo-class-image-wrapper">
                                <img className="demo-class-image" src={`data:image/jpeg;base64, ${data?.image}`}
                                     alt="post-image"/>

                                <div className="timer-wrapper">
                                    {isDemoTime ?
                                        <div className="plus" onClick={()=>handleOpenDemoRoom(data?.postId)}>
                                            <img src={create_icon} alt="create-class-icon" className="create-icon"/>
                                        </div>
                                        : <Timer demoTime={data?.demoTime} classId={data?.postId}/>}
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
export default StudentDemoClassPage;