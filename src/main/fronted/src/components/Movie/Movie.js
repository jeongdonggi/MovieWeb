import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import "../../css/Movie.css"

export const Movie = ({id, poster}) => {
    const tmdbImageUrl = "https://image.tmdb.org/t/p/w500";
    
    const imageUrl = tmdbImageUrl + poster;

    return (
        <div className="movies__posters">
            <Link to={`/movie/${id}`} className="movie">
                {poster !== null ? (
                    <img src={imageUrl} alt="moviePoster" className="movie__poster"></img>
                ) : (<p>사진이 없습니다.</p>)}
            </Link>
        </div>
    );
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    poster: PropTypes.string.isRequired
};

export default Movie;