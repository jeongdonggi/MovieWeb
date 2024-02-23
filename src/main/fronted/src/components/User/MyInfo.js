import { useState, useEffect, useCallback } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../../css/Ucss/MyInfo.css";

const Myinfo = () => {
  const [user, setUser] = useState({});

  const id = sessionStorage.getItem("id");

  const getUser = useCallback( async () => {
    const response = await axios.post(`/api/myinfo`, {
      id: id
    });

      setUser(response.data);
  },[id]);

  useEffect(() => {
      getUser();
  },[getUser])

  return (
    <div className='myinfo__container'>
      <p>아이디: {user.name}</p>
      <p>닉네임: {user.nickname}</p>
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