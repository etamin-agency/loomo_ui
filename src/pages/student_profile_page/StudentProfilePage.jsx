import {useEffect} from "react";
import settingService from "../../services/settingService";
import {jwtDecode} from "jwt-decode";
import Cookie from "js-cookie";
import user_image from '../../assets/student_image.png';
import settings_icon from '../../assets/settings.png';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {setStudentProfile} from "../../actions";

import "./StudentProfilePage.scss"


const StudentProfilePage = () => {
    const {profile} = useSelector(state => state.profile);
    const dispatch = useDispatch();

    useEffect(() => {
        const token = Cookie.get("access_token");
        const username = jwtDecode(token).sub;
        console.log('---------------')
        console.log(username)
        settingService.getStudentProfile(username).then(data => {
            console.log(data)
            dispatch(setStudentProfile(data))
        });
    }, [dispatch]);


    return (
        <div className="StudentProfilePage">
            <div className="student-wrapper">
                <img
                    src={profile?.profilePictureUrl == null || profile?.profilePictureUrl === '' ? user_image : profile?.profilePictureUrl}
                    alt="user-image" className="user-image"/>
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
    );
}
export default StudentProfilePage;