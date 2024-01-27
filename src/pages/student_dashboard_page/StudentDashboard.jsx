import {Link, Outlet} from "react-router-dom";

const StudentDashboard = () => {
    return (
        <div>

            <aside>
                <Link to="/classes"><div>Classes</div></Link>
                <Link to="/messages"><div>Messages</div></Link>
                <Link to="/assignments"><div>Assignments</div></Link>
                <Link to="/archive"><div>Classes</div></Link>
            </aside>
            <Link to="/"><div>Profile</div></Link>

            <Outlet/>
        </div>
    )
}
export default StudentDashboard;