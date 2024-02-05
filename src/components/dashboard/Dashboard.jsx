import { Outlet} from "react-router-dom";
import DashboardSidebar from "../dashboar_sidebar/DashboardSidebar";

const Dashboard = () => {
    return (
        <div>
            <DashboardSidebar/>
            <Outlet/>
        </div>
    )
}
export default Dashboard;