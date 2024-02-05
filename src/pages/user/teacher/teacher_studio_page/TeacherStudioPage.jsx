import './TeacherStudioPage.scss'
import {Link} from "react-router-dom";

const TeacherStudioPage = () => {
    return (
        <div className="TeacherStudioPage">
                <div className="wrapper">
                    <Link to="/publish-class"  className="block-link">
                        <div className="block">Publish Class</div>
                    </Link>
                    <Link to="/student-demo"  className="block-link">
                        <div className="block">Demo with new Students</div>
                    </Link>
                </div>

        </div>
    )
}
export default TeacherStudioPage;