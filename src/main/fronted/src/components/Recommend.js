import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Recommend.css";

const Recommend = ({id}) => {
    const [recommends, setRecommends] = useState([]);
    const [loading, setLoading] = useState(true);

    const tmdbImageUrl = "https://image.tmdb.org/t/p/w500";

    const TMDB_API =  process.env.REACT_APP_TMDB_API_KEY;

    const getMovies = useCallback( async() => {
      // Similar보다 Recommendation이 현재 상영 영화와 비슷한 년도 영화 추천해줌
        const json = await ( await axios.get(`https://api.themoviedb.org/3/movie/${id}/recommendations`, {
            params :{
                api_key: TMDB_API ,
                page: 1,
                language : 'ko',
                region : 'KR'
            }
        }) ).data;
        setRecommends(json.results)
        setLoading(false);
    },[id, TMDB_API])

    useEffect(() => {
        getMovies();
    },[getMovies])

  return (
    <div>
      <h3>비슷한 컨텐츠</h3>
      {loading ? (
        <div className="loader">
                    <span className="loader_text">Loading...</span>
        </div>
      ) : (
        recommends.length > 0 ? (
          <div className="movie__recommends">
            {recommends.map((recommend) => (
                <Link to={`/movie/${recommend.id}`} key={recommend.id} className="movie__recommend">
                    {recommend.poster_path !== null ? (<img className="recommend__img" src={`${tmdbImageUrl}${recommend.poster_path}`} alt="poster"></img>
                    ): (<p>{recommend.title}</p>)
                    }
                </Link>
            ))}
          </div>
        ) : (
            <p>검색 결과가 없습니다.</p>
        )
      )
    }
    </div>
  )
}

export default Recommend
