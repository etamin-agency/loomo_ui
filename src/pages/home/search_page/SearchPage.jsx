import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import searchService from "../../../services/searchService";

import Loading from "../../../components/loading/Loading";
import './SearchPage.scss'
const formatDateString = (dateString) => {
    return dateString.slice(0, 16);
};
const SearchPage = ({username}) => {
    const [searchParams] = useSearchParams();

    const queryParam = searchParams.get('query');

    const [page, setPage] = useState(0);
    const [posts, setPosts] = useState([]);
    const [totalNum, setTotalNum] = useState(0);
    const [loading, setLoading] = useState(true);
    const [visiblePosts, setVisiblePosts] = useState(15);

    const fetchData = async () => {
        try {
            const data = await searchService.searchPosts(queryParam, page);
            setTotalNum(data?.totalCount);
            setPosts(data?.posts);
            setLoading(false);
            console.log(data)
            
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
    }

    return (
        <div className="SearchPage">
            {loading && <Loading />}
            <div className="results-number">
                Number of Results: {totalNum}
            </div>
            <div className="post-wrapper">
                {posts?.slice(0, visiblePosts).map(post => (
                    <div className="post" key={post.id}>
                        
                        
                        <img className="post-image" src={`https://d37zebxsdrcn1w.cloudfront.net/${post?.imageId}`}
                        alt="post-image" />
                       
                        <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>   
                        <div className="post-text-group">
                            <div className="post-text">
                                <h3>{post?.title}</h3>
                                <p>{post?.price}$</p>
                            </div>
                            <div className="post-text-duration">
                            <p>Lessons | Class Duration {post?.duration} hours</p>
                            </div>
                            <p>Launch your career as an Android app developer. Build job-ready skills for an in-demand career and earn a credential from Meta. No degree or prior experience required to get started.Launch your career as an Android app developer. Build job-ready skills</p>
                            {/* //<div className="post-text1">{post?.desc}</div> */}
                            <div className="post-language">
                                <p className="post-language">{post?.language}</p>
                                <p>{post?.classTime}</p>
                                
                                
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
    )
}

export default SearchPage;
