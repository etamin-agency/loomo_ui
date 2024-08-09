import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import postService from "../../../services/postService";
import Loading from "../../../components/loading/Loading";
import settingService from "../../../services/settingService";
import teacher_image from "../../../assets/teacher-image.png";
import "./Post.scss";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import SwitchToLoginView from "../../../components/view/SwitchToLoginView";
import demoService from "../../../services/demoService";
import { useSelector } from "react-redux";
import { Rating, Typography } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

const Post = () => {
    let { uuid } = useParams();
    const { role } = useSelector((state) => state.role);
    const [data, setData] = useState({});
    const [file, setFile] = useState("");
    const [classTime, setClassTime] = useState("");
    const [demoDay, setDemoDay] = useState("");
    const [loading, setLoading] = useState(true);
    const [teacher, setTeacher] = useState({});
    const [isAlreadyAttending, setAlreadyAttending] = useState(false);
    const [switchToStudentView, setSwitchToStudentView] = useState(false);
    const navigate = useNavigate();

    const [isExpanded, setIsExpanded] = useState(false);

    const handleToggleRoadmap = () => {
        data.roadmap && setIsExpanded(!isExpanded);
    };

    console.log(data);

    useEffect(() => {
        postService.getPost(uuid).then((data) => {
            const url = `https://d1kcxr0k66kiti.cloudfront.net/${data?.introVideoLink}`;
            setFile(url);
            setData(data);
            const classTime = new Date(data?.classTime);
            const demoDay = new Date(data?.demoTime);
            const classTimeObj = {
                year: classTime.getFullYear(),
                month: classTime.getMonth() + 1,
                day: classTime.getDate(),
                hour:
                    classTime.getHours() +
                    (classTime.getTimezoneOffset() / 60) * -1,
                minute: classTime.getMinutes(),
                gmt: (classTime.getTimezoneOffset() / 60) * -1,
            };
            const demoDayObj = {
                year: demoDay.getFullYear(),
                month: demoDay.getMonth() + 1,
                day: demoDay.getDate(),
                hour:
                    demoDay.getHours() +
                    (demoDay.getTimezoneOffset() / 60) * -1,
                minute: demoDay.getMinutes(),
                gmt: (demoDay.getTimezoneOffset() / 60) * -1,
            };
            getTeacher(data);
            setClassTime(classTimeObj);
            setDemoDay(demoDayObj);
        });
    }, [uuid]);

    const getTeacher = async (data) => {
        await settingService
            .getTeacherProfileById(data?.teacherId)
            .then((teacher) => {
                if (teacher?.profilePicture == null) {
                    setTeacher({ ...teacher, profilePicture: teacher_image });
                } else {
                    const img = `data:image/jpeg;base64,${teacher?.profilePicture}`;
                    setTeacher({ ...teacher, profilePicture: img });
                }
            });
        if (role) {
            const isAlreadyAttending = await demoService.isStudentAttending(
                uuid
            );
            setAlreadyAttending(isAlreadyAttending);
        }
        setLoading(false);
    };

    const addZeroIfRequired = (num) => (num < 10 ? `0${num}` : num);

    const handleAttendDemo = () => {
        if (role) {
            if (role === "teacher") {
                setSwitchToStudentView(true);
            } else if (role === "student") {
                const token = Cookie.get("access_token");
                const username = jwtDecode(token).sub;
                demoService.attendDemoClass({
                    studentUserName: username,
                    teacherId: data?.teacherId,
                    postId: uuid,
                });
                setAlreadyAttending(true);
            }
        } else {
            navigate("/login");
        }
    };

    return loading ? (
        <Loading />
    ) : (
        <div className="Post">
            {switchToStudentView && (
                <SwitchToLoginView
                    close={() => setSwitchToStudentView(false)}
                />
            )}
            <div className="post_wrapper">
                <div className="wrapper-first-part">
                    <div className="react-player">
                        <ReactPlayer
                            url={file}
                            controls
                            config={{
                                file: {
                                    attributes: { controlsList: "nodownload" },
                                },
                            }}
                            width={"100%"}
                            height={"100%"}
                        />
                    </div>
                    <div className="post-info-wrapper">
                        <div className="post-title">{data?.title}</div>
                        <div className="post-desc">{data?.description}</div>
                        <div className="post-teacher-reviews">
                            {/* <div className="post-teacher">
                                <div className="teacher-name">
                                    {teacher?.firstName} {teacher?.lastName}
                                </div>
                                <Link to={`/teacher/${teacher?.userName}`}>
                                    <img
                                        className="teacher-image"
                                        src={teacher?.profilePicture}
                                        alt="teacher"
                                    />
                                </Link>
                            </div> */}

                            <div className="post-rating">
                                <Typography component="legend">
                                    Rating: {data?.rating ? data?.rating : 3.8}
                                </Typography>
                                <Rating
                                    name="read-only"
                                    value={data?.rating ? data?.rating : 3.8}
                                    readOnly
                                    sx={{ color: "#007bff" }}
                                />
                            </div>
                            <div className="post-students">
                                <div>{data?.maxStudents} students</div>
                            </div>
                        </div>
                        <div className="post-info-schedule">
                            <div className="post-time">
                                Class starts: {classTime?.year}.
                                {classTime?.month}.{classTime?.day} at{" "}
                                {addZeroIfRequired(classTime?.hour)}:
                                {addZeroIfRequired(classTime?.minute)}
                            </div>
                            <div className="post-language">
                                Language: {data?.language}
                            </div>
                        </div>
                        <div className="post-days">
                            Class Schedule:{" "}
                            {data?.classDays?.map((day) => (
                                <div className="post-day" key={day}>
                                    {day}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="post-main-container">
                    <div className="course-description">
                        <div className="post-req">
                            <div className="req-text">Course Target:</div>
                            {data?.courseTarget?.length ? (
                                data.courseTarget.map((obj, i) => (
                                    <div key={i} className="req-item">
                                        {i + 1}. {obj}
                                    </div>
                                ))
                            ) : (
                                <div className="req-item">
                                    No course targets available.
                                </div>
                            )}
                        </div>
                        <div className="post-req">
                            <div className="req-text">Requirements:</div>
                            {data?.requirements?.length ? (
                                data.requirements.map((obj, i) => (
                                    <div key={i} className="req-item">
                                        {i + 1}. {obj}
                                    </div>
                                ))
                            ) : (
                                <div className="req-item">
                                    No requirements available.
                                </div>
                            )}
                        </div>
                        <div className="course-roadmap">
                            <h4 onClick={handleToggleRoadmap}>
                                Course Roadmap
                                {data?.roadmap && (
                                    <span
                                        className={`arrow ${
                                            isExpanded ? "up" : ""
                                        }`}
                                    >
                                        <ArrowDownwardIcon />
                                    </span>
                                )}
                            </h4>
                            <ul className={isExpanded ? "" : "collapsed"}>
                                {data?.roadmap?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                )) || <li>Roadmap details are coming soon.</li>}
                            </ul>
                        </div>
                    </div>

                    <div className="wrapper-second-part">
                        <div className="course-info-container">
                            <div className="course-detail">
                                <div className="course-detail-label">
                                    Demo Day:
                                </div>
                                <div className="course-detail-value">
                                    {demoDay?.year}.{demoDay?.month}.
                                    {demoDay?.day} at{" "}
                                    {addZeroIfRequired(demoDay?.hour)}:
                                    {addZeroIfRequired(demoDay?.minute)}
                                </div>
                            </div>
                            <div className="course-detail">
                                <div className="course-detail-label">
                                    Duration:
                                </div>
                                <div className="course-detail-value">
                                    {data?.duration || "4 weeks"}
                                </div>
                            </div>
                            <div className="course-detail">
                                <div className="course-detail-label">
                                    Price:
                                </div>
                                <div className="course-detail-value">
                                    ${data?.price || "199"}
                                </div>
                            </div>
                        </div>

                        <div className="parent-block">
                            {!isAlreadyAttending && (
                                <div
                                    className="post-attend"
                                    onClick={handleAttendDemo}
                                >
                                    Attend Demo
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
