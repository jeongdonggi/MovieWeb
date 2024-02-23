import { useCallback, useEffect, useState } from "react"
import axios from "axios"
import { redirect, useNavigate } from 'react-router-dom';
import "../../css/Ucss/DeleteUser.css";

const DeleteUser = () => {
    const id = sessionStorage.getItem("id");

    const Navigation = useNavigate();

    const [password, setPassword] = useState('');
    const [userpass, setUserpass] = useState('');

    const onClickEnter = (e) => {
        if(e.key === 'Enter') {
         userDelete();
        }
    }

    const getUserPass = useCallback( async () => {
        const response = await axios.post(`/api/getpass`,{
            id : id,
        })
        setUserpass(response.data.password);
    },[id]);

    useEffect(()=>{
        getUserPass();
    },[getUserPass])

    const userDelete = async () => {
        if(userpass === password) {
            const response = await axios.post(`/api/withdraw`, {
                id : id,
            });

            if( response.data === 1) {
                Navigation('/');
            } else {
                redirect(`/withdraw`);
            }
        } else {
            redirect(`/withdraw`);
        }
        }
        

  return (
    <div className="delete__container">
        <p><input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={onClickEnter} /></p>
        <p><button onClick={userDelete}>탈퇴</button></p>
    </div>
  )
}

export default DeleteUser
