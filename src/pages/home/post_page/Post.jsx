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
            console.log(data);
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
    }, []);
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
            console.log(isAlreadyAttending);
            setAlreadyAttending(isAlreadyAttending);
        }
        setLoading(false);
    };

    const addZeroIfRequired = (num) => {
        if (num < 10) {
            return `0${num}`;
        }
        return num;
    };
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
                        width="846px"
                        height="480px"
                    />
                    <div className="post-time">
                        Class starts: {classTime?.year}.{classTime?.month}.
                        {classTime?.day} at {addZeroIfRequired(classTime?.hour)}
                        :{addZeroIfRequired(classTime?.minute)}
                    </div>
                    <div className="post-days">
                        {data?.classDays?.map((day) => {
                            return (
                                <div className="post-day" key={day}>
                                    {day}
                                </div>
                            );
                        })}
                    </div>
                    <div className="post-teacher-reviews">
                        <div className="post-teacher">
                            <div className="teacher-name">
                                {teacher?.firstName} {teacher?.lastName}
                            </div>
                            <Link to={`/teacher/${teacher?.userName}`}>
                                <img
                                    className="teacher-image"
                                    src={teacher?.profilePicture}
                                    alt="teacher-image"
                                />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="wrapper-second-part">
                    <div className="title-desc-wrapper">
                        <div className="post-title">{data?.title}</div>
                        <div className="post-desc">{data?.description}</div>
                    </div>
                    <div className="post-req">
                        <div className="req-text">Requirements:</div>
                        {data?.requirements?.map((obj, i) => {
                            return (
                                <div key={i}>
                                    {i + 1}. {obj}
                                </div>
                            );
                        })}
                    </div>

                    <div className="post-req">
                        <div className="req-text">Course To who:</div>
                        {data?.courseTarget?.map((obj, i) => {
                            return (
                                <div key={i}>
                                    {i + 1}. {obj}
                                </div>
                            );
                        })}
                    </div>

                    <div className="post-info-price">
                        <div className="post-price-text-wrapper">
                            <div className="post-demo-day">
                                <div>Demo day:</div>
                                {"      " + demoDay?.year}.{demoDay?.month}.
                                {demoDay?.day} at{" "}
                                {addZeroIfRequired(demoDay?.hour)}:
                                {addZeroIfRequired(demoDay?.minute)}
                            </div>
                            <div className="post-language">
                                <div>Language:</div>
                                {data?.language}
                            </div>
                        </div>
                        <div className="post-price-wrapper">
                            <div className="post-students">
                                <div>Student in class:</div>
                                {data?.maxStudents}
                            </div>
                            <div className="post-price">
                                <div>Price:</div>
                                {data?.price}
                                <div>$</div>
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
