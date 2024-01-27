import {Route, BrowserRouter as Router, Routes, Link} from "react-router-dom";
import {lazy, Suspense, useEffect} from "react";
import {connect, useDispatch, useSelector} from "react-redux";
import Spinner from "../spinner/Spinner";
import Page404 from "../error/Page404";
import loomo_home from "../../assets/loomo_home.png"

import './App.scss';
import {jwtDecode} from "jwt-decode";
import Cookie from "js-cookie";
import {setStudent, setTeacher} from "../../tmp/actions";


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
                <nav>
                    <Link to="/"> <img className={"loomo-home"} src={loomo_home} alt="loomo-home"/> </Link>
                </nav>
                <Suspense fallback={<Spinner/>}>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/login" element={<LogInPage/>}/>
                        <Route path="/signup" element={<SignUpPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                        <Route path="/dashboard" element={
                            <div className="role_text">hey:{role}</div>
                        }/>
                    </Routes>
                </Suspense>
            </div>

        </Router>

    );
}


export default App;
