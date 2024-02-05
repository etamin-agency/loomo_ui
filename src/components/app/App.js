import {Route, BrowserRouter as Router, Routes, Link} from "react-router-dom";
import {lazy, Suspense, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../spinner/Spinner";
import Page404 from "../error/Page404";

import './App.scss';
import {jwtDecode} from "jwt-decode";
import Cookie from "js-cookie";
import {setStudent, setTeacher} from "../../actions";
import StudentProfilePage from "../../pages/user/student/student_profile_page/StudentProfilePage";
import StudentClassesPage from "../../pages/user/student/student_classes_page/StudentClassesPage";
import MessagingPage from "../../pages/user/student/messaging_page/MessagingPage";
import AssignmentsPage from "../../pages/user/teacher/assignments_page/AssignmentsPage";
import ArchivePage from "../../pages/user/student/archive_page/ArchivePage";
import TeacherStudioPage from "../../pages/user/teacher/teacher_studio_page/TeacherStudioPage";
import WalletPage from "../../pages/user/teacher/wallet_page/WalletPage";
import Dashboard from "../dashboard/Dashboard";
import ProfilePictureUpload from "../profile_puctire_upload/ProfilePictureUpload";
import SettingsPage from "../../pages/settings/settings_page/SettingsPage";
import AccountEditPage from "../../pages/settings/account_edit_page/AccountEditPage";

const HomePage = lazy(() => import("../../pages/home/home_page/HomePage"))
const LogInPage = lazy(() => import("../../pages/auth/login_page/LogInPage"));
const SignUpPage = lazy(() => import("../../pages/auth/signup_page/SignUpPage"));


function App() {
    const {role} = useSelector(state => state.role);
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
                        {role === "teacher" &&
                            <Route>
                                <Route path="/" element={<Dashboard/>}>
                                    <Route path="/classes" element={<StudentClassesPage/>}/>
                                    <Route path="/studio" element={<TeacherStudioPage/>}/>
                                    <Route path="/assignments" element={<AssignmentsPage/>}/>
                                    <Route path="/wallet" element={<WalletPage/>}/>
                                    <Route path="/teacher" element={<StudentProfilePage/>}/>
                                </Route>
                                <Route path="/account" element={<SettingsPage/>}>
                                    <Route path="/account/edit" element={<AccountEditPage/>}/>
                                </Route>
                            </Route>

                        }
                        {role === "student" &&
                            <Route>
                                <Route path="/" element={<Dashboard/>}>
                                    <Route path="/classes" element={<StudentClassesPage/>}/>
                                    <Route path="/messages" element={<MessagingPage/>}/>
                                    <Route path="/assignments" element={<AssignmentsPage/>}/>
                                    <Route path="/archive" element={<ArchivePage/>}/>
                                    <Route path="/student" element={<StudentProfilePage/>}/>
                                </Route>
                                <Route path="/account" element={<SettingsPage/>}>
                                    <Route path="/account/edit" element={<AccountEditPage/>}/>
                                </Route>
                            </Route>
                        }

                    </Routes>
                </Suspense>
            </div>

        </Router>

    );
}


export default App;
