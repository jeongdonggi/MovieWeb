import { useState, useEffect, useCallback } from "react"
import { Link, useParams } from "react-router-dom";
import axios from "axios"
import "../css/Genres.css";

const Genres = () => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [genres, setGenres] = useState([]);
    const [gname, setGname] = useState("");

    const TMDB_API =  process.env.REACT_APP_TMDB_API_KEY;

    const tmdbImageUrl = "https://image.tmdb.org/t/p/w500";

    const {genresid} = useParams();

    const getMovies = useCallback( async () => {

        const genrejson = await (
            await axios.get(`https://api.themoviedb.org/3/genre/movie/list`,{
                params: {
                    api_key: TMDB_API,
                    language : 'ko',
                    region : 'KR',
                }
            })
        ).data;

        const json = await (
            await axios.get(`https://api.themoviedb.org/3/discover/movie`,{
                params: {
                    api_key: TMDB_API,
                    language : 'ko',
                    region : 'KR',
                    page: 1,
                    with_genres : genresid
                }
            })
        ).data;

        setGenres(genrejson.genres);
        setMovies(json.results);
        setLoading(false);
        
    },[genresid, TMDB_API]);

    useEffect(() => {
        window.scrollTo(0,0);
        getMovies();
    },[getMovies]);

    useEffect(() => {
        const genreObj = genres.find(genre => genre.id === parseInt(genresid, 10));

        if(genreObj){
            setGname(genreObj.name);
        } else{
            setGname("");
        }
    },[genres, genresid]);

    return (
        <div className="container">
            {loading? (
                <div className="loader">
                    <span className="loader_text">Loading...</span>
                </div>
            ) : (
                <div>
                    <h3>{gname !== "" ? `${gname} 영화` : "장르가 없습니다."}</h3>
                    <div className="movie_genres">
                        {movies.length > 0 ? (
                            movies.map((genre) => (
                                <div key={genre.id} className="genres__poster">
                                    <Link to={`/movie/${genre.id}`}>
                                        {(genre.poster_path !== null)  ? (
                                            <img src={`${tmdbImageUrl}${genre.poster_path}`} alt="poster__img"></img>
                                        ) : (null)}
                                    </Link>                                    
                                </div>
                            ))
                        ) : (
                            <p>장르가 없습니다.</p>
                        )}
                    </div>         
                </div>
            )}
        </div>
    )
}

export default Genres;