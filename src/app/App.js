import {Route, BrowserRouter as Router, Routes, Link} from "react-router-dom";
import {lazy, Suspense, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import Spinner from "../components/spinner/Spinner";
import Page404 from "../components/error/Page404";

import './App.scss';
import {jwtDecode} from "jwt-decode";
import Cookie from "js-cookie";
import {setStudent, setTeacher} from "../actions";
import StudentProfilePage from "../pages/user/student/student_profile_page/StudentProfilePage";
import StudentClassesPage from "../pages/user/student/student_classes_page/StudentClassesPage";
import MessagingPage from "../pages/user/student/messaging_page/MessagingPage";
import AssignmentsPage from "../pages/user/teacher/assignments_page/AssignmentsPage";
import ArchivePage from "../pages/user/student/archive_page/ArchivePage";
import TeacherStudioPage from "../pages/user/teacher/teacher_studio_page/TeacherStudioPage";
import WalletPage from "../pages/user/teacher/wallet_page/WalletPage";
import Dashboard from "../components/dashboard/Dashboard";
import SettingsPage from "../pages/settings/settings_page/SettingsPage";
import AccountEditPage from "../pages/settings/account_edit_page/AccountEditPage";
import LogoutComponent from "../components/logout/LogoutComponent";
import PublishPostPage from "../pages/user/teacher/publish_post_page/PublishPostPage";
import CreateEditPage from "../pages/user/teacher/create-edit_page/CreateEditPage";
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import SearchPage from "../pages/home/search_page/SearchPage";
import Loomo from "../assets/loomo.png";
import Post from "../pages/home/post_page/Post";
import StudentDemoClassPage from "../pages/user/student/student_demo_class_page/StudentDemoClassPage";
import TeacherDemoPage from "../pages/user/teacher/student_demo_page/TeacherDemoPage";
import DemoViewStudentPage from "../pages/user/teacher/student_demo_page/DemoViewStudentPage";
import DemoRoomPage from "../pages/user/teacher/room/DemoRoomPage";
import EditClassListPage from "../pages/user/teacher/edit_class_list_page/EditClassListPage";
import EditClassPage from "../pages/user/teacher/edit_class_page/EditClassPage";
import CreateEditPostPage from "../pages/user/teacher/create_edit_post_page/CreateEditPostPage";
import TeacherProfilePage from "../pages/user/teacher/teacher_profile_page/TeacherProfilePage";

const HomePage = lazy(() => import("../pages/home/home_page/HomePage"))
const LogInPage = lazy(() => import("../pages/auth/login_page/LogInPage"));
const SignUpPage = lazy(() => import("../pages/auth/signup_page/SignUpPage"));


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
                <Suspense fallback={<Spinner/>}>
                    <Routes>
                        <Route path="/" element={<HomePage/>}>
                            <Route path="/" element={<img src={Loomo} alt="loomo-img"/>}/>
                            <Route path="Post-page" element={ <CreateEditPostPage/>}/>
                            <Route path="/classes/search" element={<SearchPage/>}/>
                            <Route path="/post/:uuid" element={<Post/>}/>
                        </Route>
                        {
                            role !== '' &&
                            <Route>
                                <Route path="/logout" element={<LogoutComponent/>}/>
                                <Route path="/demo-room/:roomId" element={<DemoRoomPage/>}/>
                            </Route>
                        }
                        {
                            role === '' &&
                            <Route>
                                <Route path="/login" element={<LogInPage/>}/>
                                <Route path="/signup" element={<SignUpPage/>}/>
                            </Route>
                        }
                        {role === "teacher" &&
                            <Route>
                                <Route path="/" element={<Dashboard/>}>
                                    <Route path="/classes" element={<StudentClassesPage/>}/>
                                    <Route path="/studio" element={<TeacherStudioPage/>}/>
                                    <Route path="/assignments" element={<AssignmentsPage/>}/>
                                    <Route path="/wallet" element={<WalletPage/>}/>
                                    <Route path="/teacher-demo">
                                        <Route path="/teacher-demo" element={<TeacherDemoPage/>}/>
                                        <Route path="/teacher-demo/:postId" element={<DemoViewStudentPage/>}/>
                                    </Route>
                                    <Route path="/edit-class">
                                        <Route path="/edit-class" element={<EditClassListPage/>}/>
                                        <Route path="/edit-class/:classId" element={
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <EditClassPage/>
                                            </LocalizationProvider>
                                        }/>
                                    </Route>
                                    <Route path="/teacher/:userName" element={<TeacherProfilePage/>}/>
                                    <Route path="/student/:userName" element={<StudentProfilePage/>}/>
                                </Route>
                                <Route path="/account" element={<SettingsPage/>}>
                                    <Route path="/account/edit" element={<AccountEditPage/>}/>
                                </Route>
                                <Route path="/edit">
                                    <Route path="/edit/:postId" element={
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <CreateEditPostPage/>
                                        </LocalizationProvider>
                                    }/>
                                    <Route path="/edit" element={
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <CreateEditPostPage/>
                                        </LocalizationProvider>
                                    }/>

                                </Route>
                                <Route path="/publish-post" element={<PublishPostPage/>}/>
                            </Route>

                        }
                        {role === "student" &&
                            <Route>
                                <Route path="/" element={<Dashboard/>}>
                                    <Route path="/classes" element={<StudentClassesPage/>}/>
                                    <Route path="/messages" element={<MessagingPage/>}/>
                                    <Route path="/assignments" element={<AssignmentsPage/>}/>
                                    <Route path="/archive" element={<ArchivePage/>}/>
                                    <Route path="/class-demo" element={<StudentDemoClassPage/>}/>
                                    <Route path="/teacher/:userName" element={<TeacherProfilePage/>}/>
                                    <Route path="/student/:userName" element={<StudentProfilePage/>}/>
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
