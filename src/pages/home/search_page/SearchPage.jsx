import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import searchService from "../../../services/searchService";
import teacher_icon from "../../../assets/teacher-icon.png"

import rank from "../../../assets/rank.png";
import Loading from "../../../components/loading/Loading";
import { calculateDaysBetween, convertMinutesToHours,formatDateTime} from "../../../utils/helper/math"; // Update path if necessary
import './SearchPage.scss';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const queryParam = searchParams.get('query');

    const [page, setPage] = useState(0);
    const [posts, setPosts] = useState([]);
    const [totalNum, setTotalNum] = useState(0);
    const [loading, setLoading] = useState(true);
    const [visiblePosts, setVisiblePosts] = useState(15);

    const staticEndDate = "2024-10-31"; // Define the static end date here

    const fetchData = async () => {
        try {
            const data = await searchService.searchPosts(queryParam, page);
            setTotalNum(data?.totalCount);
            setPosts(data?.posts);
            setLoading(false);
            console.log(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        if (searchParams.get('page') != null || searchParams.get('page') > 0) {
            setPage(page);
        }
        fetchData();
    }, [page, queryParam]);

    const showMorePosts = () => {
        setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 15);
    };

    return (
        <div className="SearchPage">
            {loading && <Loading />}
            <div className="results-number">
                Number of Results: {totalNum}
            </div>
            <div className="post-wrapper">
                {posts?.slice(0, visiblePosts).map(post => (
                    <div className="post" key={post.id}>
                        <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <img className="post-image" src={`https://d37zebxsdrcn1w.cloudfront.net/${post?.imageId}`}
                                alt="post-image" />
                        </Link>
                        <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <div className="post-text-group">
                                <div className="post-text">
                                    <h3>{post?.title}</h3>
                                    <p>{post?.price}$</p>
                                </div>
                                <div className="post-text-duration">
                                    <p>{calculateDaysBetween(post?.classStartDate, staticEndDate)} Lessons | Class Duration: {convertMinutesToHours(post?.duration)}</p>
                                </div>
                                <p className="post-text-description">{post?.description}</p>

                                <div className="post-language">
                                    <div className="post-text-rank">
                                        <img src={rank} alt="ranking" />
                                    </div>
                                    <p>Starts: {formatDateTime(post?.classStartDate)}</p> {/* Format the start date and time */}
                                    <div className="post-teacher-profile">
                                        <div className="teacher-name">
                                            <h5>Andrew Hate</h5>
                                            <p>Software Engineer</p>
                                        </div>
                                        <img src={teacher_icon} alt="teacher"/>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
            {visiblePosts < posts.length && (
                <button className="show-more-button" onClick={showMorePosts}>
                    Show More
                </button>
            )}
        </div>
    );
};

export default SearchPage;