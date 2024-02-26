import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../css/Ucss/AllInfo.css";
import { useNavigate } from 'react-router-dom';

const AllInfo = ({login}) => {
  const [userList, setUserList] = useState([]);

  const myId = sessionStorage.getItem("id");

  const Navigation = useNavigate();

  useEffect(() => {
    // 컴포넌트가 마운트될 때 초기 데이터 로딩
    getUserAll();
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행

  const getUserAll = async () => {
    try {
      const response = await axios.get(`/api/allinfo`);
      setUserList(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleOtherInfo = (userId) => {
    Navigation(`/otherinfo/${userId}`);
  }

  return (
    <div className='allinfo__container'>
      {login ? (
        <ul className='allinfo__ul'>
          {userList.map((user, index) => (
            <li key={index}>
              {(myId !== user.id) ? (
                <div className='allinfo__div' onClick={() => {handleOtherInfo(user.id)}}>{user.nickname}</div>
              ) : (null)}
            </li>
          ))}
        </ul>
      ) : (
        null
      )}
    </div>
  );
};

export default AllInfo;
