import { useState } from "react";

const UserUpdate = () => {

    const [nickname,setNickname] = useState('');
    const [password, setPassword] = useState('');

    const id = sessionStorage.getItem("id");

    const getUser = useCallback( async () => {
        const response = await axios.get(`/api/update`, {
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
      
    </div>
  )
}

export default UserUpdate
