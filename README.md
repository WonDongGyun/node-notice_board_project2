# node-notice_board_project2
트리스티의 Node js + vanilla js + Sequelize + docker mysql + jest project  
[**[트리스티의 Node js + vanilla js + Sequelize + docker mysql + jest 프로젝트에 오신 여러분을 환영합니다!]**](https://tristy.tistory.com/) 
 
[node-notice_board_project](https://github.com/WonDongGyun/node-notice_board_project)의 2탄!!!  

<br/>
<br/>

요번에는 로그인 기능과 함께 돌아왔다! 추가로 시퀄라이저랑 도커, 그리고 jest도 사용해보자구~~  
꼭 필요한 부트스트랩 CSS만 적용하였습니다.  

login board Project  
use  node js, vanilla js, sequelize, docker mysql, jset  

<br/>
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


작동 방식 그림 
-----------------  

<br/>

이전의 프로젝트와 달라진 점은 약간의 파일 구조가 변경되었다는 것, 그리고 인증 middleware가 추가되었습니다.  

<br/>
<br/>

<p align="center"><img src="https://user-images.githubusercontent.com/52685665/113508669-41fd2000-958c-11eb-962d-49f42bc8a971.png"></p>


<br/>
<br/>


무엇이 달라졌나요?
============= 
[node-notice_board_project](https://github.com/WonDongGyun/node-notice_board_project) 에서 어떤 점이 달라졌을까요?  

<br/>
<br/>

*  새로워진 vanilla JS AJAX !!!  
*  Sequelize를 사용해보자 !!!  
*  Jest를 사용해 테스트를 해보자 !!!
*  docker My Sql로 만들어보자 !!!
*  ejs를 활용해보자!!!
*  jwt로 안전하게 로그인 하고 기능을 사용해 보자!!!


<br/>
<br/>

## Docket desktop MySql 사용하기  

[Docker Desktop 설치](https://www.docker.com/get-started)  

<br/>
<br/>
  
도커를 설치해줍시다.  
**단! 컴퓨터 시작시 BIOS에서 hardware virtualization 기능을 켜주셔야 하고,**  
**window 기능 중에서 Hyper-V 옵션을 미리 체크해 주셔야 합니다.**  


<br/>
<br/>

## mongoose (mongoDB) -> Sequelize

<br/>
<br/>

mongoose는 비관계형 데이터베이스인 mongoDB를 다룰 때 사용하는 모듈이고  
Sequelize는 mysql, mariaDB 등의 관계형 데이터베이스를 다룰 때 사용하는 모듈입니다.  

<br/>
<br/>

저번 요구사항에는 login 기능이 없는 게시판이어서 mongoDB로도 충분히 만들 수 있었지만,  
요번에는 login이 존재하는 게시판이고 저번 보다 다양한 요구조건들이 있었기 때문에 관계형 데이터베이스의 필요성을 느꼈습니다.  
그래서 Sequelize를 사용해서 만들어 봤습니다.  
  
<br/>
<br/>

Sequelize란 node js에서 mysql, mariaDB 등의 관계형 데이터베이스 ORM 입니다.  
ORM은 Object Relation Mapping (객체-관계)의 약자로 자동으로 DBMS의 데이터를 객체 형태로 변환해줍니다.  

다만 단점이라면, 데이터베이스 끼리 join을 실행할때 코드가 불편하고 문서가 지저분해집니다.  

<br/>
<br/>

아래의 명령어를 사용해 Docker로 Mysql 서버를 띄워봅시다.  
주의 하실 점은 터미널을 끄게 되면 안의 데이터가 전부 사라져버립니다.  
만약 터미널이 꺼졌을 때, 데이터가 전부 사라지지 않게 하시려면 ```--rm``` 명령어를 빼주세요.
```bash
docker run --rm -p 3306:3306 --name test-db -e MYSQL_ROOT_PASSWORD=1234 mysql:5.7 mysqld --character-set-server=utf8mb4 --collation-server=utf8mb4_unicode_ci
```

<br/>
<br/>

다음으로, vsCode 좌측 사이드바의 MySQL탭 우측의 ```+``` 버튼을 눌러주세요.  
그리고 해당 정보를 입력해줍시다.  

```
host: 127.0.0.1  
user: root  
password: 1234  
port: 3306  
certificate file path: 그냥 넘겨주세요  
```

<br/>
<br/>

입력이 완료되면, 하단의 그림처럼 데이터베이스에 접속할 수 있습니다.

<br/>
<br/>


<p align="center"><img src="https://user-images.githubusercontent.com/52685665/113506942-baf77a00-9582-11eb-9b4f-86bfcffdfe43.png"></p>


<br/>
<br/>


## 새로운 vanilla JS AJAX  

<br/>
<br/>

이전 프로젝트에서는 XMLHttpRequest()를 사용해서 AJAX 통신을 했었습니다.  
작동은 이상이 없었지만, 코드가 길어지고 알아보기 힘들다는 단점이 있었습니다.  

<br/>

이걸 보완한 것이 바로 javascript fetch 입니다. 방식은 XMLHttpRequest()와 같지만, 훨씬 간단하게 코드를 짤 수 있습니다.

코드를 보시면 이전 프로젝트와 비교했을 때 훨씬 간결해진것을 알 수 있습니다.

```javaScript
            function move_writeBoard() {
                var myLoginModal = new bootstrap.Modal(document.getElementById("loginModal"), {});

                const url = '/auth/writeBoard';
                const init = {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': 'Bearer ' + localStorage.getItem("token"),
                    },
                    credentials: 'same-origin'
                };

                fetch(url, init)
                    .then((res) => res.json())
                    .then(res => {
                        if (res.status == 200 || res.status == 201) {
                            return location.href = '/writeBoard';
                        } else {
                            myLoginModal.show();
                        }
                    })
            }
```

<br/>
<br/>


## Jest 사용하기  

<br/>
<br/>

Jest는 자바스크립트와 타입스크립트에서 사용하는 테스팅 라이브러리 입니다.  

<br/>

해당 프로젝트에서는 Jest를 사용해서 회원가입 조건에 맞는지 안맞는지 검사하고,  
데이터베이스와 비교해서 존재하는 아이디 인지 검사합니다.  

<br/>

다만, Jest로 테스트 할 때는 데이터베이스에 접근한다고 가정하고 하는 것이기 때문에,  
실제로 접근을 하거나 비교하지 않습니다.    

<br/>

Jest의 Mock 함수를 사용해서 가공의 데이터가 존재한다고 가정하고 데이터베이스 테스트를 진행했습니다.  
Jest 모듈을 설치하고, ```npm test ```  를 입력하면 account.spec.js가 account.js에 접근하여 테스트를 진행합니다.  

<br/>
<br/>


## Jwt 사용해서 로그인 관리하기  

<br/>
<br/>





