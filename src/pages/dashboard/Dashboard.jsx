import { Outlet} from "react-router-dom";
import DashboardSidebar from "../../components/dashboar_sidebar/DashboardSidebar";

const Dashboard = () => {
    return (
        <div>
            <DashboardSidebar/>
            <Outlet/>
        </div>
    )
}
export default Dashboard;