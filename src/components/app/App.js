import './App.scss';
import HomePage from "../pages/home_page/HomePage";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import LogInPage from "../pages/login_page/LogInPage";
import SignUpPage from "../pages/signup_page/SignUpPage";

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/login" element={<LogInPage/>}/>
                    <Route path="/signup" element={<SignUpPage/>}/>
                </Routes>
            </div>
        </Router>

    );
}

export default App;
