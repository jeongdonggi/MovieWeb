import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AllInfo = () => {
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    // 컴포넌트가 마운트될 때 초기 데이터 로딩
    getUserAll();
  }, []); // 빈 배열은 컴포넌트가 마운트될 때 한 번만 실행

  const getUserAll = async () => {
    try {
      const response = await axios.get(`/api/allinfo`);
      console.log(response.data);
      setUserList(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {userList.map((user, index) => (
          <li key={index}>
            <strong> Nickname:</strong> {user.nickname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllInfo;
