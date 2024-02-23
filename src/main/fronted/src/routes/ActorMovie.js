import { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../css/ActorMovie.css";
import Movie from "../components/Movie/Movie.js";

const ActorMovie = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [names, setNames] = useState([]);
  const [name, setName] = useState([]);

  const TMDB_API =  process.env.REACT_APP_TMDB_API_KEY;

  const {actid} = useParams(); // :id 처럼 되어있는 값을 받아온다.

  const getMovies = useCallback( async() => {
    const json = await (await axios.get(`https://api.themoviedb.org/3/person/${actid}/movie_credits`,{
      params: {
        api_key: TMDB_API,
        language : 'ko',
        region : 'KR'
      }
    })).data;

    const namejson = await (await axios.get(`https://api.themoviedb.org/3/person/${actid}`,{
      params: {
        api_key: TMDB_API,
        language : 'ko',
        region : 'KR'
      }
    })).data;

    setMovies(json.cast);
    setNames(namejson.also_known_as);
    setName(namejson.name)
    setLoading(false);
  },[actid, TMDB_API]);

  useEffect(()=>{
    window.scrollTo(0,0);
    getMovies();
  },[getMovies]);

  const korean = names.find(name => /[\uac00-\ud7a3]/.test(name));
  const english = names.find(name => /[\u0041-\u005A\u0061-\u007A]/.test(name));
  const defaultName = names.length > 1 ? names[0] : name;

  return (
    <div className='container'>
      {!loading ? (
        <div>
          <h3>{korean ? (`${korean} 출현 영화`) : (english ? (`${english} 출현 영화`) : (`${defaultName} 출현 영화`)) }</h3>
            <div className="movies__actormv">
              {movies.map((movie) => (
              <div className="movie__actormv" key={movie.id}>
                {movie.poster_path !== null ? (
                  <Movie
                    id={movie.id}
                    poster={movie.poster_path}
                ></Movie>
                ) : (null)}
            </div>
            ))}
          </div>
        </div>
      ) : (<p className="loader">Loading...</p>)}
    </div>
  )
}

export default ActorMovie
