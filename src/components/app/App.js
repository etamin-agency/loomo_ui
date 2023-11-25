 import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import {lazy, Suspense} from "react";

import Spinner from "../spinner/Spinner";
import Page404 from "../error/Page404";

import './App.scss';


const HomePage = lazy(() => import("../pages/home_page/HomePage"))
const LogInPage = lazy(() => import("../pages/login_page/LogInPage"));
const SignUpPage = lazy(() => import("../pages/signup_page/SignUpPage"));


function App() {


    return (
        <Router>
            <div className="App">
                <Suspense fallback={<Spinner/>}>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/login" element={<LogInPage/>}/>
                        <Route path="/signup" element={<SignUpPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                    </Routes>
                </Suspense>
            </div>
         </Router>

    );
}

export default App;
