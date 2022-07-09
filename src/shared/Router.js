import { BrowserRouter, Routes, Route } from "react-router-dom";


import Main from "../pages/Main" // 메인
import Save from "../pages/Save";  // 아끼기
import MyPage from "../pages/MyPage"; // 마이페이지 
import Community from "../pages/Community"; // 커뮤니티 
import Detail from "../pages/Detail"; //상세페이지
import Ranking from "../pages/Ranking" // 통계
import Login from "../pages/Login" // 로그인
import SignUp from "../pages/SignUp" // 회원가입
import FindId from "../pages/FindId" // 아이디 찾기
import FindPw from "../pages/FindPw"; // 비밀번호 찾기
import FindPwChange from "../pages/FindPwChange"; // 비밀번호 변경
import Favorite from "../pages/Favorite"; // 즐겨찾기
import History from "../pages/History"; // 히스토리
import Proflie from "../pages/Proflie"; // 프로필


function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="*" element={<NotFound />} /> */}
        {/* <Route path="/main" element={<Main />} />  */}
        <Route path="/" element={<Save />} />
        {/* <Route path="/statistics" element={<Statistics />} /> */}
        {/* <Route path="/detail/:boardId" element={<Detail />} /> */}
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/community" element={<Community />} />
        <Route path="/community/:id" element={<Community />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/findid" element={<FindId />} />
        <Route path="/findpw" element={<FindPw />} />
        <Route path="/findpwurl" element={<FindPwChange />} />
        <Route path="/detail/:boardId" element={<Detail />} />
        <Route path="/Findpw/:id" element={<FindPwChange />} />
        <Route path="/favorite" element={<Favorite />} />
        <Route path="/history" element={<History />} />
        <Route path="/proflie" element={<Proflie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;