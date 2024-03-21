import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import classService from "../../../../services/classService";
import postService from "../../../../services/postService";

import './EditClassListPage.scss'

const EditClassListPage=()=>{
    const [teacherClasses, setTeacherClasses] = useState();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    useEffect(() => {
        classService.fetchTeacherClasses().then(data => {
            if (!data) {
                console.log("teacher has  0 classes")
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
        setTeacherClasses(newData)
        setLoading(false)

    }
    const handleOpenUpdateClass = (classId) => {
        navigate(`/edit-class/${classId}`)
    };

    return (
        <div className="EditClassListPage">
            {loading&&
                <div className="loading-to-center">
                    <div className="Loading">
                        <div>

                        </div>
                    </div>
                </div>
            }
            <div className="class-wrapper">
                {teacherClasses?.map(data=>{
                    return(
                        <div className="class" key={data?.classId} >
                            <div className="class-image-wrapper" onClick={()=>handleOpenUpdateClass(data?.classId)}>
                                <img className="class-image" src={`data:image/jpeg;base64, ${data?.image}`}
                                     alt="post-image"/>
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

export default EditClassListPage;