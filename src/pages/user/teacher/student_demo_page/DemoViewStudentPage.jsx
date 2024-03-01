import {Link, useParams} from "react-router-dom";

import './DemoViewStudentPage.scss'
import {useEffect, useState} from "react";
import {isValidUUID} from "../../../../utils/helper/validation";
import demoService from "../../../../services/demoService";

const DemoViewStudentPage = () => {
    let {postId} = useParams();
    const [students,setStudents]=useState([]);
    const [loading,setLoading]=useState(true);

    useEffect(() => {
        if (isValidUUID(postId)) {
            demoService.getDemoAppliedStudent(postId).then(data=> {
                console.log(data)
                setStudents(data)
                setLoading(false)
            })
        } else {
            console.log("threw some error or redirect")
        }
    },[])
    return (
        <div className="DemoViewStudentPage">
            {loading && <div className="loading-to-center">
                <div className="Loading">
                    <div>

                    </div>
                </div>
            </div>}
            <h2>Number of Students: {students.length}</h2>
            <div className="table-responsive"> {/* Make table responsive */}
                <table className="table table-striped custom-table"> {/* Add custom-table class */}
                    <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                        <th>Country</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map(student=>{
                       return(
                           <tr>
                               <td>{student?.firstName}</td>
                               <td>{student?.lastName}</td>
                               <Link to={`/student/${student?.userName}`} className="student-link-some">
                                   <td>{student?.userName}</td>
                               </Link>
                               <td>{student?.countryName}</td>
                           </tr>
                       )
                    })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default DemoViewStudentPage;