import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/SearchBar.css";

const SearchBar = ({login}) => {

    const Navigation = useNavigate(); // 주소 변경
    const [word, setWord] = useState("");

    const onChange = (e) => {
        setWord(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const wd = word;
        setWord("");
        Navigation(`/search/${wd}`);
    }

  return (
    <>
        {login ? (
            <div className="movie__searchbar">
                <form onSubmit={onSubmit}>
                    <input className="search__input" type="text" placeholder="검색어를 입력해주세요" value={word} onChange={onChange}></input>
                    <button type="submit" className="search__btn">
                        <img
                            className="search__icon" 
                            src="https://s3.ap-northeast-2.amazonaws.com/cdn.wecode.co.kr/icon/search.png" 
                            alt="검색"></img>
                    </button>
                </form>
            </div>
        ) : ( null )}
    </>
  )
}

export default SearchBar