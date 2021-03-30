# Chapter2. CSS설계 기본 및 실전

## 2-1 CSS 기본 상세도와 셀렉터

### 셀렉터의 종류

- 단순 셀렉터
  - 요소형 셀렉터 ex) p {}
  - 전체 셀렉터 ex) \* {}
  - 속성 셀렉터 ex) a[href="http://www.w3c.org/"] {}
  - 클래스 셀렉터 ex) .my-class {}
  - ID 셀렉터 ex) #my-id {}
  - 의사 클래스(pseudo-class) ex) a:visited {}
- 의사 요소 (pseudo-element) ex) a::before {}
- 결합자(Combinator)
  - 손자 결합자(Descendant Combinator) ex) div p
  - 자녀 결합자(Child Combinator) ex) div > p
  - 형제 결합자(Sibling Combinator)
    - 인접 형제 결합자(Adjacent Sibling Combinator): ex) div + p
    - 일반 형제 결합자(General Sibling Combinator): ex) div ~ p

### 캐스캐이딩 기초

우선순위

1. 중요도 - important
2. 상세도
3. 코드 순서

### 상세도 기초

1. ID 셀렉터
2. 클래스 셀렉터/ 속성 셀렉터/ 의사 클래스
3. 요소형 셀렉터(의사 요소)

http://specificity.keegan.st/ 에서 확인 가능

요소 셀렉터 < 클래스 셀렉터 < 속성 셀렉터 < 의사 클래스 < ID 셀렉터

## 2-2 리셋 CSS

### 브라우저의 기본 스타일

브라우저마다 기본 스타일이 다름

### 하드 리셋 계열 CSS

하드 리셋 계열 CSS는 브라우저의 기본 스타일을 활용하지 않는 디자인 프로젝트에 적합

> 주요 하드리셋 계열 CSS

- HTML5 Doctor Reset CSS: https://html5doctor.com/html-5-reset-stylesheet
- css-wipe: https://github.com/stackcss/css-wipe

### 노멀라이즈 리셋 계열 CSS

브라우저 간 차이 혹은 버그를 없애면서 유용한 기본 스타일은 그대로 활용하는 것

> 주요 노멀라이즈 계열 CSS

- Normalize.css: https://necolas.github.io/normalize.css/
- sanitize.css: https://github.com/csstools/sanitize.css

### 리셋 CSS의 영향

- 잘못 선택하면 모듈 작성 시 코드와 개발 비용 증가
- 중간에서 다른 계열로 변경하는 것은 현실적이지 않다

## 2-3 영단어를 결합하는 방식의 이름

- sub_title: 하이픈 케이스/케밥 케이스
- sub_title: 스네이크 케이스
- subTitle: 로워 캐멀 케이스/캐멀 케이스
- SubTitle: 어퍼 캐멀 케이스/파스칼 케이스

## 2-4 좋은 CSS 설계의 네 가지 목표

- 예측 가능하다
- 재사용 가능하다
- 유지 보수 가능하다
- 확장 가능하다

## 2-5 CSS 설계 실전과 여덟 가지 포인트

### 1. 특성에 따라 CSS를 분류한다.

> 모듈 리팩터링

- 베이스 그룹(사이트 전체에 기반이 되는 베이스 스타일) 정의
  - font-family 등
- 레이아웃 그룹(헤더, 푸터, 콘텐츠 영역 형성) 정의
  - 레이아웃은 l*, ly* 접두사 사용
- 모듈 그룹(재사용 할 것) 정의
  - bl\_ 이라는 접두사 붙임

> 모듈에 대한 레이아웃 지정

모듈 자체에는 레이아웃과 관련된 지정은 하지 않는 것이 좋음

`레이아웃과 관련된 지정`

- position(static, relative 제외)
- z-index
- top/right/bottom/left
- float
- width
- margin

### 2. HTML과 스타일을 느슨하게 결합한다.

**'요소형 셀렉터를 사용하지 않는다.'** = **'HTML과 스타일링을 약하게 연결'**  
좋은 CSS 설계의 네 가지 목표 중 재사용 가능하다, 유지 보수 가능하다와도 이어짐
ex)

- h2, h3을 같은 셀렉터 안에 묶는게 아니라 title, sub-title 등으로 각기 다른 class명을 줌
- div요소가 p요소로 바뀌게 되면 스타일 적용안됨
  - 5.상세도를 지나치게 높이지 않는다와도 연결됨

**속성 셀렉터의 특정값(ex. a[href="https://google.co.kr"])을 사용한 스타일링 또한 기본적으로 피해야 함**

### 3. 영향 범위를 지나치게 넓히지 않는다.

'지나치게' 가 핵심

- 범위를 줄인다
  - 가능한 가장 가까운 부모 요소까지 셀렉터에 포함시키거나,
  - 손자 셀렉터뿐만 아니라 자녀 셀렉터를 사용할 수 있는지 검토
- 영향 범위가 넓은 CSS에 포함되는 스타일링을 가능한 최소한으로 한다.

### 4. 특정 콘텍스트에 지나치게 의존하지 않는다.

'콘텍스트'란 위치 혹은 상황을 의미함

```html
<!-- #main .bl_module.main-module 이면 main안에서만 작동-->
<article id="main" class="ly_cont">
  <div class="bl_module main-module"></div>
</article>
<article id="main2" class="ly_cont">
  <div class="bl_module main-module"></div>
</article>
```

### 5. 상세도를 지나치게 높이지 않는다.

- 셀렉터를 예측하기 어렵다.
- 다른 요소(부모 요소 등)에 대한 의존도가 높아진다.
- 덮어쓰기가 어렵다.
- 유지 보수에 들어가는 수고가 증가한다.

**셀렉터를 사용할 때는 클래스 셀렉터를 사용한다**
