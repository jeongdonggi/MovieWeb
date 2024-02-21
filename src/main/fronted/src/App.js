import {
  HashRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Navigation from "./components/Navigation";
import Search from "./routes/Search";
import "./App.css";
import ActorMovie from "./routes/ActorMovie";
import NowPlay from "./routes/NowPlay";
import SearchBar from "./components/SearchBar";
import Genres from "./routes/Genres";
import LoginForm from "./components/User/LoginForm";
import JoinForm from "./components/User/JoinForm";
import Myinfo from "./components/User/MyInfo";
import AllInfo from "./components/User/AllInfo";
import First from "./routes/First";

export const App = () => {
  return (
    <div className="App">
      <Router>
        <div className="left-20">
          <h1>
            <Link className="main__home" to="/">
              Movie Web
            </Link>  
          </h1>
          <SearchBar />
          <Navigation />
        </div>
        <div className="right-80">
          <Routes>
            <Route path="/home" element={<Home />} /> {/* 정적 라우터 지원 */}
            <Route path="/movie/:id"  element={<Detail />} /> {/* 동적 라우터 지원: [:id]로 적어야 됨 */}
            <Route path="/search/:word" element={<Search />} />
            <Route path="/find/:actid" element={<ActorMovie />} />
            <Route path="/now" element={<NowPlay />} />
            <Route path="/genre/:genresid" element={<Genres />} />

            <Route path="/" element={<First />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/join" element={<JoinForm />} />
            <Route path="/myinfo" element={<Myinfo />} />
            <Route path="/allinfo" element={<AllInfo />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;