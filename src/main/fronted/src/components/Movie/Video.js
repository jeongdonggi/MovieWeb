import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "../../css/Video.css";

const Video = ({id}) => {

    const [videos, setVideos] = useState([]);

    const TMDB_API =  process.env.REACT_APP_TMDB_API_KEY;

    const YoutubeUrl = "https://www.youtube.com/embed/";

    const getVideo = useCallback( async() => {
        // await:Promise가 끝날 때 까지 기다려라 => fetch 기다린 후 json도 기다림
        const json = await (
            await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos`,
            {
                params: {
                    api_key: TMDB_API ,
                    language : 'ko',
                    region : 'KR'
                }
            })
        ).data;
        setVideos(json.results);
    },[id, TMDB_API])

    useEffect(() => {
        getVideo();
    }, [getVideo]);

  return (
    <div>
        <h3>영상</h3>
        <div className="movie__videos">
            {videos.length > 0 ? (
                videos.map((video) => (
                    <div className="movie__video" key={video.id}>
                        <p>{video.name}</p>
                        <iframe
                            title={video.name}
                            width="560"
                            height="315"
                            src={`${YoutubeUrl}${video.key}`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
                            allowFullScreen
                        ></iframe>
                    </div>
                ))
            ) : (
                <p>영상이 없습니다.</p>
            )}
        </div>
    </div>
  )
}

export default Video
