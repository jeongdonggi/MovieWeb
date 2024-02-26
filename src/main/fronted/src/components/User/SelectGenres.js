import axios from "axios";
import { useEffect, useState } from "react"
import "../../css/Ucss/SelectGenres.css";

const SelectGenres = ({select, setSelect}) => {
    const [genres,setGenres] = useState([]);
    

    // filter 새로운 배열 만들기
    const handleGenres = (id) => {
        console.log(id);
        (!select.includes(id)) ? (
            (select.length < 5) ? (
                setSelect((prev) => [
                    ...prev,
                    id
                ])
            ) : (
                console.log(select)
            )
        ) : (
            setSelect((prev) => prev.filter((item) => item !== id))
        )   
    }

    const AllGenres = async() => {
        const response = await axios.get(`/api/alltag`);

        setGenres(response.data);
    }

    useEffect(() => {
        AllGenres();
    },[])

  return (
    <div className="select__container">
        <p className="select__title">선호하는 장르 5가지</p>
        {genres.map((genre) => (
            <button className={`select__btn${select.includes(genre.id) ? "__true" : "" }`} key={genre.id} 
                onClick={() => handleGenres(genre.id)}
            >{genre.tagName}</button>
        ))}
    </div>
  )
}

export default SelectGenres
