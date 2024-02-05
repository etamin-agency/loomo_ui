import {Link} from "react-router-dom";

import './SettingsSideBar.scss'

const SettingsSideBar = () => {
    const settingsPages = [
        {
            link: "edit",
            name: "Edit Profile"
        },

    ];
    return (
        <aside className="SettingsSideBar">
            <div className="wrapper">
                {
                    settingsPages.map(({link, name}, id) => {
                        return (
                            <div className="dashboard-block" key={id}>
                                <Link to={`/account/${link}`} className="user-link">
                                    <div>{name}</div>
                                </Link>
                            </div>
                        )
                    })
                }
            </div>
        </aside>
    )
}

export default SettingsSideBar;


