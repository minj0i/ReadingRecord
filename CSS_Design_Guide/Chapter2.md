# Chapter2. CSS설계 기본 및 실전
## 2-1 CSS 기본 상세도와 셀렉터
### 셀렉터의 종류
- 단순 셀렉터
  - 요소형 셀렉터 ex) p {}
  - 전체 셀렉터 ex) * {}
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
