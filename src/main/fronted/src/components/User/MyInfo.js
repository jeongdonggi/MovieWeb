import { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../css/Ucss/MyInfo.css";
import MyMovieDetail from './MyMovieDetail';

const Myinfo = () => {
  const [user, setUser] = useState({});
  const [genres, setGenres] = useState([]);
  const [likes, setLikes] = useState([]);

  const id = sessionStorage.getItem("id");

  const getUser = useCallback( async () => {
    const myinfo = await axios.post(`/api/myinfo`, {
      id: id
    });

    const tags = await axios.post(`/api/usertagname`,{
      id : id
    });

    const likes = await axios.post(`/api/movielikeall`,{
      id : id
   });

    setUser(myinfo.data);
    setGenres(tags.data);
    setLikes(likes.data);
  },[id]);

  useEffect(() => {
      getUser();
  },[getUser])

  return (
    <div className='myinfo__container'>
      <p>아이디 : {user.name}</p>
      <p>닉네임 : {user.nickname}</p>
      <p className='myinfo__p'>선호 장르 : {genres.map((genre) => (
        `[ ${genre} ] `
      ))}</p>
      <p>선호하는 영화</p>
      <MyMovieDetail userId={id} likes={likes} />
      <div className='myinfo__btn'>
        <button>
          <Link to={`/update`} className='myinfo__link'>
            업데이트
          </Link>
        </button>
        <button>
          <Link to={`/withdraw`} className='myinfo__link'>
            회원탈퇴
          </Link>
        </button>
      </div>
    </div>
  )
}

export default Myinfo