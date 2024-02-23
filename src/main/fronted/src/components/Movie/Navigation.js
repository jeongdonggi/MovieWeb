import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Link } from "react-router-dom"
import "../../css/Navigation.css";

const Navigation = ({login}) => {

  const [genres, setGenres] = useState([]);

  const TMDB_API =  process.env.REACT_APP_TMDB_API_KEY;

  const getGenres = useCallback( async() => {
      // await:Promise가 끝날 때 까지 기다려라 => fetch 기다린 후 json도 기다림
      const json = await (
          await axios.get(`https://api.themoviedb.org/3/genre/movie/list`,
          {
              params: {
                  api_key: TMDB_API ,
                  language : 'ko',
                  region : 'KR'
              }
          })
      ).data;
      setGenres(json.genres);
  },[TMDB_API])

  useEffect(() => {
      getGenres();
  }, [getGenres]);

  const DropdownMenu = ({genres}) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleToggle = () => {
      setIsOpen(!isOpen);
    }

    return (
      <div className="nav__dropdown">
        <div className="nav__btn" onClick={handleToggle}>
          장르
        </div>
        {isOpen && (
          <ul className="nav__ul">
            {genres.map((genre) => (
              <li key={genre.id}>
                <Link to={`/genre/${genre.id}`} className="nav__btn" onClick={handleToggle}>{genre.name}</Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  };

  return (
    <div>
      {login ? (
        <>
          <div className="nav">
            <Link to="/home" className="nav__btn">홈</Link>
          </div>
          <div className="nav">
            <Link to="/now" className="nav__btn">상영작</Link>
          </div>
          <DropdownMenu genres={genres} />
        </>
      ) : ( null )}
      
    </div>
  )
}

export default Navigation
