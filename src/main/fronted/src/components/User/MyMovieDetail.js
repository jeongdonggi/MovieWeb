import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import "../../css/Ucss/MyMovieDetail.css";
import { Link } from "react-router-dom";

const MyMovieDetail = ({userId, likes}) => {

    const [movieId, setMovieId] = useState([]);
    const [movie, setMovie] = useState([]);
        
    const TMDB_API =  process.env.REACT_APP_TMDB_API_KEY;

    const tmdbImageUrl = "https://image.tmdb.org/t/p/w500";

    const getUserLikeAll = useCallback( async ()=>{
        console.log(likes);
        setMovieId(likes); // like_id 받아야됨
    },[likes])

    const getMovie = useCallback( async(movieid) => {

        const json = await (
            await axios.get(`https://api.themoviedb.org/3/movie/${movieid}`,
            {
                params: {
                    api_key: TMDB_API ,
                    language : 'ko',
                    region : 'KR'
                }
            })
        ).data;

        setMovie((prev) => [
            ...prev,
            json.poster_path
        ]);
    },[TMDB_API]);

    useEffect(()=>{
        setMovie([]);
        getUserLikeAll();        
    },[getUserLikeAll, userId])

    useEffect(()=> {
        if(movieId.length !== 0 ){
            movieId.map((id) => (
                getMovie(id.like_id)
            ))
        }
    },[movieId,getMovie])

  return (
    <div className="usermovie__container">
        {movie.map((movie,index) => (
            <Link key={index} to={`/movie/${movieId[index].like_id}`}>
                <img className="usermovie__poster" alt="poster" src={`${tmdbImageUrl}${movie}`}></img> 
            </Link>
        ))}
    </div>
  )
}

export default MyMovieDetail
