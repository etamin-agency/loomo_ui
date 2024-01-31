import {useEffect, useState} from "react";
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

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [bio, setBio] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');

    useEffect(() => {
        const token = Cookie.get("access_token");
        const username = jwtDecode(token).sub;
        console.log("here--------------")
        settingService.getStudentProfile(username).then(data => {
            dispatch(setStudentProfile(data))
        });
        console.log(profile)
    }, []);

    useEffect(() => {
        setFirstName(profile?.firstName);
        setLastName(profile?.lastName);
        setUserName(profile?.userName);
        setBio(profile?.bio);
        setPhotoUrl(profile?.profilePictureUrl);
    }, [profile]);
    return (
        <div className="StudentProfilePage">
            <div className="student-wrapper">
                <img src={photoUrl==null||photoUrl===''?user_image:photoUrl} alt="user-image" className="user-image"/>
                <div className="student-name-wrapper">
                    <div className="student-username">{userName}</div>
                    <div className="student-name">{firstName + " " + lastName}</div>
                </div>
                <Link to="/account/settings">
                    <img src={settings_icon} alt="settings-icon" className="settings-icon"/>
                </Link>
            </div>
            <div className="student-bio">
                {bio}
            </div>
        </div>
    )
}
export default StudentProfilePage;