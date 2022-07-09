import { createSlice } from "@reduxjs/toolkit";
import { setCookie } from "./cookie";
import instance from "../../shared/axios";
import axios from "axios";
import { useNavigate } from "react-router-dom";


//login
export const LoginDB = (loginInfo, setModalStr, setNavToggles) => {
  return async function (dispatch) {
    console.log(loginInfo);
    await instance.post("/api/user/login", loginInfo, {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      // .then(onLoginSuccess)
      .then((response) => {
        console.log(response);
        if (response.data.code === 1002) {
          setModalStr('로그인 실패! 아이디 또는 비밀번호를 확인해 주세요');
          setNavToggles(true);
          return;
        } else {
          console.log(response)
          const accessToken = response.data.accessToken;
          const refreshToken = response.data.refreshToken;

          localStorage.setItem("accessToken", accessToken);
          setCookie('refreshToken', refreshToken, {
            path: "/",
            secure: true,
            sameSite: 'none',
          })
          // window.location.href = "/"
          dispatch(isLogin(true))
        }
      })
      .catch((error) => {
        console.log("로그인 실패") //로그인실패 이걸로뜸
      });
  };
};


// 로그인한 사용자 정보 조회 (모든 페이지? 필요한 페이지만 요청?)
export const getUserInfoDB = () => {
  return async function (dispatch) {
    await instance.get("/api/myInfo", {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      .then((response) => {
        console.log(response);
        const username = response.data.data.username;
        const nickname = response.data.data.nickname;
        const email = response.data.data.email;

        const userInfo = {
          username: username,
          nickname: nickname,
          email: email
        }
        console.log(userInfo)

        dispatch(userInfo(userInfo))
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

// 회원가입 (유저 등록)
export const addUserDB = (userInfo) => {
  return async function (dispatch) {
    console.log(userInfo);
    await instance.post("/api/user/register", userInfo, {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      .then((response) => {
        console.log("유저 등록 성공");
        window.location.reload('/')
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  };
};

// 아이디 중복 체크
export const idCheckDB = (id, setUserIdAlert) => {
  return async function (dispatch) {
    await instance.post("/api/user/register/checkUsername", { username: id }, {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.result === true) {
          setUserIdAlert("사용 가능한 아이디입니다")
        } else {
          setUserIdAlert("중복된 아이디입니다")
        }
      })
      .catch((err) => {
        console.log(err)
      });
  };
};

// 이메일 중복 체크
export const emailCheckDB = (email, setUserEmailAlert) => {
  return async function (dispatch) {
    console.log(email);
    await instance.post("/api/user/register/checkEmail", { email: email }, {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.result === true) {
          setUserEmailAlert("사용 가능한 이메일입니다")
        } else {
          setUserEmailAlert("중복된 이메일입니다")
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  };
};

// 닉네임 중복 체크
export const nickCheckDB = (nick, setUserNickAlert) => {
  return async function (dispatch) {
    console.log(nick);
    await instance.post("/api/user/register/checkNickname", { nickname: nick }, {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      .then((res) => {
        if (res.data.result === true) {
          setUserNickAlert("사용 가능한 닉네임입니다")
        } else {
          setUserNickAlert("중복된 닉네임입니다")
        }
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  };
};

// 아이디 찾기
export const findIdDB = (email) => {
  return async function (dispatch) {
    console.log(email);
    await instance.post("/api/user/findId", { email: email }, {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
        if (res.data.result === false) {
          const result = res.data.result;
          dispatch(findIdResult(result))
        } else {
          const findInfo = {
            userFindId: res.data.data.userId,
            provider: res.data.data.provider,
            result: res.data.result,
          }
          dispatch(findIdResult(findInfo))
        }
      })
      .catch((error) => {
        window.alert(error);
      });
  };
};

// 비밀번호 찾기
export const findPwDB = (info, setfindPwPop) => {
  return async function (dispatch) {
    console.log(info);
    await instance.post("/api/user/findPassword", info, {
      "Content-Type": "application/json",
      withCredentials: true,
    })
      .then((res) => {
        console.log(res)
        dispatch(findPwResult(res.data.respMsg));
      })
      .catch((error) => {
        console.log(error)
        window.alert(error.response.data.message);
      });
  };
};

// 비밀번호 변경 post요청
export const changePw = (data) => {
  return async function (dispatch) {
    await instance.post("/api/user/changePassword", (data), {
      "Content-Type": "application/json",
      withCredentials: true,
      // Authorization : `Bearer ${accessToken}`, //토큰담아서 보내기
    })
      .then((response) => {
        dispatch(findPwResult(response.data.respMsg));
      })
      .catch((error) => {
        window.alert(error.response.data.message);
      });
  };
};

// 리듀서 
const userSlice = createSlice({
  name: "user",
  initialState: {
    isLogin: false,
    userInfo: [],
    findIdResult: [],
    findPwResult: "",
    idCheckResult: ""
  },
  reducers: {
    isLogin: (state, action) => {
      console.log(action.payload);
      state.isLogin = action.payload;
    },
    userInfo: (state, action) => {
      console.log(state, action);
      console.log(action.payload);
      state.userInfo = action.payload;
    },
    findIdResult: (state, action) => {
      console.log(action);
      console.log(action);
      console.log(action.payload);
      state.findIdResult = action.payload;
    },
    findPwResult: (state, action) => {
      console.log(action.payload);
      state.findPwResult = action.payload;
    },
    idCheckResult: (state, action) => {
      console.log(action.payload);
      state.idCheckResult = action.payload;
    },

  }
});

// export const userActions = userSlice.actions;
export const { isLogin, userInfo, findIdResult, findPwResult, idCheckResult } = userSlice.actions;
export default userSlice.reducer;