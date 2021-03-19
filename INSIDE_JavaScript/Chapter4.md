# Chapter4. 함수와 프로토타입 체이닝

## 4.1 함수 정의
- 함수 선언문(function statement)
- 함수 표현식(function expression)
- Function() 생성자 함수

### 4.1.1 함수 리터럴
```javascript
// 1. 자바스크립트 함수 리터럴은 function으로 시작
// 2. add라는 함수의 이름은 있어도 되고 없으면 익명함수라 한다
// 3. 매개변수 타입은 기술 안함
function add(x, y) {
  // 4. 함수 몸체 - 실행되는 코드 부분
  return x + y;
}
```

### 4.1.2 함수 선언문 방식으로 함수 생성하기
리터럴 형태와 같지만 **반드시 함수명이 정의**되어 있어야 한다.

### 4.1.3 함수 표현식 방식으로 함수 생성하기
변수에 할당하여 함수를 생성하는 것   
생성된 함수는 함수명 없으므로 함수리터럴 익명함수(anonymous function)
```javascript
var add = function(x, y) {
  return x + y;
}

var plus = add; // plus와 add 둘 다 동일한 익명함수를 참조
```
기명 함수 표현식 특이점: 함수 표현식에서 사용된 함수 이름이 외부 코드에서 접근 불가
```javascript
var add = function sum(x, y) {
  return x + y;
}
console.log(add(3,4)) // 7
console.log(sum(5,6)) // Uncaught ReferenceError: sum is not defined 에러 발생
```