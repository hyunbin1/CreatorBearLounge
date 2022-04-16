## 예상 스택

React, firebase, figma

## 페이지 개요

### 1. 메인페이지

- navbar: 카테고리, Metamask 연결
- section1: 웹페이지 환영글
- section2: Creator Bears Club에 관련한 소개
- section3: Open Sea 링크 & my nft 소개
- section4: RoadMap - creator bears Club이 나아갈 방향 소개
- section5: 팀원과 파트너 소개

### 2. 팀 소개 페이지

### 3. Holder

- CBC에서 제공하는 컨텐츠들과 이와 관련된 카테고리

### 4. Holder 세부 페이지

- CBC에서 제공하는 컨텐츠들의 세부 내용들 제공 (아티스트 프로필, 내용, 다운로드 버튼)

<br/>

## 요구 사항 분석

1. 로그인:

- Metamask 확장 프로그램과 연동하여 계정과 서버를 연동

2. Holder 페이지:

- 로그인 여부와 관계없이 CBC에서 제공하는 컨텐츠가 무엇이 있는지 볼 수 있음. (하지만 다운로드는 하지 못함)
- 로그인을 하면 다운로드 버튼을 누를 수 있게 되고, 저장되어 있는 google Drive에 연결됨
- 가지고 있는 NFT개수에 따라서 5개 이상 가지고 있는 회원과 1~4개를 가지고 있는 회원의 다운로드 가능 컨텐츠는 차이를 둠.
- 한 계정 당 횟수에 관계없이 다운로드 횟수는 0혹은 1로만 지정함

3. ADMIN:

- 분배: 작가 별 자신의 작품의 다운로드 횟수에 따라 수익이 차등 분배됨. - 작가 DB 속성: PK, 작가 이름, 등록한 컨텐츠 명 ..., ..., 다운로드 횟수 - 분배되어야 할 수익과 작가들의 다운로드 퍼센트에 따라서 차등분배되도록 만듬
  <br/>

## 기획 초기 이미지

<img src = "https://user-images.githubusercontent.com/63040492/163362678-983ec58f-0fd6-4f33-b7be-e413a9992778.png"  width="300" height="300">
<img src = "https://user-images.githubusercontent.com/63040492/163362697-071823a5-d8d5-43e0-998f-b3ac35cba6b8.png"  width="300" height="300">
<img src = "https://user-images.githubusercontent.com/63040492/163362713-b462c5a1-8a51-495e-9925-515941ff7b5d.png"  width="300" height="300">
