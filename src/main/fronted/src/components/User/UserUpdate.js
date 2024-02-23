import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { redirect ,useNavigate } from "react-router-dom";
import "../../css/Ucss/UserUpdate.css";

const UserUpdate = () => {

    const [nickname,setNickname] = useState('');
    const [password, setPassword] = useState('');

    const [usernick, setUsernick] = useState('');

    const Navigation = useNavigate();

    const id = sessionStorage.getItem("id");

    const onClickEnter = (e) => {
      if(e.key === 'Enter') {
       handleUpdate();
      }
    }

    const getUserNick = useCallback( async () => {
      const response = await axios.post(`/api/getnick`, {
        id : id
      });
      setUsernick(response.data.nickname);
      setNickname(response.data.nickname);
    },[id]);

    useEffect(() => {
      getUserNick();
    },[getUserNick])

    const handleUpdate = async () => {
        const response = await axios.post(`/api/update`, {
            id : id,
            nickname : nickname,
            password : password,
        });

        if (response.data === 1 && nickname !== '' && password !== ''){
          Navigation(`/myinfo`);
        } else{
          setNickname(usernick);
          setPassword('');
          redirect(`/update`);
        }
    };

  return (
    <div className="update__container">
        <p><input type="text" placeholder="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} onKeyDown={onClickEnter} /></p>
        <p><input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={onClickEnter} /></p>
        <p><button onClick={handleUpdate}>업데이트</button></p>
    </div>
  )
}

export default UserUpdate
