import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MovieDetail from "../components/Movie/MovieDetail";
import axios from "axios";

const Detail = () => {

    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState(null);

    const {id} = useParams(); // :id 처럼 되어있는 값을 받아온다.
    
    const TMDB_API =  process.env.REACT_APP_TMDB_API_KEY;

    // useCallback: id가 변경될 때마다 함수 생성
    const getMovie = useCallback( async() => {
        const json = await (
            await axios.get(`https://api.themoviedb.org/3/movie/${id}`,
            {
                params: {
                    api_key: TMDB_API ,
                    language : 'ko',
                    page : 1,
                    region : 'KR'
                }
            })
        ).data;
        setMovie(json);
        setLoading(false);
    },[id, TMDB_API]);
    
    useEffect(() => {
        getMovie();
    },[getMovie])

    return (
        <div>
            {loading? (
                    <div className="loader">
                            <span className="loader_text">Loading...</span>
                    </div>
                ) : ( 
                    <div className="movie__detail">
                        <MovieDetail
                            id={movie.id}
                            title={movie.title}
                            year={movie.release_date}
                            showTm={movie.runtime}
                            genres={movie.genres}
                            background={movie.backdrop_path}
                            poster={movie.poster_path}
                            summary={movie.overview}
                            tagline={movie.tagline}
                            late={movie.vote_average}
                        >
                        </MovieDetail>
                    </div> 
                )
            }
        </div>
    );
}

export default Detail
