import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import { useState, useEffect } from "react";

import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Navigation from "./components/Movie/Navigation";
import Search from "./routes/Search";
import "./App.css";
import ActorMovie from "./routes/ActorMovie";
import NowPlay from "./routes/NowPlay";
import SearchBar from "./components/Movie/SearchBar";
import Genres from "./routes/Genres";
import LoginForm from "./components/User/LoginForm";
import JoinForm from "./components/User/JoinForm";
import Myinfo from "./components/User/MyInfo";
import AllInfo from "./components/User/AllInfo";
import First from "./routes/First";
import UserUpdate from "./components/User/UserUpdate";
import DeleteUser from "./components/User/DeleteUser";
import Header from "./components/User/Header";
import OtherInfo from "./components/User/OtherInfo";

export const App = () => {
  const [login, setLogin] = useState(false);
  const [userId, setUserId] = useState();

  useEffect(() => {
    if( sessionStorage.getItem('login') !== null) {
      console.log("있음");
      setLogin(true);
    } else {
      console.log("없음");
      setLogin(false);
    }
  },[])

  return (
    <div className="App">
      <Router>
        <div className="left-20">
          <h1>
            {login ? (
              <Link className="main__home" to="/home">
              Movie Web
            </Link>  
            ) : (
              <Link className="main__home" to="/">
              Movie Web
            </Link>  
            )}
            
          </h1>
          <SearchBar login={login}/>
          <Navigation login={login}/>
          <AllInfo login={login} setUserId={setUserId} />
        </div>
        <div className="right-80">
            {login ? (
              <>
                <Header setLogin={setLogin}/>
                <Routes>
                  <Route path="/home" element={<Home />} /> {/* 정적 라우터 지원 */}
                  <Route path="/movie/:id"  element={<Detail />} /> {/* 동적 라우터 지원: [:id]로 적어야 됨 */}
                  <Route path="/search/:word" element={<Search />} />
                  <Route path="/find/:actid" element={<ActorMovie />} />
                  <Route path="/now" element={<NowPlay />} />
                  <Route path="/genre/:genresid" element={<Genres />} />
                  <Route path="/myinfo" element={<Myinfo />} />
                  <Route path="/otherinfo" element={<OtherInfo id={userId}/>} />
                  <Route path="/update" element={<UserUpdate />} />
                  <Route path="/withdraw" element={<DeleteUser />} />

                  <Route path="/" element={<First setLogin={setLogin} />} />
                  <Route path="/login" element={<LoginForm setLogin={setLogin} />} />
                <Route path="/join" element={<JoinForm />} />
                </Routes>
              </>
            ) : (
              <Routes>
                <Route path="/" element={<First />} />
                <Route path="/login" element={<LoginForm setLogin={setLogin} />} />
                <Route path="/join" element={<JoinForm />} />
              </Routes>
            )}
        </div>
      </Router>
    </div>
  );
}

export default App;