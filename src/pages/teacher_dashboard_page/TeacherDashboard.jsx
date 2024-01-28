import { Outlet} from "react-router-dom";
import DashboardSidebar from "../../components/dashboar_sidebar/DashboardSidebar";

const TeacherDashboard = () => {
    return (
        <div>
            <DashboardSidebar/>
            <Outlet/>
        </div>
    )
}
export default TeacherDashboard;