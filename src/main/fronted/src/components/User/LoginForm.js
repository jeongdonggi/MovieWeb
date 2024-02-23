import { useState } from 'react';
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';
import "../../css/Ucss/LoginForm.css";

const LoginForm = ({setLogin}) => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState(''); 

    const Navigation = useNavigate(); // 주소 변경

    const onClickEnter = (e) => {
       if(e.key === 'Enter') {
        handleLogin();
       }
    }

    const BackToMain = () => {
        Navigation(`/`);
    }

    const handleLogin = async () => {
        try {
            const response = await axios.post(`/api/login`, {
                name: name,
                password: password,
            });

            setName("");
            setPassword("");

            if (response.data !== 0) {
                // 로그인 성공 시 처리
                sessionStorage.setItem('id', response.data);
                sessionStorage.setItem('login',true);
                setLogin(true);
                Navigation(`/home`);
            } else {
                // 로그인 실패 시 처리
                redirect("/login");
            }
        } catch (error) {
            console.error('로그인 요청 실패', error);
        }
    };

  return (
    <div className='popup'>
        <div className='login__container'>
            <button onClick={BackToMain}>X</button>
            <p><input type="text" placeholder="name" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={onClickEnter} /></p>
            <p><input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={onClickEnter} /></p>
            <p><button onClick={handleLogin}>로그인</button></p>
        </div>
    </div>
    
  )
}

export default LoginForm;