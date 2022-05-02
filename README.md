<br />

### ✨ Graphql_Apollo - 신항민

---

<br />

### 💫  프로젝트 소개

- Graphql_Apollo 기능 구현

<br />

### ⚙️  프로젝트 기획

1. Rest api 한계
2. Graphql_Apollo 이용하여 최적화를 고려

<br />

### 🛠 1-2 Rest api

> 1. Rest api 이란?
>
> - 데이터를 주고받을 주체들간 약속된 형식
> - URI 형식(어떤 정보를) X 요청 방식(어떻게 할 것인가)
>
> 2. Rest api 한계
>
> - Overfetching(💡 딱 필요한 정보들만 받아올 수는 없을까?)
> - Underfetching(💡 필요한 정보들을 요청 한 번에 받아올 수는 없을까?)

<br />

### 👀  1-3 GraphQL 강점

> 1. 필요한 정보들만 선택하여 받아올 수 있음
>
> - Overfetching 문제 해결
> - 데이터 전송량 감소
>
> 2. 여러 계층의 정보들을 한 번에 받아올 수 있음
>
> - Underfetching 문제 해결
> - 요청 횟수 감소
>
> 3. 하나의 endpoint에서 모든 요청을 처리
>
> - 하나의 URI에서 POST로 모든 요청 가능

<br />

### 🔨  1-4 Apollo GraphQL

> - 백엔드와 프론트엔드 모두 제공
> - 간편하고 쉬운 설정
> - 풍성한 기능들 제공

- GraphQL로 서비스를 만들려면?

  - GraphQL은 명세, 형식일 뿐

  <br />

### 🔧  2-1 Apollo server 구축하기

> 1. typeDef와 resolver를 인자로 받아 서버 생성
>
> - typeDef : - GraphQL명세에서 사용될 데이터, 요청의 타입 지정 - gql(template literal tag)로 생성됨
>
> - resolver : - 서비스의 액션들을 함수로 지정 - 요청에 따라 데이터를 반환, 입력, 수정, 삭제
>
> 2.  GraphQL Playground
>
> - 작성한 GraphQL type, resolver 명세 확인
> - 데이터 요청 및 전송 테스트

<br />

### 👨🏻‍💻 2-2 Query 구현하기

> 1. Query 루트타입
>
> - 자료요청에 사용될 쿼리들을 정의
> - 쿼리 명령문마다 반환될 데이터 형태를 지정
>
> 2. Type 살펴보기
>
> - 반환될 데이터의 형태를 지정
> - 자료형을 가진 필드들로 구성
>
> 3. Resolver 살펴보기
>
> - Query란 object의 항목들로 데이터를 반환하는 함수 선언
> - 실제 플로젝트에서는 MySQL 조회 코드 등..

<br />

### 🔑 3-1 서버 구성요소 모듈화

> 1. apollo-server 생성자 인자 모듈화
>
> - typeDefs: 단일 변수 또는 배열로 지정 가능
> - resolvers: 단일 Object 또는 Merge 된 배열로 가능

<br />

### 🔒 3-2 GraphQl의 기본 타입들

> 1. ! : Non Null
>
> - null을 반환할 수 없음
>
> 2. 열거타입 : 미리 지정된 값들 중에서만 반환( enum )
>
> 3. 리스트 타입 : 특정 타입의 배열은 반환( [ ] )
>
> 4. 객체 타입 : 사용자에 의해 정의된 타입들

<br />

### 💊 3-3 유니언과 인터페이스

> 1. Union( ... on )
>
> - 타입 여럿을 한 배열에 반환하고자 할 때 사용
>
> 2. Interface
>
> - 유사한 객체 타입을 만들기 위한 공통 필드 타입
> - 추상 타입 : 다른 타입에 implement 되기 위한 타입

<br />

### 🩹 3-4 인자와 인풋 타입

> 1. People 데이터 조건들로 필터 넣어 받아오기
>
> 2. 페이지로 나누어 받아오기
>
> 3. 별칭으로 받아오기
>
> 4. 인풋 타입

<br />

---

<br />

## 💻 React와 Apollo Client

<br />

> [💿 1. React와 Apollo Client](https://www.yalco.kr/@graphql-apollo/4-1/).
>
> [💿 2. Query와 Mutation을 사용하여 웹페이지 만들기](https://www.yalco.kr/@graphqlapollo/4-2/).
>
> [💿 3. Fragment 사용하기](https://www.yalco.kr/@graphql-apollo/4-3/).
