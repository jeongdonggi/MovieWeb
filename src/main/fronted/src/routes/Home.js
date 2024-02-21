import { useState, useEffect, useCallback } from "react";
import Movie from "../components/Movie";
import axios from "axios";
import "../css/Home.css";
import GenresHome from "../components/GenresHome";

export const Home = () => {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([]);
    const [playings, setPlayings] = useState([]);

    const TMDB_API =  process.env.REACT_APP_TMDB_API_KEY;

    

    // 비동기 함수: Promise => 비동기 작업의 단위
    const getMovies = useCallback(async() => {
        // await:Promise가 끝날 때 까지 기다려라 => fetch 기다린 후 json도 기다림
        const json_now = await (
            await axios.get(`https://api.themoviedb.org/3/movie/top_rated`,
            {
                params: {
                    api_key: TMDB_API ,
                    language : 'ko',
                    page : 1,
                    region : 'KR'
                }
            })
        ).data;

        const json_popular = await (
            await axios.get(`https://api.themoviedb.org/3/movie/popular`,
            {
                params: {
                    api_key: TMDB_API ,
                    language : 'ko',
                    page : 1,
                    region : 'KR'
                }
            })
        ).data;
        // console.log(json);
        setMovies(json_popular.results);
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
                    <h3>인기있는 영화</h3>
                    <div className="movies__popular">
                        {movies.map((movie) => (
                            <Movie
                                key={movie.id} // map안에서 컴포넌트 render에 사용하기 때문에 필수
                                id={movie.id}
                                poster={movie.poster_path}
                            ></Movie>
                        ))}
                    </div>
                    <h3>평점 좋은 영화</h3>
                    <div className="movies__toplate">
                        {playings.map((playing) => (
                            <div className="toplate__movie" key={playing.id} > 
                                <Movie
                                    id={playing.id}
                                    poster={playing.poster_path}
                            ></Movie>
                            </div>
                        ))}
                    </div>
                    <GenresHome genresid={28}/>
                    <GenresHome genresid={12}/>
                    <GenresHome genresid={35}/>
                    <GenresHome genresid={18}/>
                    <GenresHome genresid={10749}/>
                    <GenresHome genresid={27}/>
                </div>
                )
            }
        </div>
    );
}

export default Home;