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
        postVideo: null,
        title: "Write title of Your Course",
        desc: "Write your course Description here",
        courseToWho: ["write here about course to who"],
        req: ["write requirements here"],
        price: 180,
        classTime: null,
        videoImg: null,
        studentNum: 12,
        demoDay: null,
        language: "English"
    }
};

const classPost = createReducer(initialState, builder => {
    builder
        .addCase(setPostVideo, (state, action) => {
            state.post.postVideo = action.payload?.text
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
            console.log(action.payload)
            state.post.req = action.payload
        })
        .addCase(setPostPrice, (state, action) => {
            state.post.price = action?.payload?.num
        })
        .addCase(setPostClassTime, (state, action) => {
            state.post.classTime = action.payload?.text
        })
        .addCase(setPostVideImg, (state, action) => {
            state.post.videoImg = action.payload?.text
        })
        .addCase(setPostDemoDay, (state, action) => {
            state.post.demoDay = action.payload?.text
        })
        .addCase(setPostLanguage, (state, action) => {
            console.log(action.payload)
            state.post.language = action.payload
        })
        .addCase(setPostStudentNum, (state, action) => {
            state.post.studentNum = action.payload?.num
        })
        .addDefaultCase(() => {
        });
});

export default classPost;
