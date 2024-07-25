import {useEffect, useState} from "react";
import settingService from "../../../../services/settingService";
import {jwtDecode} from "jwt-decode";
import Cookie from "js-cookie";
import user_image from '../../../../assets/student_image.png';
import settings_icon from '../../../../assets/settings.png';
import {Link, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setStudentProfile} from "../../../../actions";
import camera_image from '../../../../assets/photo-camera.png'

import ProfilePictureUpload from "../../../../components/profile_puctire_upload/ProfilePictureUpload";

import "./StudentProfilePage.scss"
import Loading from "../../../../components/loading/Loading";


const StudentProfilePage = () => {
    const [showUploadView, setShowUploadView] = useState(false);
    let {userName} = useParams();
    const [isProfileOfOwner, setOwnerProfile] = useState(false);
    const [data,setData]=useState(null);
    const [loading,setLoading]=useState(true);

    useEffect(()=>{
        const token = Cookie.get("access_token");
        const accountUserName = jwtDecode(token).sub;
        if (accountUserName === userName) {
            setOwnerProfile(true)
        }
        settingService.getStudentProfile(userName).then(data => {
            const  obj= {
                firstName: data?.firstName,
                lastName: data?.lastName,
                userName: data?.userName,
                profilePicture: data?.profilePicture,
                bio: data?.bio
            }
            setData(obj)
            setLoading(false)
        });
    },[])



    const handleMouseOver = () => {
        if (isProfileOfOwner) {
            const cameraImage = document.querySelector(".camera-image");
            const userImage = document.querySelector(".user-image");
            const wrapper = document.querySelector(".user-image-container");
            if (cameraImage) {
                cameraImage.classList.add("show-image");
                userImage.classList.add("user-image-hover");
                wrapper.classList.add("wrapper-cursor");
            }
        }
    };
    const handleMouseOut = () => {
        if (isProfileOfOwner) {
            const cameraImage = document.querySelector(".camera-image");
            const userImage = document.querySelector(".user-image");
            const wrapper = document.querySelector(".user-image-container");
            if (cameraImage) {
                cameraImage.classList.remove("show-image");
                userImage.classList.remove("user-image-hover");
                wrapper.classList.remove("wrapper-cursor");
            }
        }
    };
    const handleContainerClick = () => {
        if (isProfileOfOwner) {
            setShowUploadView(!showUploadView);
        }
    };
    return (
        <div>
            {showUploadView && <ProfilePictureUpload setShowUploadView={setShowUploadView}/>}

            <div className="StudentProfilePage">
                {loading&&
                   <Loading/>}
                <div className="student-wrapper">
                    <div className="user-image-container"
                         onMouseOver={handleMouseOver}
                         onMouseOut={handleMouseOut}
                         onClick={handleContainerClick}
                    >
                        <img
                            src={data?.profilePicture == null || data?.profilePicture === '' ? user_image : `data:image/jpeg;base64,${data?.profilePicture}`}
                            alt="user-image" className={"user-image"}/>
                        <img src={camera_image} alt="camera-image" className={"camera-image"}/>
                    </div>
                    <div className="student-name-wrapper">
                        <div className="student-username">{data?.userName}</div>
                        <div className="student-name">{data?.firstName} {data?.lastName}</div>
                    </div>
                    {isProfileOfOwner &&
                        <Link to="/account/edit">
                            <img src={settings_icon} alt="settings-icon" className="settings-icon"/>
                        </Link>}
                </div>
                <div className="student-bio">
                    {data?.bio}
                </div>
            </div>
        </div>

    );
}
export default StudentProfilePage;