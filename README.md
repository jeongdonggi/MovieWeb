# Movie App

react를 이용한 Movie App. TMDB API를 이용하였다.

## 개발 언어
![REACT](https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=FFFFFF)
![SpringBoot](https://img.shields.io/badge/SpringBoot-6DB33F?style=flat&logo=SpringBoot)
![MyBatis](https://img.shields.io/badge/MyBatis-000000?style=flat)

<hr>

### API 연결
axois로 TMDB API를 가져와서 사용하였다. 프론트는 React, 백엔드는 SpringBoot로 구현하였다.
restAPI를 구현해보기 위해 restController로 값을 받아주었고 리액트에서는 Router를 이용하여 화면전환을 해주었다.

## 주요 기능

### 네비게이션

네비게이션으로는 Movie Web을 누르면 나오면 맨 처음 화면, 상영작, 장르가 있다.

### 기본화면
<img width="1120" alt="image" src="https://github.com/jeongdonggi/MovieWeb/assets/100845304/2a00d7c4-bca9-4afd-b9b0-fdfe7a60999e">

로그인과 회원가입을 해야 기능을 사용할 수 있도록 Router에 조건을 달아주었다.

### 값 입력 - 로그인, 회원가입, 업데이트, 회원탈퇴 등
<img width="1120" alt="image" src="https://github.com/jeongdonggi/MovieWeb/assets/100845304/3beac59b-d7ea-438f-885a-ef60e4c61713">

로그인과 회원가입은 팝업 형식으로, 나머지는 사이트에서 값을 넣을 수 있도록 해주었다.

### 내 정보
<img width="1120" alt="image" src="https://github.com/jeongdonggi/MovieWeb/assets/100845304/89b68034-89fd-4956-be96-de246ec0a5cc">

내 정보를 볼 수 있고 닉네임, 비밀번호 업데이트 및 탈퇴가 가능하다.

### 회원 목록 - 추가
<img width="1123" alt="image" src="https://github.com/jeongdonggi/MovieWeb/assets/100845304/d3b60813-3578-4b9f-9fea-8a91628e61e4">

누르게 되면 회원의 닉네임이 보이게 된다.

### 홈
<img width="959" alt="image" src="https://github.com/jeongdonggi/MovieWeb/assets/100845304/0a281f40-0cc4-4aa1-903e-b73a4c34d24b">

홈에는 인기 있는 영화와 평점 좋은 영화, 장르 영화 중 가장 인기 많은 5가지를 보여준다.

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
<img width="959" alt="image" src="https://github.com/jeongdonggi/MovieWeb/assets/100845304/e0d56096-5fe0-48cc-bb68-8ca3b1fc27be">
<img width="959" alt="image" src="https://github.com/jeongdonggi/MovieWeb/assets/100845304/706dd728-785c-46e4-ab80-8c2e2d991744">
<img width="959" alt="image" src="https://github.com/jeongdonggi/MovieWeb/assets/100845304/9fc0ec3c-2f88-410e-b873-ca557a75309f">

현재 영화의 세부 정보를 보여준다.
영화 정보와 영상, 배우, 포스터, 스틸컷, 비슷한 장르의 영화를 보여주게 된다.

### 배우
<img width="959" alt="image" src="https://github.com/jeongdonggi/MovieWeb/assets/100845304/251c4ca0-7b3a-45b5-a921-4b8874009761">

세부 정보에서 배우를 누르면 나오는 배우의 영화들이다. 여기서는 이름을 한국어로 바꿀 수 있도록 API를 사용해서 변경해주었다.

### 비슷한 영화 장르 추천

이 부분도 포스터를 누르면 영화 세부 정보 화면으로 넘어가게 된다.

## 구현 중인 부분

1. 홈에서의 5가지 장르의 영화를 나중에 회원가입 시 정한 장르 5개로 바꿔줄 예정이다.
2. 영화에 좋아요나 찜을 할 수 있도록 해줄 예정이다. 이때 다른사람의 찜이나 좋아요 목록을 볼 수 있도록 해줄 예정
3. 현재 SQL은 User밖에 없음, 각 상황에 맞는 Dto 만들어서 사용하는 중
