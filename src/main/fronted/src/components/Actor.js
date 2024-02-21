import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../css/Actor.css";
import { Link } from "react-router-dom";

const Actor = ({id}) => {

    const [actors, setActors] = useState([]);

    const tmdbImageUrl = "https://image.tmdb.org/t/p/w500";

    const TMDB_API =  process.env.REACT_APP_TMDB_API_KEY;

    const getActors = useCallback( async() => {
        const json = await ( await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`,{
            params: {
                api_key: TMDB_API,
                language : 'ko',
                region : 'KR'
            }
        })).data;

        setActors(json.cast);
    },[id ,TMDB_API]);

    useEffect(() => {
        getActors();
    },[getActors]);

  return (
    <div>
        <h3>출연 배우</h3>
        <div className="image__actors">
            {actors.length > 0 ? (
                actors.map((actor, index) => (
                    <Link to={`/find/${actor.id}`} className="image__actor" key={index}>
                        {actor.profile_path !== null ? (
                            <img className="actor__img" src={`${tmdbImageUrl}${actor.profile_path}`} alt="actor" />
                        ) : (<p>사진이 없습니다.</p>)}
                        <p className="ch__name">{actor.character}</p>
                        <p className="actor__name">{actor.name}</p>
                    </Link>
                ))
            ) : (
                <p>이미지가 없습니다.</p>
            )} 
        </div>
    </div>
  )
}

export default Actor
