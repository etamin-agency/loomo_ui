import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import postService from "../../../../services/postService";
import create_icon from "../../../../assets/white-create-icon.png";
import classService from "../../../../services/classService";
import Button from "react-bootstrap/Button";

import ClassTimer from "../../../../components/timer/ClassTimer";

import "./StudentClassesPage.scss";
import { calculateTimeRemaining } from "../../../../utils/helper/math";
import { useSelector } from "react-redux";
import demoRoomService from "../../../../services/demoRoomService";
import Loading from "../../../../components/loading/Loading";
import demoService from "../../../../services/demoService";

const StudentClassesPage = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState();
    const [loading, setLoading] = useState(true);
    const [isDemoExists, setDemoExists] = useState(false);
    const { role } = useSelector((state) => state.role);

    useEffect(() => {
        if (role === "teacher") {
            classService.fetchTeacherClasses().then((data) => {
                if (!data || data?.length === 0) {
                    console.log("teacher has  0 classes");
                } else {
                    console.log(data);
                    setClasses(data);
                }
                setLoading(false);
            });
            demoService
                .isDemoClassesExists()
                .then((data) => setDemoExists(data));
        } else {
            classService.fetchAttendingClassesForStudent().then((data) => {
                if (!data || data?.length === 0) {
                    console.log("student attending to 0 classes");
                } else {
                    console.log(data);
                    setClasses(data);
                }
                setLoading(false);
            });
            demoService
                .isStudentAttendingToAnyClass()
                .then((data) => setDemoExists(data));
        }
    }, []);

    const handleOpenClass = (classId, teacherId) => {
        if (isJoinClass) {
            if (role === "teacher") {
                demoRoomService.createRoom(classId, teacherId).then((data) => {
                    navigate(`/demo-room/${data}`);
                });
            } else {
                navigate(`/demo-room/${classId}`);
            }
        } else {
            navigate(`/classes`);
        }
    };
    const isJoinClass = (classDays, classTime) => {
        let twoHoursAgo = new Date(new Date().getTime() + 2 * 60 * 60 * 1000);
        const data = calculateTimeRemaining(classDays, classTime, twoHoursAgo);
        console.log(data);
        if (
            data?.hours === -1 &&
            data?.days === -1 &&
            data?.minutes === -1 &&
            data?.seconds === -1
        ) {
            return false;
        }

        if (role === "teacher") {
            if (
                (data?.hours > 20 && data?.days === 6) ||
                (data?.hours < 4 && data?.days === 0)
            ) {
                return true;
            }
        } else {
            if (data?.hours < 2 && data?.days === 0) return true;
        }
        return false;
    };

    return (
        <div className="StudentClassPage">
            {loading && <Loading />}

            {isDemoExists && (
                <Link className="btn-demo-classes" to="/demo">
                    <Button>Demo Classes</Button>
                </Link>
            )}

            {typeof classes === "undefined" && (
                <div className="no-classes-message">
                    <h2>No Classes Available</h2>
                    {role === "student" ? (
                        <p>
                            You’re not enrolled in any classes. Check out our
                            available courses!
                        </p>
                    ) : (
                        <p>
                            Looks like no one enrolled in your classes 
                        </p>
                    )}
                </div>
            )}

            <div className="class-wrapper">
                {classes?.map((data) => {
                    const isClassTime = isJoinClass(
                        data?.classDays,
                        data?.classTime
                    );
                    return (
                        <div className="class" key={data?.classId}>
                            <div className="class-image-wrapper">
                                <img
                                    className="class-image"
                                    src={`https://d37zebxsdrcn1w.cloudfront.net/${data?.classImgLink}`}
                                    alt="post"
                                />

                                <div className="timer-wrapper">
                                    {isClassTime ? (
                                        <div
                                            className="plus"
                                            onClick={() =>
                                                handleOpenClass(
                                                    data?.classId,
                                                    data?.teacherId
                                                )
                                            }
                                        >
                                            <img
                                                src={create_icon}
                                                alt="create-class-icon"
                                                className="create-icon"
                                            />
                                        </div>
                                    ) : (
                                        <ClassTimer
                                            className={data?.className}
                                            classDays={data?.classDays}
                                            classTime={data?.classTime}
                                            classId={data?.classId}
                                            teacherId={data?.teacherId}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="class-title">{data?.className}</div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
export default StudentClassesPage;
