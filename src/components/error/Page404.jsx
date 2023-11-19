import error from "../../assets/error.gif";

import './Page404.css';
const Page404 = () => {
    return (
        <div className="error_404" >
            <img src={error} alt="error_gif" />
            <div className="error_text"> Page Not Found 404</div>
        </div>
    )
}
export default Page404;