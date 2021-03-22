# Chapter1 CSS의 역사와 문제점

## 1-1 CSS의 시작
> CSS의 목적
- 문서구조와 스타일의 분리
- 같은 스타일 요소 반복 사용

## 1-2 CSS의 문제점
- CSS에서는 모든 것이 전역 범위다

## 1-3 복잡해지는 웹 개발
- 변경할 수 없는 HTML/CSS의 결합
  - 익스포트한 html, css 변경하기 힘듬
- 늘어나는 페이지 수
  - 빈번한 충돌, CSS is too fragile
- 빈번하게 변경되는 '상태'
  - 콘텐츠 애니메이션
  - 사용자 조작에 따라 표시되는 내용이 전환(ex. 현재 탭 표시)

## 1-4 해결책으로 탄생한 CSS 설계
- 추상화한다.
  - 다른 스타일 사이에서 공통화할 수 있는 것은?
  - 공통된 부분을 추출해서 하나로 모을 수 있는가?
- 나눈다.
  - 파일을 나눈다
  - 부품(parts) 크기로 나눈다
  - 역할에 따라 이름을 나눈다

- 설계 기법
  - OOCSS
  - SMACSS
  - BEM
  - PRECSS

## 1-5 CSS 설계와 디자인 시스템 연동
- 브래드 프로스트(Brad Frost)의 아토믹 디자인(Atomic Design)   
https://atomicdesign.bradfrost.com
  - Atoms(원자): 가장 작은 단위가 되는 모듈로 `버튼`, `입력 필드`, `제목` 등
  - Molecules(분자): 원자가 모여 그룹을 만든 상태, `검색 폼` 등 
  - Organisms(유기체): 분자가 모인 것, 로고(원자), 메뉴(분자), 검색 폼(분자) 등이 모인 `헤더` 등
  - Templates(템플릿): 레이아웃
  - Pages(페이지): 실제 콘텐츠 적용한 것

![아토믹디자인](https://bradfrost.com/wp-content/uploads/2019/06/atomic-design-product-700x413.jpg)