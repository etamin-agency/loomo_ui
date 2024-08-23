import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import Button from "react-bootstrap/Button";
import "./ProfilePictureUpload.scss";
import settingService from "../../services/settingService";
import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import user_image from "../../assets/student_image.png";
import { useDispatch } from "react-redux";
import { setProfileImage } from "../../actions";
import Loading from "../loading/Loading";

const ProfilePictureUpload = ({ setShowUploadView, onProfileUpdate }) => {
    const dispatch = useDispatch();
    const [userImage, setUserImage] = useState(user_image);
    const [isButtonDisabled, setButtonDisabled] = useState(true);
    const [file, setFile] = useState();
    const [loading, setLoading] = useState(false);

    const onDrop = useCallback((acceptedFiles) => {
        try {
            setFile(acceptedFiles[0]);
            const reader = new FileReader();
            reader.readAsDataURL(acceptedFiles[0]);
            reader.onload = () => {
                setUserImage(reader.result);
                setButtonDisabled(false);
            };
        } catch (error) {
            console.error("Error reading file:", error);
        }
    }, []);

    const updateProfilePictureHandler = async () => {
        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);
        const userName = jwtDecode(Cookie.get("access_token")).sub;
        await settingService
            .updateProfileImage(userName, formData)
            .catch((err) => console.log(err));
        setShowUploadView(false);
        await settingService.getUserProfileImage(userName).then((data) => {
            dispatch(setProfileImage(data));
            setLoading(false);
            onProfileUpdate(); // Call the callback to refresh profile data
        });
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
    });

    return (
        <div className="profile-picture-container">
            <div className="ProfilePictureUpload">
                {loading && <Loading />}
                <img
                    src={userImage}
                    alt="user-image"
                    className="user-image-icon"
                />
                <div className="dropzone-block" {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <p>Drop the files here ...</p>
                    ) : (
                        <p>Drop file here, or click button</p>
                    )}
                </div>
                <Button
                    className="image-update-btn"
                    disabled={isButtonDisabled}
                    onClick={updateProfilePictureHandler}
                >
                    Update
                </Button>
                <div
                    onClick={() => setShowUploadView(false)}
                    className="btn-close close-button"
                ></div>
            </div>
        </div>
    );
};

export default ProfilePictureUpload;
