import { Outlet} from "react-router-dom";
import DashboardSidebar from "../../components/dashboar_sidebar/DashboardSidebar";

const StudentDashboard = () => {
    return (
        <div>
            <DashboardSidebar/>
            <Outlet/>
        </div>
    )
}
export default StudentDashboard;