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
import { Rating, Typography, Snackbar, Alert } from "@mui/material";
import { convertMinutesToHours } from "../../../utils/helper/math";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import AuthDialog from "../../../components/auth_dialog/AuthDialog";
import { Helmet } from "react-helmet-async";

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
    const [isExpanded, setIsExpanded] = useState(false);
    const [openAuthDialog, setOpenAuthDialog] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const navigate = useNavigate();

    const handleToggleRoadmap = () => {
        data.roadmap && setIsExpanded(!isExpanded);
    };

    useEffect(() => {
        let isMounted = true;

        const fetchData = async () => {
            try {
                const data = await postService.getPost(uuid);
                if (isMounted) {
                    const url = `https://d1a1pwt8h1hq88.cloudfront.net/${data?.introVideoLink}`;
                    // const url = `https://post-videos-loomo.s3.eu-north-1.amazonaws.com/${data?.introVideoLink}`;
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

                    const teacher = await settingService.getTeacherProfileById(
                        data?.teacherId
                    );
                    const img = teacher?.profilePicture
                        ? `data:image/jpeg;base64,${teacher.profilePicture}`
                        : teacher_image;

                    if (isMounted) {
                        setData(data);
                        setFile(url);
                        setClassTime(classTimeObj);
                        setDemoDay(demoDayObj);
                        setTeacher({ ...teacher, profilePicture: img });
                        setLoading(false);
                    }

                    if (role) {
                        const isAlreadyAttending =
                            await demoService.isStudentAttending(uuid);
                        if (isMounted) {
                            setAlreadyAttending(isAlreadyAttending);
                        }
                    }
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [uuid]); // Ensure role is included if necessary

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
                setSnackbarMessage("You are now registered for the demo!");
                setOpenSnackbar(true);
            }
        } else {
            setOpenAuthDialog(true);
        }
    };

    const handleCloseAuthDialog = () => {
        setOpenAuthDialog(false);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };
    console.log(data);

    return loading ? (
        <Loading />
    ) : (
        <div className="post-page">
            <Helmet>
                <title>{`${data?.title} - ${teacher?.firstName || "Andrew"} ${
                    teacher?.lastName || "Tate"
                } | Loomo`}</title>
                <meta name="description" content={data?.description} />
                <meta name="medium" content="mult" />
                <meta
                    property="og:title"
                    content={`${data?.title} - ${
                        teacher?.firstName || "Andrew"
                    } ${teacher?.lastName || "Tate"}`}
                />
                <meta property="og:description" content={data?.description} />
                <meta property="og:image" content={file} />
                <meta
                    property="og:url"
                    content={
                        data?.url
                            ? data?.url
                            : `${window.location.origin}/post/${data?.postId}`
                    }
                />
                <meta property="og:site_name" content="Loomo" />
                <meta property="og:type" content="loomo_com:course" />
                <meta
                    property="og:video"
                    content={`https://d1kcxr0k66kiti.cloudfront.net/${
                        data?.introVideoLink || "default-placeholder.mp4"
                    }`}
                />
                <meta property="og:video:type" content="video/mp4" />
                <meta property="og:video:width" content="1200" />
                <meta property="og:video:height" content="630" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:site" content="@loomo" />
                <meta
                    name="twitter:title"
                    content={`${data?.title} - ${
                        teacher?.firstName || "Andrew"
                    } ${teacher?.lastName || "Tate"}`}
                />
                <meta name="twitter:description" content={data?.description} />
                <meta name="twitter:image" content={file} />
                <meta name="application-name" content="Loomo" />
                <script type="application/ld+json">
                    {`{
                        "@context": "https://schema.org",
                        "@type": "Course",
                        "name": "${data?.title || "Default Course Title"} - ${
                        teacher?.firstName || "Default"
                    } ${teacher?.lastName || "Name"}",
                        "description": "${
                            data?.description || "Default Course Description"
                        }",
                        "image": "${file}",
                        "provider": {
                            "@type": "Organization",
                            "name": "Loomo",
                            "sameAs": "${window.location.origin}"
                        },
                        "educationalCredentialAwarded": "Certificate of Completion",
                        "hasCourseInstance": {
                            "@type": "CourseInstance",
                            "courseMode": "online",
                            "instructor": {
                                "@type": "Person",
                                "name": "${
                                    teacher?.firstName || "Default First Name"
                                } ${teacher?.lastName || "Default Last Name"}"
                            },                                              
                            "startDate": "${
                                data?.classStartDate ||
                                "2024-08-07T19:00:00.000Z"
                            }"
                        }
                    }`}
                </script>
            </Helmet>

            {switchToStudentView && (
                <SwitchToLoginView
                    open={switchToStudentView}
                    onClose={() => setSwitchToStudentView(false)}
                />
            )}
            <AuthDialog open={openAuthDialog} onClose={handleCloseAuthDialog} />
            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                message={snackbarMessage}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert onClose={handleCloseSnackbar} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
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
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                            }}
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
                                Class starts: {classTime?.day}.
                                {classTime?.month}.{classTime?.year} at{" "}
                                {addZeroIfRequired(classTime?.hour)}:
                                {addZeroIfRequired(classTime?.minute)}
                            </div>
                            <div className="language-info">
                                Duration:{" "}
                                {convertMinutesToHours(data?.duration)}
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
                    <div className="course-info">
                        <div className="course-target">
                            <div className="target-title">Course Target:</div>
                            {data?.courseTarget?.length ? (
                                data.courseTarget.map((obj, i) => (
                                    <div key={i} className="target-item">
                                        {obj.length ? obj : null}
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
                                        {demoDay?.day}.{demoDay?.month}.
                                        {demoDay?.year} at{" "}
                                        {addZeroIfRequired(demoDay?.hour)}:
                                        {addZeroIfRequired(demoDay?.minute)}
                                    </div>
                                </div>
                                <div className="info-section">
                                    <div className="info-label">Language:</div>
                                    <div className="info-value">
                                        {data?.language}
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
                                {!isAlreadyAttending ? (
                                    <div
                                        className="attend-demo-button"
                                        onClick={handleAttendDemo}
                                    >
                                        Attend Demo
                                    </div>
                                ) : (
                                    <div className="already-attend-demo-button">
                                        You are already attending demo
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
                            {teacher?.bio && (
                                <div className="teacher-desc">
                                    {teacher?.bio}
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
