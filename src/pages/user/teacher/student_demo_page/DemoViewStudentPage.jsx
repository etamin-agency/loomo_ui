import { Link, useParams } from "react-router-dom";

import { useEffect, useState } from "react";
import { isValidUUID } from "../../../../utils/helper/validation";
import demoService from "../../../../services/demoService";

import "./DemoViewStudentPage.scss";
import classService from "../../../../services/classService";

const DemoViewStudentPage = () => {
    let { postId } = useParams();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [acceptStudents, setAcceptStudents] = useState(false);
    const [acceptedStudents, setAcceptedStudents] = useState([]);
    useEffect(() => {
        if (isValidUUID(postId)) {
            demoService.getDemoAppliedStudent(postId).then((data) => {
                console.log(data);
                setStudents(data);
            });
            classService.isClassExists(postId).then((data) => {
                if (data) {
                    classService.getAcceptedStudents(postId).then((ids) => {
                        setAcceptedStudents(ids);
                        setAcceptStudents(true);
                    });
                }
                setLoading(false);
            });
        } else {
            console.log("threw some error or redirect");
        }
    }, []);
    console.log(students);
    console.log(acceptedStudents);
    const renderStudentRow = (student) => {
        const isAccepted =
            acceptedStudents && acceptedStudents.includes(student?.studentId);
        console.log(acceptedStudents.includes(student?.studentId));
        return (
            <tr key={student?.studentId}>
                <td>{student?.firstName}</td>
                <td>{student?.lastName}</td>
                <Link
                    to={`/student/${student?.userName}`}
                    className="student-link-some"
                >
                    <td>{student?.userName}</td>
                </Link>
                <td>{student?.countryName}</td>
                {!isAccepted && acceptStudents && (
                    <div
                        className="accept-student"
                        onClick={() => handleAcceptStudent(student?.studentId)}
                    >
                        Accept
                    </div>
                )}
            </tr>
        );
    };

    const handleAcceptStudent = async (studentId) => {
        await classService.acceptStudent(studentId, postId);
        setAcceptedStudents([...acceptedStudents, studentId]);
    };
    return (
        <div className="DemoViewStudentPage">
            {loading && (
                <div className="loading-to-center">
                    <div className="Loading">
                        <div></div>
                    </div>
                </div>
            )}
            <h2>Number of Students: {students.length}</h2>
            <div className="table-responsive">
                {" "}
                {/* Make table responsive */}
                <table className="table table-striped custom-table">
                    {" "}
                    {/* Add custom-table class */}
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Country</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.map((student) => renderStudentRow(student))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default DemoViewStudentPage;
