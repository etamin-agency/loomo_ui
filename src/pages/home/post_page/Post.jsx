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
                    <ReactPlayer
                        url={file}
                        controls
                        className="react-player"
                        config={{
                            file: {
                                attributes: { controlsList: "nodownload" },
                            },
                        }}
                        width={'100%'}
                        height={'50vh'}
                    />
                    <div className="post-info-wrapper">
                        <div className="post-title">{data?.title}</div>
                        <div className="post-desc">{data?.description}</div>
                        <div className="post-teacher-reviews">
                            <div className="post-teacher">
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
                                
                            </div>

                            <div className="post-rating">
                                <Typography component="legend">
                                    Rating:
                                </Typography>
                                <Rating
                                    name="read-only"
                                    value={data?.rating ? data?.rating : 3.8}
                                    readOnly
                                    sx={{ color: "#007bff" }}
                                />
                            </div>
                            <div className="post-price-wrapper">
                                    <div className="post-price">
                                        {data?.price}$
                                    </div>
                                    <div className="post-language">
                                        {data?.language}
                                    </div>
                                </div>
                        </div>

                        <div className="post-time">
                            Class starts: {classTime?.year}.{classTime?.month}.
                            {classTime?.day} at{" "}
                            {addZeroIfRequired(classTime?.hour)}:
                            {addZeroIfRequired(classTime?.minute)}
                        </div>
                        <div className="post-days">
                            {data?.classDays?.map((day) => (
                                <div className="post-day" key={day}>
                                    {day}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="wrapper-second-part">
                    <div className="post-req">
                        <div className="req-text">Requirements:</div>
                        {data?.requirements?.map((obj, i) => (
                            <div key={i}>
                                {i + 1}. {obj}
                            </div>
                        ))}
                    </div>
                    <div className="post-req">
                        <div className="req-text">Course Target:</div>
                        {data?.courseTarget?.map((obj, i) => (
                            <div key={i}>
                                {i + 1}. {obj}
                            </div>
                        ))}
                    </div>
                    <div className="post-info-price">
                        <div className="post-demo-day">
                            <div>Demo day:</div>
                            {" " + demoDay?.year}.{demoDay?.month}.
                            {demoDay?.day} at {addZeroIfRequired(demoDay?.hour)}
                            :{addZeroIfRequired(demoDay?.minute)}
                        </div>
                        <div className="post-students">
                            <div>Students in class:</div>
                            {data?.maxStudents}
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
    );
};

export default Post;
