# node-notice_board_project2
트리스티의 Node js + vanilla js + Sequelize + docker mysql + jest project  
[**[트리스티의 Node js + vanilla js + Sequelize + docker mysql + jest 프로젝트에 오신 여러분을 환영합니다!]**](https://tristy.tistory.com/) 
 
[node-notice_board_project](https://github.com/WonDongGyun/node-notice_board_project)의 2탄!!!  

<br/>

요번에는 로그인 기능과 함께 돌아왔다! 추가로 시퀄라이저랑 도커, 그리고 jest도 사용해보자구~~  
꼭 필요한 부트스트랩 CSS만 적용하였습니다.  

login board Project  
use  node js, vanilla js, sequelize, docker mysql, jset  

<br/>

사용한 패키지 및 CSS  
-----------------
- **Express**  　　　=> node.js의 웹 프레임워크  
- **ejs**　　　　　=> node.js의 템플릿 엔진  
- **sequelize**　　=> node.js에서 DB 작업을 쉽게 해주는 ORM
- **jest**　　　　　=> javascript 테스트 라이브러리
- **BootStrap v5**　=> jquery는 이제 안녕~!　 jquery가 사라진 BootStrap을 사용하였습니다.  


<br/>
<br/>

폴더 구조  
-----------------  

<br/>

```bash
node-notice_board_project2
├─ node_modules
│  
├─ .vscode
│  
├─ authentication
│  └─ auth_login.js
│  
├─ config
│  └─ config.json
│  
├─ migrations
│  └─ create-account.js
│  └─ create-board.js
│  └─ create-comment.js
│  
├─ models
│  └─ account.js
│  └─ board.js
│  └─ comment.js
│  └─ index.js
│  
├─ views
│  ├─ account
│  │  └─ account.js
│  │  └─ account.spec.js
│  │  └─ login.ejs
│  │  └─ signUp.ejs
│  │
│  ├─ basicBoard
│  │  └─ basicBoard.js
│  │  └─ basicBoard.ejs
│  │  └─ readBoard.ejs
│  │  └─ updateBoard.ejs
│  │  └─ writeBoard.ejs
│  │
│  ├─ include
│  │  └─ header.ejs
│  │  └─ footer.ejs
│  │  └─ modal.ejs
│  
├─ seeders
│  
│  
└─ main.js
└─ package-lock.json
└─ package.json
```

<br/>
<br/>
<br/>


무엇이 달라졌나요?
============= 
[node-notice_board_project](https://github.com/WonDongGyun/node-notice_board_project) 에서 어떤 점이 달라졌을까요?  

## mongoose (mongoDB) -> Sequelize

<br/>

mongoose는 비관계형 데이터베이스인 mongoDB를 다룰 때 사용하는 모듈이고  
Sequelize는 mysql, mariaDB 등의 관계형 데이터베이스를 다룰 때 사용하는 모듈입니다.  

저번 요구사항에는 login 기능이 없는 게시판이어서 mongoDB로도 충분히 만들 수 있었지만,  
요번에는 login이 존재하는 게시판이고 저번 보다 다양한 요구조건들이 있었기 때문에 관계형 데이터베이스의 필요성을 느꼈습니다.  
그래서 Sequelize를 사용해서 만들어 봤습니다.  


<br/>



<br/>
<br/>


작동 방식 그림 
-----------------  

<br/>

<p align="center"><img src="https://user-images.githubusercontent.com/52685665/112131093-8263b200-8c0c-11eb-8e46-63a5d40a6d3e.png"></p>


<br/>
<br/>

주의사항 및 Tip
==============


