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
        <div className="post-page">
            {switchToStudentView && (
                <SwitchToLoginView
                    close={() => setSwitchToStudentView(false)}
                />
            )}
            <div className="post-content">
                <div className="content-primary">
                    <div className="player-wrapper">
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
                    <div className="post-details">
                        <div className="post-title">{data?.title}</div>
                        <div className="post-description">
                            {data?.description}
                        </div>
                        <div className="post-reviews">
                            <div className="rating-section">
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
                            <div className="student-count">
                                <div>{data?.maxStudents} students</div>
                            </div>
                        </div>
                        <div className="schedule-info">
                            <div className="class-time">
                                Class starts: {classTime?.year}.
                                {classTime?.month}.{classTime?.day} at{" "}
                                {addZeroIfRequired(classTime?.hour)}:
                                {addZeroIfRequired(classTime?.minute)}
                            </div>
                            <div className="language-info">
                                Language: {data?.language}
                            </div>
                        </div>
                        <div className="class-days">
                            Class Schedule:{" "}
                            {data?.classDays?.map((day) => (
                                <div className="day-item" key={day}>
                                    {day}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="content-secondary">
                    <div className="course-description">
                        <div className="course-target">
                            <div className="target-title">Course Target:</div>
                            {data?.courseTarget?.length ? (
                                data.courseTarget.map((obj, i) => (
                                    <div key={i} className="target-item">
                                        {obj}
                                    </div>
                                ))
                            ) : (
                                <div className="target-item">
                                    No course targets available.
                                </div>
                            )}
                        </div>
                        <div className="requirements-section">
                            <div className="requirements-title">
                                Requirements:
                            </div>
                            {data?.requirements?.length ? (
                                data.requirements.map((obj, i) => (
                                    <div key={i} className="requirement-item">
                                        {obj}
                                    </div>
                                ))
                            ) : (
                                <div className="requirement-item">
                                    No requirements available.
                                </div>
                            )}
                        </div>
                        <div className="course-roadmap">
                            <h4 onClick={handleToggleRoadmap}>
                                Course Roadmap
                                {data?.roadmap && (
                                    <span
                                        className={`toggle-icon ${
                                            isExpanded ? "expanded" : ""
                                        }`}
                                    >
                                        <ArrowDownwardIcon />
                                    </span>
                                )}
                            </h4>
                            <ul
                                className={
                                    isExpanded
                                        ? "roadmap-list"
                                        : "roadmap-collapsed"
                                }
                            >
                                {data?.roadmap?.map((item, index) => (
                                    <li key={index}>{item}</li>
                                )) || <li>Roadmap details are coming soon.</li>}
                            </ul>
                        </div>
                    </div>

                    <div className="main-container">
                        <div className="main-info">
                            <div className="info-section-container">
                                <div className="info-section">
                                    <div className="info-label">Demo Day:</div>
                                    <div className="info-value">
                                        {demoDay?.year}.{demoDay?.month}.
                                        {demoDay?.day} at{" "}
                                        {addZeroIfRequired(demoDay?.hour)}:
                                        {addZeroIfRequired(demoDay?.minute)}
                                    </div>
                                </div>
                                <div className="info-section">
                                    <div className="info-label">Duration:</div>
                                    <div className="info-value">
                                        {data?.duration || "4 weeks"}
                                    </div>
                                </div>
                                <div className="info-section">
                                    <div className="info-label">Price:</div>
                                    <div className="info-value">
                                        ${data?.price || "199"}
                                    </div>
                                </div>
                            </div>

                            <div className="action-section">
                                {!isAlreadyAttending && (
                                    <div
                                        className="attend-demo-button"
                                        onClick={handleAttendDemo}
                                    >
                                        Attend Demo
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="teacher-info">
                            <div className="teacher">
                                <Link to={`/teacher/${teacher?.userName}`}>
                                    <img
                                        className="teacher-image"
                                        src={teacher?.profilePicture}
                                        alt="teacher"
                                    />
                                </Link>
                                <Link to={`/teacher/${teacher?.userName}`}>
                                    <div className="teacher-name">
                                        {teacher?.firstName || "Genry"}{" "}
                                        {teacher?.lastName || "Malcolm"}
                                    </div>
                                </Link>
                            </div>
                            <div className="teacher-desc">
                                {teacher?.description ||
                                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum omnis exercitationem tempora sunt ipsam iste eaque similique. Architecto, minima quo?"}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
