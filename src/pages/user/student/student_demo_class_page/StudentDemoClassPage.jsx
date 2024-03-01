import './StudentDemoClassPage.scss'
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import demoService from "../../../../services/demoService";
import Loading from "../../../../components/loading/Loading";
import postService from "../../../../services/postService";
import Timer from "../../../../components/timer/Timer";

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
    return (
        <div className="StudentDemoClassPage">
            {loading&&<Loading/>}
            <div className="demo-class-wrapper">
                {demoClass?.map(data=>{
                    return(
                        <div className="demo-class" key={data?.postId}>
                            <div className="demo-class-image-wrapper">
                                <img className="demo-class-image" src={`data:image/jpeg;base64, ${data?.image}`}
                                     alt="post-image"/>

                                <div className="timer-wrapper">
                                    <Timer demoTime={data?.demoTime} />
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