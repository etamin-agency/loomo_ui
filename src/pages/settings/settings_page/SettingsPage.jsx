import {Link, Outlet} from "react-router-dom";
import SettingsSideBar from "../../../components/settings_sidebar/SettingsSideBar";

import './SettingsPage.scss'

const SettingsPage = () => {

    return (
        <div className="SettingsPage">
            <div className="settings-page-header"></div>
            <div className="dashboard-link">
                <Link to="/classes">
                    <div className="loomo">Loomo</div>
                </Link>
            </div>
            <SettingsSideBar/>
            <Outlet/>
        </div>
    )

}

export default SettingsPage;