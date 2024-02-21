import { useState } from 'react';
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';

const JoinForm = () => {
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState(''); 

    const Navigation = useNavigate(); // 주소 변경

    const onClickEnter = (e) => {
       if(e.key === 'Enter') {
        handleJoin();
       }
    }

    const handleJoin = async () => {
        try {
            const response = await axios.post(`/api/join`, {
                name : name,
                nickname : nickname,
                password : password,
            });

            setName("");
            setNickname("");
            setPassword("");

            if (response.data === 1) {
                // 회원가입 성공 시 처리
                console.log("회원가입 성공");
                Navigation(`/login`);
            } else {
                // 회원가입 실패 시 처리
                console.error('회원가입 실패');
                redirect("/join");
            }
        } catch (error) {
            console.error('회원가입 요청 실패', error);
        }
    };

  return (
    <div>
        <p><input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={onClickEnter} /></p>
        <p><input type="text" placeholder="nickname" value={nickname} onChange={(e) => setNickname(e.target.value)} onKeyDown={onClickEnter} /></p>
        <p><input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={onClickEnter} /></p>
        <p><button onClick={handleJoin}>회원가입</button></p>
    </div>
  )
}

export default JoinForm;