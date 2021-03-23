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
```javascript
// 실제로는 다음과 같음
var add = function add(x, y) {
  return x + y;
}
```

### 4.1.3 함수 표현식 방식으로 함수 생성하기
변수에 할당하여 함수를 생성하는 것   
생성된 함수는 함수명 없으므로 함수리터럴 익명함수(anonymous function)   
`함수 선언문 방식`으로 선언된 함수는 함수 끝에 `세미콜론`을 붙이지 `않지만`,    
`함수 표현식 방식`은 `세미콜론`을 붙이는 것을 권장 

```javascript
var add = function(x, y) {
  return x + y;
};

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

**세미콜론**

자바스크립트는 인터프리터가 자동으로 세미콜론을 삽입시켜 준다.   
하지만 신경쓰지 않으면, 문제가 생길 수도 있음
```javascript
var func = function() {
  return 42;
} // 세미콜론 없음
(function() { // 즉시 실행 함수
  console.log("function called");
})();

// number is not a function 에러 발생: 세미콜론이 없어서 func()함수가 끝났다고 판단하지 않기 때문에 return하는 42뒤에 42()형태로 또 함수를 호출하려고 시도함
```

### 4.1.4 Function() 생성자 함수를 통한 생성하기
자바스크립트의 함수도 `Function()`이라는 기본 내장 생성자 함수로부터 생성된 객체
```javascript
var add = new Function('x', 'y', 'return x + y');
console.log(add(3, 4)); // 출력값 7
```

### 4.1.5 함수 호이스팅(Function Hoisting)
함수 호이스팅 때문에 더글라스 크락포드는 `함수 표현식만`을 사용할 것을 권고함
- 함수 선언문 방식
  - 함수 선언문 현태로 정의한 함수의 유효 범위는 코드의 맨 처음부터 시작
  - 함수를 사용하기 전에 반드시 선언해야 한다는 규칙을 무시함
```javascript
add(2, 3); // 5 , 선언 전이라도 호출 가능

function add(x, y) {
  return x + y;
}

add(3, 4); // 7
```
- 함수 표현식 방식
```javascript
add(2, 3); // uncaught type error

// 함수 표현식 형태
var add = function add(x, y) {
  return x + y;
};

add(3, 4); // 7
```
함수 호이스팅이 발생하는 원인은 변수 생성(Instantiation)과 초기화(Intialization)의 작업이 분리되서 진행되기 때문

## 4.2 함수 객체: 함수도 객체다
### 4.2.1 자바스크립트에서는 함수도 객체다
### 4.2.2 자바스크립트에서는 함수는 값으로 취급된다.
자바스크립트에서 함수를 일급(First Class)객체라고 부른다. 함수는 다음 동작이 가능
- 리터럴에 의해 생성
- 변수나 배열의 요소, 객체의 프로퍼티 등에 할당 가능
- 함수의 인자로 전달 가능
- 함수의 리턴값으로 리턴 가능
- 동적으로 프로퍼티를 생성 및 할당 가능
#### 4.2.2.1 변수나 프로퍼티의 값으로 할당
#### 4.2.2.2 함수 인자로 전달
```javascript
var foo = function(func) {
  func(); // 인자로 받은 func() 함수 호출
};

foo(function() { // 익명 함수를 func 인자로 넘긴 것
  console.log('Function can be used as the argument');
})
```
#### 4.2.2.3 리턴값으로 활용
```javascript
var foo = function() {
  return function() {
    console.log('this function is the return value');
  };
};

var bar = foo();
bar();
```
### 4.2.3 함수 객체의 기본 프로퍼티
일반 객체와는 다르게 추가로 함수 객체만의 표준 프로퍼티가 정의되어 있다.
`length`와 `prototype 프로퍼티`등을 가짐
- `name`: 함수의 이름, 익명함수라면 빈 문자열
- `caller`: 자신을 호출한 함수. 호출하지 않았으면 null
- `arguments`: 인자값. 호출하지 않았으면 null
- `__proto__`: Function.prototype 객체, 함수 객체, Empty()함수. 모든 함수들의 부모 역할을 하는 프로토타입 객체
  - constructor 프로퍼티
  - toString() 메서드
  - apply(thisArg, argArray) 메서드
  - call(thisArg, [, arg1 [,arg2,]]) 메서드
  - bind(thisArg, [,arg1 [,arg2,]]) 메서드

### 4.2.3.1 length 프로퍼티
함수를 작성할 때 정의한 인자 개수를 나타냄

### 4.2.3.2 prototype 프로퍼티
모든 객체의 부모를 나타내는 내부 프로퍼티인 [[Prototype]]과혼동하면 안됨. 모두 프로토타입 객체를 가르키는 공통점이 있으나, 모든 객체가 [[Prototype]] 을 가지지만 함수 객체가 가지는 Prototype 프로퍼티는 생성자로 사용될 때 이 함수를 통해 생성된 객체의 부모 역할을 하는 프로토타입 객체를 가리킨다.

함수가 생성될 때 만들어지며, `constructor 프로퍼티`하나만 있는 객체를 가리킨다. 일반적으로 네이밍 하지는 않고 이름이 있는 경우(ex. add()) add.prototype이 된다.
```javascript
function myFunction() {
  return true;
}

console.log(myFunction.prototype); // constructor와 __proto__가 나옴
console.log(myFunction.prototype.constructor); // 함수 자체가 나옴
```

## 4.3 함수의 다양한 형태
### 4.3.1 콜백 함수
익명함수의 대표적인 용도가 **콜백 함수**
콜백 함수는 코드를 통해 명시적으로 호출하는 함수가 아니라, 개발자는 단지 함수를 등록하기만 하고, 어떤 이벤트가 발생했거나 특정 시점에 도달했을 때 시스템에서 호출되는 함수를 말한다. 또한, 특정 함수의 인자로 넘겨서, 코드 내부에서 호출되는 함수 또한 콜백 함수가 될 수 있다.

대표적인 콜백 함수의 사용 예는 이벤트 핸들러 처리.   
window.onload는 이벤트 핸들러로서, 웹 페이지의 로딩이 끝나는 시점에 load 이벤트가 발생하면 실행된다.
```javascript
window.onload = function() {
  alert('This is callback Function');
};
```

### 4.3.2 즉시 실행 함수(Immediate functions)
함수를 정의함과 동시에 바로 실행하는 함수   
함수 리터럴을 괄호()로 둘러 싼다. 그런 다음 바로 호출 될 수 있게 () 괄호 쌍을 추가한다.   
같은 함수를 다시 호출할 수 없다. 따라서 **최초 한 번의 실행만을 필요로 하는 초기화 코드 부분**등에 사용된다.   
대표적인 예는 jQuery. 즉시 실행 함수 내에 라이브러리 코드를 추가하면 전역 네임스페이스를 더럽히지 않으므로, 다른 라이브러리들이 동시에 로드되더라도 충돌하지 않음
```javascript
(function (name) {
  console.log('This is the immediate function -> ' + name);
})('foo');
```

### 4.3.3 내부 함수(Inner functions)
클로저를 생성하거나 부모 함수 코드에서 외부에서의 접근을 막고 독립적인 헬퍼 함수를 구현하는 용도 등으로 사용.
```javascript
function parent() {
  var a = 100;
  var b = 200;

  function child() {
    var b = 300;

    console.log(a);
    console.log(b);
  }
  child(); // 100 300 - 스코프체이닝
}
  parent(); 
  child(); // Uncaught ReferenceError: child is not defined
```
스코프체이닝: 내부 함수는 자신을 둘러싼 외부 함수의 변수에 접근 가능하다.

### 4.3.4 함수를 리턴하는 함수
```javascript
var self = function() {
  console.log('a');
  return function() {
    console.log('b');
  }
}

self = self(); // a 출력하고 self()함수 변수가 가리키는 함수가 원래 함수에서 리턴 받은 새로운 함수로 변경되었음
self(); // b
```