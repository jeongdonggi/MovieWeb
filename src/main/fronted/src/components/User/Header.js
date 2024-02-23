import { Link, useNavigate } from "react-router-dom"
import "../../css/Ucss/Header.css";

const Header = ({setLogin}) => {

    const Navigation = useNavigate();

    const onClick = () => {
        sessionStorage.clear();
        setLogin(false);
        Navigation(`/`);
    }
  return (
    <div className="header__container">
      <button>
            <Link to={`/myinfo`} className="header__link">
                내 정보
            </Link>
        </button>
        <button onClick={onClick}>
            로그아웃
        </button>
    </div>
  )
}

export default Header
