import { useState } from 'react';
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';
import "../../css/Ucss/JoinForm.css";
import SelectGenres from './SelectGenres';

const JoinForm = () => {
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState(''); 

    // 장르 선택
    const [select, setSelect] = useState([]);

    const Navigation = useNavigate(); // 주소 변경

    const BackToMain = () => {
        Navigation(`/`);
    }

    const onClickEnter = (e) => {
       if(e.key === 'Enter') {
        handleJoin();
       }
    }

    const handleJoin = async () => {
        try {

            if (name !== "" && nickname !== "" && password !== "" && select.length === 5){
                const response = await axios.post(`/api/join`, {
                    name : name,
                    nickname : nickname,
                    password : password,
                    select : select,
                });

                setName("");
                setNickname("");
                setPassword("");
    
                if (response.data === 5) {
                    // 회원가입 성공 시 처리
                    Navigation(`/login`);
                } else {
                    // 회원가입 실패 시 처리
                    redirect("/join");
                }
            } else {
                setName("");
                setNickname("");
                setPassword("");
                console.log("값은 다 넣어라;;");
            }
        } catch (error) {
            console.error('회원가입 요청 실패', error);
        }
    };

  return (
    <div className='popup'>
        <div className='join__container'>
            <button onClick={BackToMain}>X</button>
            <p><input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={onClickEnter} /></p>
            <p><input type="text" placeholder="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} onKeyDown={onClickEnter} /></p>
            <p><input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={onClickEnter} /></p>
            <p><button onClick={handleJoin}>회원가입</button></p>    
            <SelectGenres select={select} setSelect={setSelect} />
        </div>
    </div>
  )
}

export default JoinForm;