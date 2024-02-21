import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import "../css/Search.css"

const Search = () => {

    const [searchs, setSearchs] = useState([]);
    const [loading, setLoading] = useState(true);

    const TMDB_API =  process.env.REACT_APP_TMDB_API_KEY;

    const tmdbImageUrl = "https://image.tmdb.org/t/p/w500";

    const {word} = useParams(); // :id 처럼 되어있는 값을 받아온다.

    const getKeyword = useCallback( async() => {
        // await:Promise가 끝날 때 까지 기다려라 => fetch 기다린 후 json도 기다림
        const json = await (
            await axios.get(`https://api.themoviedb.org/3/search/movie`,
            {
                params: {
                    api_key: TMDB_API ,
                    query: word,
                    language : 'ko',
                    region : 'KR',
                    page : 1
                }
            })
        ).data;
        console.log(json.results);
        setSearchs(json.results);
        setLoading(false);
    },[word, TMDB_API])

    useEffect(() => {
        window.scrollTo(0,0);
        getKeyword();
    }, [getKeyword]);

  return (
    <div className="container">
        {loading? (
            <div className="loader">
                <span className="loader_text">Loading...</span>
            </div>
        ) : (
            <div className="movie__search">
                {searchs.length > 0 ? (
                    searchs.map((search) => (
                        <div key={search.id} className="search">
                            <Link to={`/movie/${search.id}`}>
                                {(search.poster_path !== null || word !== "")  ? (
                                    <img src={`${tmdbImageUrl}${search.poster_path}`} alt="poster__img"></img>
                                ) : (null)}
                            </Link>                                    
                        </div>
                    ))
                ) : (
                    <p>검색 결과가 없습니다.</p>
                )}
            </div>         
        )}
    </div>
  )
}

export default Search;