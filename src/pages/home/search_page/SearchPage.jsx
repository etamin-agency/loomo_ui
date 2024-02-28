import {Link, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import searchService from "../../../services/searchService";

import Loading from "../../../components/loading/Loading";

import postService from "../../../services/postService";


import './SearchPage.scss'

const SearchPage = () => {
    const [searchParams] = useSearchParams();

    const queryParam = searchParams.get('query');

    const [page, setPage] = useState(0);
    const [posts, setPosts] = useState([]);
    const [totalNum, setTotalNum] = useState(0);
    const [loading, setLoading] = useState(true)

    const fetchData = async () => {
        try {
            const data = await searchService.searchPosts(queryParam, page);
            const posts = await Promise.all(data?.posts?.map(async (post) => {
                const file = await postService.getImage(post?.imageId);
                return {
                    ...post,
                    image: file
                };
            }));
            console.log(posts)
            setTotalNum(data?.totalCount);
            setPosts(posts);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching posts:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true)
        if (searchParams.get('page') != null || searchParams.get('page') > 0) {
            setPage(page);
        }
        fetchData();
    }, [page, queryParam])
    return (
        <div className="SearchPage">
            {loading && <Loading/>}
            <div className="results-number">
                Number of Results: {totalNum}
            </div>
            <div className="post-wrapper">
                {posts?.map(post => (

                    <div className="post" key={post.id}>
                        <Link to={`/post/${post.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <img className="post-image" src={`data:image/jpeg;base64, ${post?.image}`}
                                 alt="post-image"/>

                            <div className="post-text">{post?.title}</div>
                            <div className="post-wrapper">
                                <div className="post-language">{post?.language}</div>
                                <div className="post-price">{post?.price}$</div>
                            </div>
                        </Link>
                    </div>

                ))}
            </div>
        </div>
    )
}
export default SearchPage;