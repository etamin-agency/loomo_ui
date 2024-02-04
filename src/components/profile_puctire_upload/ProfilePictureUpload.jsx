import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import Button from "react-bootstrap/Button";

import './ProfilePictureUpload.scss'
import settingService from "../../services/settingService";
import Cookie from "js-cookie";
import {jwtDecode} from "jwt-decode";
import user_image from "../../assets/student_image.png";
import {useDispatch, useSelector} from "react-redux";
import {setStudentProfile, setStudentProfileImage} from "../../actions";

const ProfilePictureUpload = (props) => {
    const {profile} = useSelector(state => state.profile);
    const dispatch = useDispatch();

    const [userImage, setUserImage] = useState(profile?.profilePicture == null || profile?.profilePicture === '' ? user_image : `data:image/jpeg;base64,${profile?.profilePicture}`);
    const [isButtonDisabled, setButtonDisabled] = useState(true);
    const [file, setFile] = useState();

    const onDrop = useCallback(acceptedFiles => {
        console.log(acceptedFiles)
        try {
            setFile(acceptedFiles[0])
            const reader = new FileReader();
            reader.readAsDataURL(acceptedFiles[0]);
            reader.onload = () => {
                setUserImage(reader.result);
                setButtonDisabled(false)
            };
        } catch (error) {
            console.error("Error reading file:", error);
        }
    }, []);

    const updateProfilePictureHandler = () => {
        const formData = new FormData();
        formData.append("file", file)
        const userName = jwtDecode(Cookie.get('access_token')).sub;
        settingService.updateProfileImage(userName, formData).then(data => {
            console.log(data)
        })
        props.setShowUploadView(false)
        dispatch(setStudentProfileImage(userImage))
    }
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
    return (
        <div className="some-name">
            <div className="ProfilePictureUpload">
                <img
                    src={userImage}
                    alt="user-image" className="user-image-icon"/>
                <div className="dropzone-block" {...getRootProps()} >
                    <input {...getInputProps()} />
                    {
                        isDragActive ?
                            <p>Drop the files here ...</p> :
                            <p>Drop file here, or click button</p>
                    }
                </div>
                <Button className="image-update-btn" disabled={isButtonDisabled}
                        onClick={updateProfilePictureHandler}>Update</Button>
                <div onClick={() => props.setShowUploadView(false)} className="btn-close close-button"></div>
            </div>
        </div>

    )
}


export default ProfilePictureUpload;