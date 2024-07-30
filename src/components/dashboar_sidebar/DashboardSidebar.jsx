import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import Cookie from "js-cookie";
import {jwtDecode} from "jwt-decode";


import demoService from "../../services/demoService";


import class_logo from "../../assets/class-logo.png"
import message_logo from "../../assets/messages-logo.png"
import archive_logo from "../../assets/archive-logo.png"
import home_logo from "../../assets/home-page-logo.png"
import home_work_logo from "../../assets/homework-logo.png"
import user_logo from "../../assets/user-logo.png"
import studio_logo from "../../assets/studio-logo.png"
import wallet_logo from "../../assets/wallet-logo.png"
import demo_day from "../../assets/demo.png"


import "./DashboarSidebar.scss"


const DashboardSidebar = () => {
    const {role} = useSelector(state => state.role);
    const userName = useRef(jwtDecode(Cookie.get('access_token')).sub);
    const [isDemoLessons,setIsDemoLessons]=useState(false);
    const student = [
        {
            link: "classes",
            src: class_logo,
            alt: "class-logo",
            name: "Classes"
        },
        {
            link: "messages",
            src: message_logo,
            alt: "messages-logo",
            name: "Messages"
        },
        {
            link: "assignments",
            src: home_work_logo,
            alt: "homework-logo",
            name: "Assignments"
        },
        {
            link: "archive",
            src: archive_logo,
            alt: "archive-logo",
            name: "Archive"
        },

    ];

    const teacher = [
        {
            link: "classes",
            src: class_logo,
            alt: "class-logo",
            name: "Classes"
        },
        {
            link: "posts",
            src: studio_logo,
            alt: "studio-logo",
            name: "Posts"
        },
        {
            link: "assignments",
            src: home_work_logo,
            alt: "homework-logo",
            name: "Assignments"
        },
        {
            link: "wallet",
            src: wallet_logo,
            alt: "archive-logo",
            name: "Wallet"
        },

    ];
    useEffect(()=>{
        if (role==='student'){
           demoService.isStudentAttendingToAnyClass().then(data=>{
                setIsDemoLessons(data);
            });

        }

    },[])
    console.log(userName)
    return (
        <aside className="student-dashboard">
            <div className="home-link">
                <Link to="/">
                    <div className="loomo">Loomo</div>
                    <img className="student-logo home-logo" src={home_logo} alt="profile-picture"/>
                </Link>
            </div>
            <div className="wrapper">
                {(role === "student" && isDemoLessons) &&(
                    <div className="dashboard-block">
                        <Link to={`/class-demo`} className="student-link">
                            <img src={demo_day} className="student-logo" alt="demo-day"/>
                            <div>Demo Classes</div>
                        </Link>
                    </div>
                ) }
                {
                    role === "student" && student.map(({link, src, alt, name}, id) => {
                        return (
                            <div className="dashboard-block" key={id}>
                                <Link to={`/${link}`} className="student-link">
                                    <img src={src} className="student-logo" alt={alt}/>
                                    <div>{name}</div>
                                </Link>
                            </div>
                        )
                    })
                }
                {
                    role === "teacher" && teacher.map(({link, src, alt, name}, id) => {
                        return (
                            <div className="dashboard-block" key={id}>
                                <Link to={`/${link}`} className="student-link">
                                    <img src={src} className="student-logo" alt={alt}/>
                                    <div>{name}</div>
                                </Link>
                            </div>
                        )
                    })
                }

            </div>
            <div className="dashboard-block profile-link">
                <Link to={`${role === "teacher" ? "/teacher" : "/student"}/${userName.current}`} className="student-link">
                    <img src={user_logo} className="student-logo" alt="user-logo"/>
                    <div>Profile</div>
                </Link>
            </div>

        </aside>
    )
}

export default DashboardSidebar;


