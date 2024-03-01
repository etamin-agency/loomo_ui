import './TeacherDemoPage.scss'
import {useEffect, useState} from "react";
import demoService from "../../../../services/demoService";
import postService from "../../../../services/postService";
import Loading from "../../../../components/loading/Loading";
import Timer from "../../../../components/timer/Timer";
import {useNavigate} from "react-router-dom";

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
    const viewStudentInDemoClass = (id) => {
        navigate(`/teacher-demo/${id}`)
    }
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
                    return (
                        <div className="demo-class" key={data?.postId}
                             onClick={() => viewStudentInDemoClass(data?.postId)}>
                            <div className="demo-class-image-wrapper">
                                <img className="demo-class-image" src={`data:image/jpeg;base64, ${data?.image}`}
                                     alt="post-image"/>

                                <div className="timer-wrapper">
                                    <Timer demoTime={data?.demoTime}/>
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