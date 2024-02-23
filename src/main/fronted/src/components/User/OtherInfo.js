import { useState, useCallback, useEffect } from 'react'
import axios from 'axios';
import "../../css/Ucss/OtherInfo.css";

const OtherInfo = ({id}) => {

    const [nickname, setNickname] = useState('');

    const getOtherUser = useCallback( async () => {
      if(id) {
        const response = await axios.post(`/api/otherinfo`,{
          id : id,
        });

        setNickname(response.data.nickname);
      }
        
      },[id]);

    useEffect(() => {
        getOtherUser();
    },[getOtherUser])

    
  return (
    <div className='other__container'>
      <p>닉네임: {nickname}</p>
    </div>
  )
}

export default OtherInfo
