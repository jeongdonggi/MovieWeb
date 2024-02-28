# Movie App

react를 이용한 Movie App. TMDB API를 이용하였다.

## 개발 언어
![REACT](https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=FFFFFF)
![SpringBoot](https://img.shields.io/badge/SpringBoot-6DB33F?style=flat&logo=SpringBoot)
![MyBatis](https://img.shields.io/badge/MyBatis-000000?style=flat)

<hr>

### API 연결
axois로 TMDB API를 가져와서 사용하였다. 프론트는 React(PropTypes 사용), 백엔드는 SpringBoot로 구현하였다.
restAPI를 구현해보기 위해 restController로 값을 받아주었고 리액트에서는 Router를 이용하여 화면전환을 해주었다.
db는 MySQL을 이용하였다.

### DB
<img width="500" alt="image" src="https://github.com/jeongdonggi/MovieWeb/assets/100845304/85e5c74a-a2fa-4f9f-9150-8cd59973ddc7">

movieapp: User 정보
usertags: 로그인 시 넣은 tag
tag: 영화 장르
usermovie: 하트를 눌러서 저장한 영화

### Proxy
```cmd
npm install http-proxy-middleware --save
```
이를 이용해 proxy로 포트를 8080으로 연결해주었다.
또한 build.gradle에서 build 시 react build를 포함할 수 있도록 해주었다.

### 시연 동영상

https://youtu.be/rckWAuyVa8E

## 주요 기능

### 네비게이션

네비게이션으로는 Movie Web을 누르면 나오면 맨 처음 화면, 상영작, 장르가 있다.

### 기본화면
<img width="1120" alt="image" src="https://github.com/jeongdonggi/MovieWeb/assets/100845304/2a00d7c4-bca9-4afd-b9b0-fdfe7a60999e">

로그인과 회원가입을 해야 기능을 사용할 수 있도록 Router에 조건을 달아주었다.

### 값 입력 - 로그인, 회원가입, 업데이트, 회원탈퇴 등
<img width="1120" alt="image" src="https://github.com/jeongdonggi/MovieWeb/assets/100845304/3b5ef867-9d87-41b6-9385-4d49c0918586">


로그인과 회원가입은 팝업 형식으로, 나머지는 사이트에서 값을 넣을 수 있도록 해주었다.

### 홈
<img width="1120" alt="image" src="https://github.com/jeongdonggi/MovieWeb/assets/100845304/e08d114f-7de7-4f9e-81bb-b51eb282362c">

홈에는 인기 있는 영화와 평점 좋은 영화, 회원 가입 시 고른 5가지의 장르 영화를 보여준다.
내 정보를 보거나 옆에 있는 회원들의 정보를 볼 수 있다. 또한 로그아웃도 가능하다.
왼쪽에 있는 값들은 fixed해놔서 페이지를 내려도 따라온다.

### 내 정보
<img width="1120" alt="image" src="https://github.com/jeongdonggi/MovieWeb/assets/100845304/a29647b5-160c-438c-9166-2420bbe39cb2">

내 정보를 볼 수 있고 닉네임, 비밀번호 업데이트 및 탈퇴가 가능하다. 선호하는 영화에 있는 포스터를 누르면 디테일로 넘어가게 된다.


### 회원 정보
<img width="1120" alt="image" src="https://github.com/jeongdonggi/MovieWeb/assets/100845304/026c4a4c-b799-42c3-902d-953b1ebe64d6">

왼쪽에 있는 회원을 누르게 되면 회원 정보 창으로 넘어오게 된다.

### 검색

<img width="959" alt="image" src="https://github.com/jeongdonggi/MovieWeb/assets/100845304/2318bc8b-0af0-4866-81db-fd5d3ec6bf5e">

검색 결과는 황야를 적은 모습으로 검색이 되는 것을 보여주기 위해 검색창에 황이라는 단어를 띄워놓았다.

### 상영작
<img width="959" alt="image" src="https://github.com/jeongdonggi/MovieWeb/assets/100845304/ded91e9d-a044-46d8-9db7-b069f3b58a84">

현재 상영하고 있는 영화를 보여준다.

### 장르
<img width="959" alt="image" src="https://github.com/jeongdonggi/MovieWeb/assets/100845304/70b2358a-da86-4690-82ac-2fea80bafc35">

API로 받아 올 장르를 고르면 맞는 결과가 나온다.

### 세부 정보
<img width="1120" alt="image" src="https://github.com/jeongdonggi/MovieWeb/assets/100845304/c79b35a2-561c-4084-8db8-1684ef8f426c">
<img width="959" alt="image" src="https://github.com/jeongdonggi/MovieWeb/assets/100845304/706dd728-785c-46e4-ab80-8c2e2d991744">
<img width="959" alt="image" src="https://github.com/jeongdonggi/MovieWeb/assets/100845304/9fc0ec3c-2f88-410e-b873-ca557a75309f">

현재 영화의 세부 정보를 보여준다.
영화 정보와 영상, 배우, 포스터, 스틸컷, 비슷한 장르의 영화를 보여주게 된다.
배우를 누르면 배우가 출현한 영화 목록이 나온다.

또한 하트를 누르면 유저 정보에서 누른 영화를 볼 수 있다.

### 배우
<img width="959" alt="image" src="https://github.com/jeongdonggi/MovieWeb/assets/100845304/251c4ca0-7b3a-45b5-a921-4b8874009761">

세부 정보에서 배우를 누르면 나오는 배우의 영화들이다. 여기서는 이름을 한국어로 바꿀 수 있도록 API를 사용해서 변경해주었다.

### 비슷한 영화 장르 추천

이 부분도 포스터를 누르면 영화 세부 정보 화면으로 넘어가게 된다.

## 구현하면서 생긴 문제

1. Router
   
   Router를 사용하다보니 값이 하트를 누르고 추천 영화를 보러 들어가게 되면 Loading값이 변경되어 있는 상태여서 하트를 누른 값인지 DB를 찾아보기 전에 값이 넘어가서 하트가 눌렸다. 이 값을 useEffect를 이용하여 새로운 화면으로 넘어가기 전에 값을 변경해주는 방식으로 고쳤다.
