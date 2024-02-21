import { useState, useEffect, useCallback } from "react"
import axios from "axios"
import Movie from "./Movie";
import "../css/GenresHome.css";

// 얘는 들어오면서 string으로 받아서 오류 안 생긴거임
const GenresHome = ({genresid}) => {
    const [movies, setMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [gname, setGname] = useState("");

    const TMDB_API =  process.env.REACT_APP_TMDB_API_KEY;

    const getMovies = useCallback( async () => {
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

        const genrejson = await (
            await axios.get(`https://api.themoviedb.org/3/genre/movie/list`,{
                params: {
                    api_key: TMDB_API,
                    language : 'ko',
                    region : 'KR',
                }
            })
        ).data;

        setMovies(json.results);
        setGenres(genrejson.genres);
        
    },[genresid, TMDB_API]);

    useEffect(() => {
        getMovies();
    },[getMovies]);

    useEffect(() => {
        const genreObj = genres.find(genre => genre.id === genresid);
        console.log(genresid);
        console.log(genres)
        console.log(genreObj);
        if(genreObj){
            setGname(genreObj.name);
        } else{
            setGname("");
        }
    },[genres, genresid]);

    return (
        <div className="home__genres">
            <h3>{gname !== "" ? `${gname} 영화` : "장르가 없습니다."}</h3>
            <div className="genres__poster">
                {movies.map((movie) => (
                    <div className="toplate__movie" key={movie.id} > 
                        <Movie
                            id={movie.id}
                            poster={movie.poster_path}
                        ></Movie>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GenresHome;
