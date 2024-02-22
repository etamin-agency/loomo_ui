import {createReducer} from "@reduxjs/toolkit";
import {
    setPostVideo,
    setPostTitle,
    setPostDesc,
    setPostCourseToWho,
    setPostReq,
    setPostPrice,
    setPostClassTime,
    setPostVideImg,
    setPostStudentNum,
    setPostDemoDay,
    setPostLanguage
} from "../actions";

const initialState = {
    post: {
        postVideo: '',
        title: "Write title of Your Course",
        desc: "Write your course Description here",
        courseToWho: ["write here about course to who"],
        req: ["write requirements here"],
        price: 180,
        classTime: {
            year: 0,
            month: 0,
            day: 0,
            hour: 0,
            minute: 0,
            gmt: 0,
            days:[]
        },
        videoImg: '',
        studentNum: 12,
        demoDay: {
            year: 0,
            month: 0,
            day: 0,
            hour: 0,
            minute: 0,
            gmt: 0
        },
        language: "English"
    }
};

const classPost = createReducer(initialState, builder => {
    builder
        .addCase(setPostVideo, (state, action) => {
            state.post.postVideo = action.payload
        })
        .addCase(setPostTitle, (state, action) => {
            state.post.title = action.payload?.text
        })
        .addCase(setPostDesc, (state, action) => {
            state.post.desc = action.payload?.text
        })
        .addCase(setPostCourseToWho, (state, action) => {
            state.post.courseToWho = action.payload
        })
        .addCase(setPostReq, (state, action) => {
            state.post.req = action.payload
        })
        .addCase(setPostPrice, (state, action) => {
            state.post.price = action?.payload?.num
        })
        .addCase(setPostClassTime, (state, action) => {
            state.post.classTime = action.payload
        })
        .addCase(setPostVideImg, (state, action) => {
            console.log(action.payload)
            state.post.videoImg = action.payload
        })
        .addCase(setPostDemoDay, (state, action) => {
            state.post.demoDay = action.payload;
        })
        .addCase(setPostLanguage, (state, action) => {
            state.post.language = action.payload
        })
        .addCase(setPostStudentNum, (state, action) => {
            state.post.studentNum = action.payload?.num
        })
        .addDefaultCase(() => {
        });
});

export default classPost;
