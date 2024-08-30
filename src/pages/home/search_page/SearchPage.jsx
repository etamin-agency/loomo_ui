import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import searchService from "../../../services/searchService";
import teacher_icon from "../../../assets/teacher-icon.png";
import FilterComponent from "../../../components/filter";
import Loading from "../../../components/loading/Loading";
import { calculateDaysBetween, convertMinutesToHours, formatDateTime } from "../../../utils/helper/math";
import './SearchPage.scss';
import { Helmet } from "react-helmet-async";

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const queryParam = searchParams.get('query');
    const [isFilterVisible, setIsFilterVisible] = useState(true);
    const [page, setPage] = useState(0);
    const [posts, setPosts] = useState([]);
    const [totalNum, setTotalNum] = useState(0);
    const [loading, setLoading] = useState(true);
    const [visiblePosts, setVisiblePosts] = useState(15);
    const [sortOrder, setSortOrder] = useState('');

    const staticEndDate = "2024-10-31";

    const [filters, setFilters] = useState({
        language: [],
        price: [],
        duration: []
    });
    const toggleFilterVisibility = () => {
        setIsFilterVisible(!isFilterVisible);
    };
    const fetchData = async () => {
        try {
            setLoading(true);
            let data;

            if (Object.keys(filters).some(key => filters[key].length)) {
                data = await searchService.applyFilters(queryParam, page, filters, sortOrder);
            } else {
                data = await searchService.searchPosts(queryParam, page);
            }

            // Frontend sorting for price if backend does not support it
            if (sortOrder === 'price-low') {
                data.posts.sort((a, b) => a.price - b.price);
            } else if (sortOrder === 'price-high') {
                data.posts.sort((a, b) => b.price - a.price);
            } else if (sortOrder === 'language-asc') {
                data.posts.sort((a, b) => a.language.localeCompare(b.language));
            } else if (sortOrder === 'language-desc') {
                data.posts.sort((a, b) => b.language.localeCompare(a.language));
            }

            setTotalNum(data?.totalCount);
            setPosts(data?.posts);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching posts:", error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, queryParam, filters, sortOrder]);

    const showMorePosts = () => {
        setVisiblePosts(prevVisiblePosts => prevVisiblePosts + 15);
    };

    const handleFilterChange = (filterType, selectedValues) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: selectedValues
        }));
    };

    const handleSortChange = (event) => {
        setSortOrder(event.target.value);
    };

    return (
        <div className="SearchPage">
            {loading && <Loading />}
            <Helmet>
                <title>This is Search Page</title>
            </Helmet>
            <div className="Result">
                <div className="results-number">
                    Number of Results: {totalNum}
                </div>
                <div className="filter-section">
                    <div className="filter-header">
                        <button
                            className="filter-button"
                            onClick={toggleFilterVisibility}
                        >
                            Filter
                        </button>
                        <div className="sort-by">
                            <label>Sort by</label>
                            <select
                                onChange={handleSortChange}
                                value={sortOrder}
                            >
                                <option value="">Default</option>
                                <option value="price-low">
                                    Price: Low to High
                                </option>
                                <option value="price-high">
                                    Price: High to Low
                                </option>
                                <option value="language-asc">
                                    Language: A to Z
                                </option>
                                <option value="language-desc">
                                    Language: Z to A
                                </option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className="post-group">
                {isFilterVisible && (
                    <div
                        className={`post-wrapper-filter ${
                            isFilterVisible ? "show" : ""
                        }`}
                    >
                        <FilterComponent
                            filters={filters}
                            onFilterChange={handleFilterChange}
                        />
                    </div>
                )}
                <div className="post-wrapper">
                    {posts?.slice(0, visiblePosts).map((post) => (
                        <div className="post" key={post.id}>
                            <Link
                                to={`/post/${post.id}`}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <img
                                    className="post-image"
                                    // src={`https://d37zebxsdrcn1w.cloudfront.net/${post?.imageId}`}
                                    src={`https://post-images-loomo.s3.eu-north-1.amazonaws.com/${post?.imageId}`}
                                    alt="post-image"
                                />
                            </Link>
                            <Link
                                to={`/post/${post.id}`}
                                style={{
                                    textDecoration: "none",
                                    color: "inherit",
                                }}
                            >
                                <div className="post-text-group">
                                    <div className="post-text">
                                        <h3>{post?.title}</h3>
                                        <p>{post?.price}$</p>
                                    </div>
                                    <div className="post-text-duration">
                                        <p>
                                            {calculateDaysBetween(
                                                post?.classStartDate,
                                                staticEndDate
                                            )}{" "}
                                            Lessons | Class Duration:{" "}
                                            {convertMinutesToHours(
                                                post?.duration
                                            )}
                                        </p>
                                    </div>
                                    <p className="post-text-description">
                                        {post?.description}
                                    </p>

                                    <div className="post-language">
                                        <p className="language-text">
                                            {" "}
                                            {post?.language}
                                        </p>
                                        <p>
                                            Starts:{" "}
                                            {formatDateTime(
                                                post?.classStartDate
                                            )}
                                        </p>
                                        <div className="post-teacher-profile">
                                            <div className="teacher-name">
                                                <h5>Andrew Hate</h5>
                                                <p>Software Engineer</p>
                                            </div>
                                            <img
                                                src={teacher_icon}
                                                alt="teacher"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
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
