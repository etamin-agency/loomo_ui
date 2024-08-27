import {Link, Outlet} from "react-router-dom";
import SettingsSideBar from "../../../components/settings_sidebar/SettingsSideBar";

import './SettingsPage.scss'

const SettingsPage = () => {

    return (
        <div className="SettingsPage">
            <SettingsSideBar/>
            <Outlet/>
        </div>
    )

}

export default SettingsPage;