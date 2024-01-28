import {Route, BrowserRouter as Router, Routes, Link} from "react-router-dom";
import {lazy, Suspense, useEffect} from "react";
import { useDispatch, useSelector} from "react-redux";
import Spinner from "../spinner/Spinner";
import Page404 from "../error/Page404";

import './App.scss';
import {jwtDecode} from "jwt-decode";
import Cookie from "js-cookie";
import {setStudent, setTeacher} from "../../tmp/actions";
import StudentDashboard from "../../pages/student_dashboard_page/StudentDashboard";
import StudentProfilePage from "../../pages/student_profile_page/StudentProfilePage";
import StudentClassesPage from "../../pages/student_classes_page/StudentClassesPage";
import MessagingPage from "../../pages/messaging_page/MessagingPage";
import AssignmentsPage from "../../pages/assignments_page/AssignmentsPage";
import ArchivePage from "../../pages/archive_page/ArchivePage";
import TeacherDashboard from "../../pages/teacher_dashboard_page/TeacherDashboard";

const HomePage = lazy(() => import("../../pages/home_page/HomePage"))
const LogInPage = lazy(() => import("../../pages/login_page/LogInPage"));
const SignUpPage = lazy(() => import("../../pages/signup_page/SignUpPage"));


function App() {
    const role = useSelector(state => state.role);
    const dispatch = useDispatch();
    useEffect(() => {
        const token = Cookie.get("access_token");
        if (token != null) {
            const tokeRole = jwtDecode(token)?.role;
            switch (tokeRole) {
                case "TEACHER":
                    dispatch(setTeacher());
                    break;
                case "STUDENT":
                    dispatch(setStudent());
                    break;
            }
        }

    }, [])
    return (
        <Router>
            <div className="App">
                {/*<nav>*/}
                {/*    <Link to="/"> <img className={"loomo-home"} src={loomo_home} alt="loomo-home"/> </Link>*/}
                {/*</nav>*/}
                <Suspense fallback={<Spinner/>}>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        {
                            role === '' &&
                            <Route>
                                <Route path="/login" element={<LogInPage/>}/>
                                <Route path="/signup" element={<SignUpPage/>}/>
                            </Route>
                        }
                        <Route path="*" element={<Page404/>}/>
                        {role === "TEACHER" &&
                            <Route path="/" element={<TeacherDashboard/>}>
                                <Route path="/classes" element={<StudentClassesPage/>}/>
                                <Route path="/studio" element={<MessagingPage/>}/>
                                <Route path="/assignments" element={<AssignmentsPage/>}/>
                                <Route path="/wallet" element={<ArchivePage/>}/>
                                <Route path="/teacher" element={<StudentProfilePage/>}/>
                            </Route>
                        }
                        {role === "STUDENT" &&
                            <Route path="/" element={<StudentDashboard/>}>
                                <Route path="/classes" element={<StudentClassesPage/>}/>
                                <Route path="/messages" element={<MessagingPage/>}/>
                                <Route path="/assignments" element={<AssignmentsPage/>}/>
                                <Route path="/archive" element={<ArchivePage/>}/>
                                <Route path="/student" element={<StudentProfilePage/>}/>
                            </Route>
                        }

                    </Routes>
                </Suspense>
            </div>

        </Router>

    )
        ;
}


export default App;
