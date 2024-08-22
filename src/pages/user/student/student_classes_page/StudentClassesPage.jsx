import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import postService from "../../../../services/postService";
import create_icon from "../../../../assets/white-create-icon.png";
import classService from "../../../../services/classService";
import Button from "react-bootstrap/Button";

import ClassTimer from "../../../../components/timer/ClassTimer";
import TeacherDemoPage from "../../teacher/student_demo_page/TeacherDemoPage";

import "./StudentClassesPage.scss";
import { calculateTimeRemaining } from "../../../../utils/helper/math";
import { useSelector } from "react-redux";
import demoRoomService from "../../../../services/demoRoomService";
import Loading from "../../../../components/loading/Loading";
import demoService from "../../../../services/demoService";
import {
    Box,
    LinearProgress,
    linearProgressClasses,
    Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ClassMenu from "../../../../components/class_menu/ClassMenu";

const StudentClassesPage = () => {
    const navigate = useNavigate();
    const [classes, setClasses] = useState();
    const [loading, setLoading] = useState(true);
    const [isDemoExists, setDemoExists] = useState(false);
    const { role } = useSelector((state) => state.role);

    const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
        height: 10,
        borderRadius: 5,
        marginTop: 5,
        [`&.${linearProgressClasses.colorPrimary}`]: {
            backgroundColor:
                theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
        },
        [`& .${linearProgressClasses.bar}`]: {
            borderRadius: 5,
            backgroundColor:
                theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
        },
    }));

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

    console.log(isDemoExists);

    return (
        <div className="StudentClassPage">
            {loading && <Loading />}
            <div className="class-wrapper">
                {/* {classes?.map((data) => {
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
                                <ClassMenu classId={data?.classId} />

                                <div className="timer-wrapper">
                                    {isClassTime && (
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
                                    )}
                                </div>
                            </div>
                            <div className="class-info-wrapper">
                                <div className="class-title">
                                    {data?.className}
                                </div>
                                {calculateTimeRemaining(
                                    data?.classDays,
                                    data?.classTime
                                ).hours !== -1 ? (
                                    <div className="class-title">
                                        <ClassTimer
                                            className={data?.className}
                                            classDays={data?.classDays}
                                            classTime={data?.classTime}
                                            classId={data?.classId}
                                            teacherId={data?.teacherId}
                                        />
                                    </div>
                                ) : (
                                    <Box display={"flex"} alignItems={"center"}>
                                        <Box width={"100%"} mr={1}>
                                            <BorderLinearProgress
                                                variant="determinate"
                                                value={54}
                                            />
                                        </Box>
                                        <Box minWidth={35}>
                                            <Typography
                                                variant="body"
                                                sx={{ fontSize: 20 }}
                                                color={"primary"}
                                            >
                                                {`${Math.round(54.3)}%`}
                                            </Typography>
                                        </Box>
                                    </Box>
                                )}
                            </div>
                        </div>
                    );
                })} */}
                <div className="class"></div>
                <div className="class"></div>
                <div className="class"></div>
            </div>
            {isDemoExists && <h1>Demo classes</h1>}
            {!isDemoExists && (
                <div className="no-democlasses-message">
                    <h2>No Classes Available</h2>
                    {role === "student" ? (
                        <p>
                            You’re not enrolled in any classes. Check out our
                            available courses!
                        </p>
                    ) : (
                        <p>Looks like no one enrolled in your classes</p>
                    )}
                </div>
            )}

            <TeacherDemoPage />
        </div>
    );
};
export default StudentClassesPage;
