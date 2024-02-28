import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import ReactPlayer from "react-player";
import postService from "../../../services/postService";

import './Post.scss';

const Post = () => {
    let {uuid} = useParams();
    const [data, setData] = useState({});
    const [file, setFile] = useState('');
    const [classTime, setClassTime] = useState('');
    const [demoDay, setDemoDay] = useState('');
    useEffect(() => {
        postService.getPost(uuid).then((data) => {
            const url = `https://d1oxvzb6zdyzdk.cloudfront.net/${data?.introVideoLink}`;
            setFile(url);
            setData(data);
            const classTime = new Date(data?.classTime)
            const demoDay = new Date(data?.demoTime)
            const classTimeObj = {
                year: classTime.getFullYear(),
                month: classTime.getMonth() + 1,
                day: classTime.getDate(),
                hour: classTime.getHours() + classTime.getTimezoneOffset() / 60 * -1,
                minute: classTime.getMinutes(),
                gmt: classTime.getTimezoneOffset() / 60 * -1
            };
            const demoDayObj = {
                year: demoDay.getFullYear(),
                month: demoDay.getMonth() + 1,
                day: demoDay.getDate(),
                hour: demoDay.getHours() + demoDay.getTimezoneOffset() / 60 * -1,
                minute: demoDay.getMinutes(),
                gmt: demoDay.getTimezoneOffset() / 60 * -1
            };
            setClassTime(classTimeObj)
            setDemoDay(demoDayObj)
        });
    }, []);
    const addZeroIfRequired = (num) => {
        if (num < 10) {
            return `0${num}`
        }
        return num
    }

    const handleAttendDemo = () => {

    }
    return (
        <div className="Post">
            <div className="post_wrapper">
                <div className="wrapper-first-part">
                    <ReactPlayer
                        url={file}
                        controls
                        className="react-player"
                        config={{file: {attributes: {controlsList: 'nodownload'}}}}
                        width="846px"
                        height="480px"
                    />
                    <div className="post-time">
                        Class
                        starts: {classTime?.year}.{classTime?.month}.{classTime?.day} at {addZeroIfRequired(classTime?.hour)}:{addZeroIfRequired(classTime?.minute)}
                    </div>
                    <div className="post-days">
                        {data?.classDays?.map(day => {
                            return (
                                <div className="post-day">{day}</div>
                            )
                        })}
                    </div>
                    <div className="post-teacher-reviews">

                    </div>
                </div>
                <div className="wrapper-second-part">
                    <div className="title-desc-wrapper">
                        <div className="post-title">
                            {data?.title}
                        </div>
                        <div className="post-desc">
                            {data?.description}
                        </div>
                    </div>
                    <div className="post-req">
                        <div className="req-text">Requirements:</div>
                        {data?.requirements?.map((obj, i) => {
                            return (
                                <div>{i + 1}. {obj}</div>
                            )
                        })}
                    </div>

                    <div className="post-req">
                        <div className="req-text">Course To who:</div>
                        {data?.courseTarget?.map((obj, i) => {
                            return (
                                <div>{i + 1}. {obj}</div>
                            )
                        })}
                    </div>

                    <div className="post-info-price">
                        <div className="post-price-text-wrapper">
                            <div className="post-demo-day">
                                <div>Demo day:</div>
                                {"      " + demoDay?.year}.{demoDay?.month}.{demoDay?.day} at {addZeroIfRequired(demoDay?.hour)}:{addZeroIfRequired(demoDay?.minute)}
                            </div>
                            <div className="post-language">
                                <div>Language:</div>
                                {data?.language}</div>
                        </div>
                        <div className="post-price-wrapper">
                            <div className="post-students">
                                <div>Student in class:</div>
                                {data?.maxStudents}</div>
                            <div className="post-price">
                                <div>Price: </div> {data?.price}
                                <div>$</div>
                            </div>
                        </div>
                        <div className="parent-block">
                            <div className="post-attend" onClick={handleAttendDemo}>
                                Attend Demo
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Post;