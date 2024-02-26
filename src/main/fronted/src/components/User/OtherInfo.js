import { useState, useCallback, useEffect } from 'react'
import axios from 'axios';
import "../../css/Ucss/OtherInfo.css";
import { useParams } from 'react-router-dom';
import MyMovieDetail from './MyMovieDetail';

const OtherInfo = () => {

    const [nickname, setNickname] = useState('');
    const [genres, setGenres] = useState([]);
    const [likes, setLikes] = useState([]);

    const { userId } = useParams();

    const getOtherUser = useCallback( async () => {
      if(userId) {
        const otherinfo = await axios.post(`/api/otherinfo`,{
          id : userId,
        });

        const tags = await axios.post(`/api/usertagname`,{
          id : userId
        });

        const likes = await axios.post(`/api/movielikeall`,{
          id : userId
       });

        setNickname(otherinfo.data.nickname);
        setGenres(tags.data);
        setLikes(likes.data)
      }
        
      },[userId]);

    useEffect(() => {
        getOtherUser();
    },[getOtherUser])

    
  return (
    <div className='other__container'>
      <p>닉네임: {nickname}</p>
      <p className='other__p'>선호 장르 : {genres.map((genre) => (
        `[ ${genre} ] `
      ))}</p>
       <p>선호하는 영화</p>
      <MyMovieDetail userId={userId} likes={likes} />
    </div>
  )
}

export default OtherInfo
