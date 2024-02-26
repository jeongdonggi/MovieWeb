import PropTypes from "prop-types";
import Video from "./Video";
import Image from "./Image";
import Recommend from "./Recommend";
import { useState ,useEffect, useCallback } from "react";
import "../../css/MovieDetail.css";
import Actor from "./Actor";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

export const Movie = ({id, title, year, showTm, genres, background, poster, summary, tagline, late, like}) => {
    const tmdbImageUrl = "https://image.tmdb.org/t/p/w500";
    
    const PosterImageUrl = tmdbImageUrl + poster;
    const backgroundImageUrl = tmdbImageUrl + background;

    const [liked, setLiked] = useState(like);

    const userId = sessionStorage.getItem("id");

    const handleLiked = () => {
        setLiked(!liked); // 일단 잘 나옴
    }

    const handleLikeMovie = useCallback ( async () => {
        await axios.post(`/api/movielike`,{
            id : userId,
            like : id
        })
    },[userId, id]);

    const handleDisLikeMovie = useCallback ( async () => {
        await axios.post(`/api/moviedislike`,{
            id : userId,
            like : id
        })
    },[userId, id]);

    useEffect(()=>{
        window.scrollTo(0,0);
    },[]);

    // 여기서 만약에 db에 값이 있다면 변경되지 않아야됨
    useEffect(()=>{
        if(liked){
            handleLikeMovie();
        } else {
            handleDisLikeMovie();
        }
    },[liked, handleLikeMovie, handleDisLikeMovie])

    return (
        <div className="movie">
            <div className="background__container">
                <div className="overlay"></div>
                {background !== null ? (<img src={backgroundImageUrl} alt="background" className="background"></img>
                    ):( <p>배경이 없습니다.</p>)
                }
            </div>
            <div className="movie__explanation">
                <div className="poster__container">{poster !== null ?
                    (<img src={PosterImageUrl} alt="poster" className="poster"></img>
                    ): (<p>포스터가 없습니다</p>)
                }</div>
                <div className="explanation__movie">
                    <button className={`explanation__like${liked ? "__true" : "__false" }`} onClick={handleLiked}>
                        <FontAwesomeIcon icon={faHeart} />
                    </button>
                    <h2 className="movie__title">
                        {title}
                    </h2>
                    <p className="movie__year">{year}</p>
                    <div className="flex__explanation">
                        <p className="movie__showTm">{showTm}분</p>
                        <p className="movie__late">{late}</p>
                    </div>
                    <div className="movie__genres">
                            {genres.map((genre, index) => (
                                <p className="movie__genre" key={index}>{genre.name}</p>
                            ))}
                        </div>
                    <p className="movie__tagline">{tagline}</p>
                    <p className="movie__summary">{summary}</p>
                </div>
            </div>
            <Video id={id} />
            <Actor id={id} />
            <Image id={id} />
            <Recommend id={id}/>
        </div>
    );
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    year: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    showTm: PropTypes.number.isRequired,
    genres: PropTypes.arrayOf(PropTypes.object).isRequired,
    background: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired, 
    summary: PropTypes.string.isRequired, 
    tagline: PropTypes.string.isRequired,
    late: PropTypes.number.isRequired,
    like: PropTypes.bool.isRequired
};

export default Movie;