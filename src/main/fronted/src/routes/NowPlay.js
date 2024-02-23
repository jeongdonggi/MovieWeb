import { useState, useEffect, useCallback } from "react";
import Movie from "../components/Movie/Movie";
import axios from "axios";
import "../css/NowPlay.css";

const NowPlay = () => {
    const [loading, setLoading] = useState(true);
    const [playings, setPlayings] = useState([]);

    const TMDB_API =  process.env.REACT_APP_TMDB_API_KEY;

    // 비동기 함수: Promise => 비동기 작업의 단위
    const getMovies = useCallback(async() => {
        // await:Promise가 끝날 때 까지 기다려라 => fetch 기다린 후 json도 기다림
        const json_now = await (
            await axios.get(`https://api.themoviedb.org/3/movie/now_playing`,
            {
                params: {
                    api_key: TMDB_API ,
                    language : 'ko',
                    page : 1,
                    region : 'KR'
                }
            })
        ).data;

        setPlayings(json_now.results);
        setLoading(false);
    },[TMDB_API]);

    useEffect(() => {
        getMovies();
    }, [getMovies]);

    return (
        <div className='container'>
            {loading? (
                <div className="loader">
                    <span className="loader_text">Loading...</span>
                </div>
            ) : (
                <div className="movies">
                    <h3>현재 상영 중인 영화</h3>
                    <div className="movies__now">
                        {playings.map((playing) => (
                            <div className="now__movie" key={playing.id} > 
                                <Movie
                                    id={playing.id}
                                    poster={playing.poster_path}
                            ></Movie>
                            </div>
                        ))}
                    </div>
                </div>
                )
            }
        </div>
    );
}

export default NowPlay
