import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import {lazy, Suspense} from "react";
import Cookie from "js-cookie";

import Spinner from "../spinner/Spinner";
import Page404 from "../error/Page404";

import './App.scss';



const HomePage = lazy(() => import("../../pages/home_page/HomePage"))
const LogInPage = lazy(() => import("../../pages/login_page/LogInPage"));
const SignUpPage = lazy(() => import("../../pages/signup_page/SignUpPage"));


function App() {
    const token = Cookie.get("token");

    return (
        <Router>
            <div className="App">
                <Suspense fallback={<Spinner/>}>
                    <Routes>
                        <Route path="/" element={<HomePage/>}/>
                        <Route path="/login" element={<LogInPage/>}/>
                        <Route path="/signup" element={<SignUpPage/>}/>
                        <Route path="*" element={<Page404/>}/>
                        <Route path="/dashboard" element={ <div>Yeaah Bithesssz!</div>  }/>
                    </Routes>


                </Suspense>
            </div>

        </Router>

    );
}

export default App;
