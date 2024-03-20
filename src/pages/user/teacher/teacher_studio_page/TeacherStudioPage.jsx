import {Link} from "react-router-dom";

import {useEffect, useState} from "react";
import classService from "../../../../services/classService";

import './TeacherStudioPage.scss'

const TeacherStudioPage = () => {
    const [isClassExists,setIsClassExists]=useState(false);
    useEffect(()=>{
        classService.isTeacherClassExists().then(data => {
            setIsClassExists(data);
        })
    });
    return (
        <div className="TeacherStudioPage">
                <div className="wrapper">
                    <Link to="/publish-class"  className="block-link">
                        <div className="block">Publish Class</div>
                    </Link>
                    <Link to="/teacher-demo"  className="block-link">
                        <div className="block">Demo with new Students</div>
                    </Link>
                    {
                        isClassExists&&
                        <Link to="/edit-class"  className="block-link">
                            <div className="block">Edit Class</div>
                        </Link>
                    }
                </div>

        </div>
    )
}
export default TeacherStudioPage;