import { Link } from "react-router-dom";

import "./SettingsSideBar.scss";

const SettingsSideBar = () => {
    const settingsPages = [
        {
            link: "edit",
            name: "Profile",
        },
        {
            link: 'security',
            name: 'Account Security'
        }
    ];
    return (
        <aside className="SettingsSideBar">
            <div className="dashboard-link">
                <Link to="/classes">
                    <div className="loomo">Loomo</div>
                </Link>
            </div>
            <div className="wrapper">
                {settingsPages.map(({ link, name }, id) => {
                    return (
                        <div className="setting-block" key={id}>
                            <Link to={`/account/${link}`} className="user-link">
                                <div>{name}</div>
                            </Link>
                        </div>
                    );
                })}
            </div>
        </aside>
    );
};

export default SettingsSideBar;
