import {useEffect, useState} from "react";
import settingService from "../../services/settingService";
import {jwtDecode} from "jwt-decode";
import Cookie from "js-cookie";
import user_image from '../../assets/student_image.png';
import settings_icon from '../../assets/settings.png';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setStudentProfile} from "../../actions";
import camera_image from '../../assets/photo-camera.png'

import "./StudentProfilePage.scss"
import ProfilePictureUpload from "../../components/profile_puctire_upload/ProfilePictureUpload";


const StudentProfilePage = () => {
    const {profile} = useSelector(state => state.profile);
    const dispatch = useDispatch();
    const [showUploadView, setShowUploadView] = useState(false);

    useEffect(() => {
        const token = Cookie.get("access_token");
        const username = jwtDecode(token).sub;
        settingService.getStudentProfile(username).then(data => {
            console.log(data)
            dispatch(setStudentProfile(data))
        });
    }, [dispatch]);

    const handleMouseOver = () => {
        const cameraImage = document.querySelector(".camera-image");
        const userImage = document.querySelector(".user-image");
        const wrapper = document.querySelector(".user-image-container");
        if (cameraImage) {
            cameraImage.classList.add("show-image");
            userImage.classList.add("user-image-hover");
            wrapper.classList.add("wrapper-cursor");
        }
    };
    const handleMouseOut = () => {
        const cameraImage = document.querySelector(".camera-image");
        const userImage = document.querySelector(".user-image");
        const wrapper = document.querySelector(".user-image-container");
        if (cameraImage) {
            cameraImage.classList.remove("show-image");
            userImage.classList.remove("user-image-hover");
            wrapper.classList.remove("wrapper-cursor");
        }
    };

    const handleContainerClick = () => {
        setShowUploadView(!showUploadView);
    };
    return (
        <div>
            {showUploadView && <ProfilePictureUpload setShowUploadView={setShowUploadView}/>}
            <div className="StudentProfilePage">
                <div className="student-wrapper">
                    <div className="user-image-container"
                         onMouseOver={handleMouseOver}
                         onMouseOut={handleMouseOut}
                         onClick={handleContainerClick}
                    >
                        <img
                            src={profile?.profilePicture == null || profile?.profilePicture === '' ? user_image : `data:image/jpeg;base64,${profile?.profilePicture}`}
                            alt="user-image" className={"user-image"}/>
                        <img src={camera_image} alt="camera-image" className={"camera-image"}/>
                    </div>
                    <div className="student-name-wrapper">
                        <div className="student-username">{profile?.userName}</div>
                        <div className="student-name">{profile?.firstName} {profile?.lastName}</div>
                    </div>
                    <Link to="/account/settings">
                        <img src={settings_icon} alt="settings-icon" className="settings-icon"/>
                    </Link>
                </div>
                <div className="student-bio">
                    {profile?.bio}
                </div>
            </div>
        </div>

    );
}
export default StudentProfilePage;