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
    setPostLanguage, setPost
} from "../actions";

const initialState = {
    post: {
        postVideo: {
            changed:false,
            data:''
        },
        videoImg: {
            changed:false,
            data:''
        },
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
        studentNum: 12,
        demoDay: {
            year: 0,
            month: 0,
            day: 0,
            hour: 0,
            minute: 0,
            gmt: 0
        },
        language: "English",
        changed:false
    }
};

const classPost = createReducer(initialState, builder => {
    builder
        .addCase(setPostVideo, (state, action) => {
            state.post.postVideo = action.payload;
        })
        .addCase(setPostTitle, (state, action) => {
            state.post.title = action.payload?.text
            state.post.changed=true;
        })
        .addCase(setPostDesc, (state, action) => {
            state.post.desc = action.payload?.text
            state.post.changed=true;
        })
        .addCase(setPostCourseToWho, (state, action) => {
            state.post.courseToWho = action.payload;
            state.post.changed=true;
        })
        .addCase(setPostReq, (state, action) => {
            state.post.req = action.payload;
            state.post.changed=true;
        })
        .addCase(setPostPrice, (state, action) => {
            state.post.price = action?.payload?.num;
            state.post.changed=true;
        })
        .addCase(setPostClassTime, (state, action) => {
            state.post.classTime = action.payload;
            state.post.changed=true;
        })
        .addCase(setPostVideImg, (state, action) => {
            state.post.videoImg = action.payload;
        })
        .addCase(setPostDemoDay, (state, action) => {
            state.post.demoDay = action.payload;
            state.post.changed=true;
        })
        .addCase(setPostLanguage, (state, action) => {
            state.post.language = action.payload;
            state.post.changed=true;
        })
        .addCase(setPostStudentNum, (state, action) => {
            state.post.studentNum = action.payload?.num;
            state.post.changed=true;
        })
        .addCase(setPost,(state,action)=>{
            state.post=action.payload;
        })
        .addDefaultCase(() => {
        });
});

export default classPost;
