import {Outlet} from "react-router-dom";

const StudentDashboard = () => {
    return (
        <div>
            <div>
                List of shit in left Side
            </div>
            <Outlet/>
        </div>
    )
}
export default StudentDashboard;