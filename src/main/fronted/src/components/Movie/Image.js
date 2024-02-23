import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../../css/Image.css";

const Image = ({id}) => {

    const [backdrops, setBackdrops] = useState([]);
    const [posters, setPosters] = useState([]);

    const TMDB_API =  process.env.REACT_APP_TMDB_API_KEY;

    const tmdbImageUrl = "https://image.tmdb.org/t/p/w500";

    const getImage = useCallback( async() => {
        // await:Promise가 끝날 때 까지 기다려라 => fetch 기다린 후 json도 기다림
        const json = await (
            await axios.get(`https://api.themoviedb.org/3/movie/${id}/images`,
            {
                params: {
                    api_key: TMDB_API ,
                    include_image_language: 'null',
                    language : 'ko',
                    region : 'KR'
                }
            })
        ).data;
        setBackdrops(json.backdrops);
        setPosters(json.posters);
    },[id, TMDB_API])

    useEffect(() => {
        getImage();
    }, [getImage]);

  return (
    <div className="movie__image">
        <h3>포스터</h3>
        <div className="image__posters">
            {posters.length > 0 ? (
                posters.map((poster, index) => (
                    <div className="image__poster" key={index}>
                        <img className="poster__img" src={`${tmdbImageUrl}${poster.file_path}`} alt="poster" />
                    </div>
                ))
            ) : (
                <p>이미지가 없습니다.</p>
            )} 
        </div>
        <h3>스틸컷</h3>
        <div className="image__backdrops">
            {backdrops.length > 0 ? (
                backdrops.map((backdrop, index) => (
                    <div className="image__backdrop" key={index}>
                        <img className="backdrop__img" src={`${tmdbImageUrl}${backdrop.file_path}`} alt="backdrop" />
                    </div>
                ))
            ) : (
                <p>이미지가 없습니다.</p>
            )}
        </div>
    </div>
  )
}

export default Image
