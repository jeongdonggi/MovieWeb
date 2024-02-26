import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import MovieDetail from "../components/Movie/MovieDetail";
import axios from "axios";

const Detail = () => {

    const [loading, setLoading] = useState(true);
    const [movie, setMovie] = useState(null);
    const [like,setLike] = useState(false);

    const userId = sessionStorage.getItem("id");

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
                    region : 'KR'
                }
            })
        ).data;

        const response = await axios.post(`/api/mylike`,{
            id : userId,
            like : id
        });

        if(response.data === 1){
            setLike(true);
        } else{
            setLike(false);
        }

        setMovie(json);
        setLoading(false);
    },[userId ,id, TMDB_API]);

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
                            like={like}
                        >
                        </MovieDetail>
                    </div> 
                )
            }
        </div>
    );
}

export default Detail
