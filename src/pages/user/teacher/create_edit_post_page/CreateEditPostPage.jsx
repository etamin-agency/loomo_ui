import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
    Box,
    Button,
    FormControlLabel,
    Switch,
    TextField,
    Typography,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player";
import DeleteIcon from "@mui/icons-material/Delete";

import PostLanguage from "../../../../components/edit_post_page_items/PostLanguage";
import CourseDuration from "../../../../components/edit_post_page_items/CourseDuration";
import Requirements from "../../../../components/edit_post_page_items/Requirements";
import CourseForm from "../../../../components/edit_post_page_items/CourseToWho";
import TagsInput from "../../../../components/edit_post_page_items/Tags";
import RoadmapToggle from "../../../../components/edit_post_page_items/Roadmap";
import Duration from "../../../../components/edit_post_page_items/Duration";
import Students from "../../../../components/edit_post_page_items/Students";
import DemoDay from "../../../../components/edit_post_page_items/Demoday";
import CourseSchedule from "../../../../components/edit_post_page_items/CourseSchedule";
import ClassPrice from "../../../../components/edit_post_page_items/ClassPrice";
import Loading from "../../../../components/loading/Loading";

import video_icon from "../../../../assets/video-icon.png";
import image_icon from "../../../../assets/image-icon.png";

import publishService from "../../../../services/publishService";
import {
    isValidUUID,
    validateField,
} from "../../../../utils/helper/validation";

import "./CreateEditPostPage.scss";

const CreateEditPostPage = () => {
    const { postId } = useParams();
    const navigate = useNavigate();

    const [isPrivate, setIsPrivate] = useState(false);

    const handleSwitchChange = (event) => {
        const { name, checked } = event.target;
        setIsPrivate(event.target.checked);
        setFormData((prevState) => ({
            ...prevState,
            [name]: checked,
        }));

        setChanged(true);
    };

    const [formData, setFormData] = useState({
        title: "",
        desc: "",
        price: "",
        language: "",
        req: [{ id: Date.now(), value: "", error: false }],
        numberOfStudents: 10,
        duration: { startDate: "", endDate: "" },
        days: [],
        courseToWho: [{ id: Date.now(), value: "", error: false }],
        demoDate: "",
        classTime: "",
        classDuration: 90,
        tags: [],
        courseRoadMap: [],
        isCourseRoadMapExists: false,
        isClassPrivate: false,
    });

    const [image, setImage] = useState("");
    const [imageFile, setImageFile] = useState(null);
    const [video, setVideo] = useState("");
    const [videoFile, setVideoFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isChanged, setChanged] = useState(false);
    const [errors, setErrors] = useState({
        title: "",
        desc: "",
        language: "",
        price: "",
        tags: "",
        video: "",
        image: ''
    });

    useEffect(() => {
        if (postId && isValidUUID(postId)) {
            publishService
                .getPostData(postId)
                .then((data) => {
                    console.log(data);
                    setFormData((prevState) => ({
                        ...prevState,
                        title: data.title,
                        desc: data.description,
                        price: data.price,
                        language: data.language,
                        req: data.requirements.map((item, index) => ({
                            id: index,
                            value: item,
                            error: false,
                        })),
                        numberOfStudents: data.maxStudents,
                        duration: {
                            startDate: data.classStartDate,
                            endDate: data.classEndDate,
                        },
                        days: data.classDays,
                        courseToWho: data.courseTarget.map((item, index) => ({
                            id: index,
                            value: item,
                            error: false,
                        })),
                        demoDate: data.demoTime,
                        classTime: data.classTime,
                        tags: data.tags ? data.tags : [],
                        courseRoadMap: data.roadmapPresent ? data.roadmap : [],
                        isCourseRoadMapExists: data.roadmapPresent,
                        isClassPrivate: data?.private,
                        classDuration: data?.duration,
                    }));
                    setImage(
                        // `https://d37zebxsdrcn1w.cloudfront.net/${data.introVideoImgLink}`
                        `https://post-images-loomo.s3.eu-north-1.amazonaws.com/${data.introVideoImgLink}`
                    );
                    setVideo(
                        // `https://d1kcxr0k66kiti.cloudfront.net/${data.introVideoLink}`
                        `https://post-videos-loomo.s3.eu-north-1.amazonaws.com/${data.introVideoLink}`
                    );
                })
                .catch(() => {
                    navigate("/");
                })
                .finally(() => {
                    setLoading(false);
                });
        } else {
            setChanged(true);
            setLoading(false);
        }
    }, [postId, navigate]);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (isChanged) {
                const message =
                    "You have unsaved changes. Are you sure you want to leave?";
                event.returnValue = message;
                return message;
            }
        };

        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, [isChanged]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
        setChanged(true);
        validateField(name, value, setErrors);
    };

    const onDropVideo = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file || !file.type.startsWith("video/")) {
            console.error("File is not a video.");
            return;
        }

        const sizeInMB = (file.size / 1024 / 1024).toFixed(2);
        console.log("Video file type:", file.type);
        console.log("Video file size:", sizeInMB, "MB");

        setVideoFile(file);
        setErrors((prevState) => ({
            ...prevState,
            "video": video,
        }));
        const reader = new FileReader();
        reader.onload = () => {
            setVideo(reader.result);
            setChanged(true);
        };
        reader.readAsDataURL(file);
    }, []);

    const onDropImage = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (!file || !file.type.startsWith("image/")) {
            console.error("File is not an image.");
            return;
        }
        setImageFile(file);
        setErrors((prevState) => ({
            ...prevState,
            "image": image,
        }));
        const reader = new FileReader();
        reader.onload = () => {
            setImage(reader.result);
            setChanged(true);
        };
        reader.readAsDataURL(file);
    }, []);

    const {
        getRootProps: getRootPropsForVideo,
        getInputProps: getInputPropsForVideo,
    } = useDropzone({
        onDrop: onDropVideo,
        accept: "video/*",
    });

    const {
        getRootProps: getRootPropsForImage,
        getInputProps: getInputPropsForImage,
    } = useDropzone({
        onDrop: onDropImage,
        accept: "image/*",
    });

    const handleDelete = (mediaSetter, fileSetter) => {
        mediaSetter("");
        fileSetter(null);
        setChanged(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        validateField("title", formData.title, setErrors);
        validateField("desc", formData.desc, setErrors);
        validateField("language", formData.language, setErrors);
        validateField("price", formData.price, setErrors);
        validateField("tags", formData.tags, setErrors);

        validateField("video", videoFile, setErrors);
        validateField("image", imageFile, setErrors);

        if (Object.values(errors).some((error) => error !== "")) {
            console.error(
                "Form has errors. Please correct them before submitting."
            );
            return;
        }

        setLoading(true);
        const submitData = new FormData();
        if (imageFile) submitData.append("photoFile", imageFile);
        if (videoFile) submitData.append("videoFile", videoFile);
        // Object.keys(formData).forEach(key => {
        //     if (typeof formData[key] === 'object' && !Array.isArray(formData[key])) {
        //         submitData.append(key, JSON.stringify(formData[key]));
        // } else {
        const obj = {
            title: formData.title,
            description: formData.desc,
            courseTarget: formData.courseToWho.map((data) => data.value),
            requirements: formData.req.map((data) => data.value),
            language: formData.language,
            price: formData.price,
            maxStudents: formData.numberOfStudents,
            demoTime: formData.demoDate,
            classDays: formData.days,
            classTime: formData.classTime,
            classStartDate: formData.duration.startDate,
            classEndDate: formData.duration.endDate,
            tags: formData.tags,
            roadmap: formData.courseRoadMap,
            duration: formData.classDuration,
            isPrivate: isPrivate,
            isRoadmapPresent: !!formData.courseRoadMap,
        };
        submitData.append("classDto", JSON.stringify(obj));

        try {
            if (postId && isValidUUID(postId)) {
                await publishService
                    .editPost(postId, submitData)
                    .then((data) => {
                        if (data) {
                            setLoading(false);
                            navigate("/posts");
                        }
                    });
            } else {
                await publishService.createPost(submitData).then((data) => {
                    if (data) {
                        setLoading(false);
                        navigate("/posts");
                    }
                });
            }
        } catch (error) {
            console.error("Error submitting post:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <Loading />;
    }
    return (
        <div className="CreateEditPostPage">
            <Link to="/posts">
                <div className="publish-post-link">Loomo</div>
            </Link>
            <form onSubmit={handleSubmit}>
                <div className="edit-post-container">
                    <div className="post-media-wrapper">
                        {video ? (
                            <div className="player-wrapper">
                                <ReactPlayer
                                    width="100%"
                                    height="100%"
                                    url={video}
                                    controls
                                    className="react-player"
                                    config={{
                                        file: {
                                            attributes: {
                                                controlsList: "nodownload",
                                            },
                                        },
                                    }}
                                />
                                <div
                                    onClick={() =>
                                        handleDelete(setVideo, setVideoFile)
                                    }
                                    className="trash-icon"
                                >
                                    <DeleteIcon />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div
                                    className={`media-block ${
                                        errors.video ? "error" : ""
                                    } `}
                                >
                                    <div
                                        className="dropzone-video"
                                        {...getRootPropsForVideo()}
                                    >
                                        <input {...getInputPropsForVideo()} />
                                        <div className="media-icons-wrapper">
                                            <img
                                                className="center-icon"
                                                src={video_icon}
                                                alt="video-icon"
                                            />
                                        </div>
                                        <div className="upload-media-text">
                                            Drag and drop your Introduction
                                            Video
                                        </div>
                                        <div className="upload-media-subtext">
                                            or press Button
                                        </div>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                        >
                                            Select Video
                                        </Button>
                                    </div>
                                </div>
                                {errors.video && (
                                    <Typography color="error" variant="danger">
                                        {errors.video}
                                    </Typography>
                                )}
                            </div>
                        )}
                        {image ? (
                            <div className="image-wrapper">
                                <img
                                    className="post-image"
                                    src={image}
                                    alt="course"
                                />
                                <div
                                    onClick={() =>
                                        handleDelete(setImage, setImageFile)
                                    }
                                    className="trash-icon"
                                >
                                    <DeleteIcon />
                                </div>
                            </div>
                        ) : (
                            <div>
                                <div
                                    className={`media-block ${
                                        errors.image ? "error" : ""
                                    } `}
                                >
                                    <div
                                        className="dropzone-image"
                                        {...getRootPropsForImage()}
                                    >
                                        <input {...getInputPropsForImage()} />
                                        <div className="media-icons-wrapper">
                                            <img
                                                className="center-icon"
                                                src={image_icon}
                                                alt="icon"
                                            />
                                        </div>
                                        <div className="upload-media-text">
                                            Drag and drop your Course Image
                                        </div>
                                        <div className="upload-media-subtext">
                                            or press Button
                                        </div>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                        >
                                            Select Image
                                        </Button>
                                    </div>
                                </div>
                                {errors.image && (
                                    <Typography color="error" variant="danger">
                                        {errors.image}
                                    </Typography>
                                )}
                            </div>
                        )}
                    </div>
                    <div className="post-input-wrapper">
                        <Typography variant="h6">Title </Typography>
                        <TextField
                            fullWidth
                            label="Title"
                            size="small"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            error={!!errors.title}
                            helperText={errors.title}
                            margin="normal"
                        />
                        <Typography variant="h6">Description </Typography>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Description"
                            name="desc"
                            value={formData.desc}
                            onChange={handleInputChange}
                            error={!!errors.desc}
                            helperText={errors.desc}
                            margin="normal"
                        />
                        <Typography variant="h6">Languages </Typography>
                        <PostLanguage
                            language={formData.language}
                            name="language"
                            setter={(lang) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    language: lang,
                                }));
                                setChanged(true);
                                validateField("language", lang, setErrors);
                            }}
                            error={!!errors.language}
                            helperText={errors.language}
                        />
                        <Typography variant="h6">Course Duration </Typography>
                        <CourseDuration
                            duration={formData.duration}
                            setter={(duration) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    duration,
                                }));
                                setChanged(true);
                            }}
                        />
                        <Typography variant="h6">Course Schedule </Typography>
                        <CourseSchedule
                            days={formData.days}
                            setDays={(days) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    days,
                                }));
                                setChanged(true);
                            }}
                            classTime={formData.classTime}
                            setClassTime={(time) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    classTime: time,
                                }));
                                setChanged(true);
                            }}
                        />
                        <Typography variant="h6">Price</Typography>
                        <ClassPrice
                            price={formData.price}
                            setPrice={(price) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    price,
                                }));
                                setChanged(true);
                                validateField("price", price, setErrors);
                            }}
                            error={!!errors.price}
                            helperText={errors.price}
                        />
                        <Typography variant="h6">Duration</Typography>
                        <Duration
                            duration={formData.classDuration}
                            setDuration={(duration) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    classDuration: duration,
                                }));
                                setChanged(true);
                            }}
                        />
                        <Typography variant="h6">Students</Typography>
                        <Students
                            numberOfStudents={formData.numberOfStudents}
                            setNumberOfStudents={(num) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    numberOfStudents: num,
                                }));
                                setChanged(true);
                            }}
                        />
                        <Typography variant="h6">Demo Day</Typography>

                        <DemoDay
                            demoDate={formData.demoDate}
                            setDemoDate={(date) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    demoDate: date,
                                }));
                                setChanged(true);
                            }}
                            startDate={formData.duration.startDate}
                        />
                    </div>
                    <div className="post-form-Wrapper">
                        <Typography variant="h6">Course to who:</Typography>
                        <CourseForm
                            courseToWho={formData.courseToWho}
                            setCourseToWho={(targets) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    courseToWho: targets,
                                }));
                                setChanged(true);
                            }}
                        />
                        <Typography variant="h6">Requirements:</Typography>
                        <Requirements
                            requirements={formData.req}
                            setRequirements={(reqs) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    req: reqs,
                                }));
                                setChanged(true);
                            }}
                        />
                        <RoadmapToggle
                            isCourseRoadMapExists={
                                formData.isCourseRoadMapExists
                            }
                            courseRoadMap={formData.courseRoadMap}
                            setIsCourseRoadMapExists={(exists) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    isCourseRoadMapExists: exists,
                                }));
                                setChanged(true);
                            }}
                            setCourseRoadMap={(roadmap) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    courseRoadMap: roadmap,
                                }));
                                setChanged(true);
                            }}
                        />
                        <Typography variant="h6">Tags</Typography>
                        <TagsInput
                            tags={formData.tags}
                            setTags={(tags) => {
                                setFormData((prevState) => ({
                                    ...prevState,
                                    tags,
                                }));
                                setChanged(true);
                                validateField("tags", tags, setErrors);
                            }}
                        />
                        <Box display="flex" flexDirection="column">
                            <FormControlLabel
                                label="Private"
                                labelPlacement="start"
                                control={
                                    <Switch
                                        name="isClassPrivate"
                                        checked={formData.isClassPrivate}
                                        onChange={handleSwitchChange}
                                        color="primary"
                                    />
                                }
                            />
                            <Box
                                display="flex"
                                justifyContent="flex-end"
                                gap={3}
                            >
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => navigate("/posts")}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    sx={{ padding: "5px 30px" }}
                                    disabled={
                                        !isChanged ||
                                        Object.values(errors).some(
                                            (error) => error !== ""
                                        )
                                    }
                                >
                                    Save
                                </Button>
                            </Box>
                        </Box>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateEditPostPage;
