import {createAction} from "@reduxjs/toolkit";

export const setTeacher = createAction("SET_TEACHER_ROLE");
export const setStudent = createAction("SET_STUDENT_ROLE");

export const setStudentProfile = createAction("SET_STUDENT_PROFILE");
export const setStudentProfileImage = createAction("SET_STUDENT_PROFILE_IMAGE");
export const setPostVideo = createAction("SET_POST_VIDEO");
export const setPostTitle = createAction("SET_POST_TITLE");
export const setPostDesc = createAction("SET_POST_DESCRIPTION");
export const setPostCourseToWho = createAction("SET_POST_COURSE_TARGET_AUDIENCE");
export const setPostReq = createAction("SET_POST_REQUIREMENTS");
export const setPostPrice = createAction("SET_POST_PRICE");
export const setPostClassTime = createAction("SET_POST_CLASS_TIME");
export const setPostVideImg = createAction("SET_POST_VIDEO_IMAGE");
export const setPostStudentNum = createAction("SET_POST_STUDENT_NUMBER");
export const setPostDemoDay = createAction("SET_POST_DEMO_DAY");
export const setPostLanguage = createAction("SET_POST_LANGUAGE");
export const setPost = createAction("SET_POST");