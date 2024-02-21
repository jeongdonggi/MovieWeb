import { useState, useEffect, useCallback } from 'react'
import axios from 'axios';

const Myinfo = () => {
  const [user, setUser] = useState({});

  const id = sessionStorage.getItem("id");

  const getUser = useCallback( async () => {
    const response = await axios.get(`/api/myinfo`, {
      params: {
        id : id
      }
    });

    setUser(response.data);
},[id]);

useEffect(() => {
    getUser();
},[getUser])

  return (
    <div>
      <p>Name: {user.name}</p>
      <p>Nickname: {user.nickname}</p>
      <p>Password: {user.password}</p>
    </div>
  )
}

export default Myinfo