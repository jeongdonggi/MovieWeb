import { Link } from "react-router-dom"

const First = () => {
  return (
    <div>
        <button>
            <Link to={`/login`}>
                로그인
            </Link>
        </button>
        <button>
            <Link to={`join`}>
                회원가입
            </Link>
        </button>
        <button>
            <Link to={`/myinfo`}>
                내 정보
            </Link>
        </button>
        <button>
            <Link to={`allinfo`}>
                회원 정보
            </Link>
        </button>
    </div>
  )
}

export default First
