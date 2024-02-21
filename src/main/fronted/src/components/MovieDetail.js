import PropTypes from "prop-types";
import "../css/Movie.css"
import Video from "./Video";
import Image from "./Image";
import Recommend from "./Recommend";
import { useEffect } from "react";
import "../css/MovieDetail.css";
import Actor from "./Actor";

export const Movie = ({id, title, year, showTm, genres, background, poster, summary, tagline, late}) => {
    const tmdbImageUrl = "https://image.tmdb.org/t/p/w500";
    
    const PosterImageUrl = tmdbImageUrl + poster;
    const backgroundImageUrl = tmdbImageUrl + background;

    useEffect(()=>{
        window.scrollTo(0,0);
    },[id]);

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
    late: PropTypes.number.isRequired
};

export default Movie;