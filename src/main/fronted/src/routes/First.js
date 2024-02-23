import { Link } from "react-router-dom"

import "../css/Ucss/First.css";

const First = () => {
  return (
    <div className="first__container">
        <button>
            <Link to={`/login`} className="first__link" >
                로그인
            </Link>
        </button>
        <button>
            <Link to={`join`} className="first__link" >
                회원가입
            </Link>
        </button>
        
    </div>
  )
}

export default First
