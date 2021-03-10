# Chapter3. 자바스크립트 데이터 타입과 연산자

## 자바스크립트의 데이터 타입
- 기본타입
  - 숫자(Number)
  - 문자열(String)
  - 불린값(Boolean)
  - undefined
  - null
- 참조타입
  - 객체(Object)
    - 배열(Array)
    - 함수(Function)
    - 정규표현식

## 3.1 자바스크립트 기본 타입
typeof 연산자는 피연산자의 타입을 리턴함
### **3.1.1 숫자**
자바스크립트는 하나의 숫자형만 존재하며, 모든 숫자를 64비트 부동 소수점 형태로 저장한다 => C언어의 double 타입과 유사   
나눗셈 연산 시 주의해야 함
소수 부분을 버린 정수 부분만
- 버림: Math.floor()
- 올림: Math.ceil()
- 반올림: Math.round()
- 절대값: Math.abs()
- 부호: Math.sign()
- 마이너스, 플러스 등 기호 상관없이 소수점 버림: Math.trunc()

### **3.1.2 문자열**
문자열은 배열처럼 인덱스로 접근할 수 있으나 한 번 정의된 문자열은 변하지 않는다.
```javascript
var str = 'test';
console.log(str[0], str[1], str[2], str[3]); // test

str[0] = 'T'; // 변경되지 않음
console.log(str); // test
```

### **3.1.3 불린값**
true, false

### **3.1.4 null과 undefined**
null vs undefined   
공통점: '값이 비어 있음'   
- null: typeof 시 object이며 null 타입 변수인지 확인 시 typeof가 아니라 일치 연산자(===)를 통해 변수의 값을 직접 확인해야 한다.
- undefined: 기본적으로 값이 할당되지 않은 변수, 값 또한 undefined.

## 3.2 자바스크립트 참조 타입(객체 타입)
숫자, 문자열, 불린값, null, undefined 같은 기본 타입을 제외한 모든 값은 객체.   
자바스크립트에서 객체는 단순히 `이름(key):값(value)`형태 프로퍼티들을 저장하는 컨테이너이며, CS에서 해시(Hash)라는 자료구조와 유사함.   
참조타입은 여러 개의 프로퍼티들을 포함할 수 있음. 함수로 포함한 것이 메서드.   
### **3.2.1 객체 생성**
- 기본 제공 Object() 객체 생성자 함수 이용
```javascript
// 빈 객체 생성
var foo = new Object();

// foo 객체 프로퍼트 생성
foo.name = 'foo';
foo.age = 30;
foo.gender = 'male';
```
- 객체 리터럴 이용
```javascript
var foo = {
  name: 'foo',
  age: 30,
  gender: 'male'
}
```
- 생성자 함수 이용: 함수를 통해서 객체 생성할 수 있음 => 4장
### **3.2.2 객체 프로퍼티 읽기/쓰기/갱신**
- 대괄호([])표기법
- 마침표(.)표기법
```javascript
var foo = {
  name: 'foo',
  age: 30,
  gender: 'male'
};

// 대괄호 표기법은 안에 string 형태로 표시되어야 함
// `foo.name === foo['name']`
// foo[name] 은 undefined 

// 프로퍼티가 표현식이거나 예약어일 경우 (ex) 가운데 - 표시)
// foo['full-name'] = 'foo bar'
```
**NaN(Not a Number)**   
foo.full-name 이라고 할 경우 NaN이 리턴 되는데   
foo.full이 undefined, name이 undefined 값이기 때문이다.

### **3.2.3 for in 문과 객체 프로퍼티 출력**
```javascript
var foo = {
  name: 'foo',
  age: 30,
  gender: 'male'
};

var prop;
for (prop in foo) {
  console.log(prop, foo[prop])
}
// [출력결과]
// name foo
// age 30
// gender male
```

### **3.2.4 객체 프로퍼티 삭제**
delete 연산자를 이용해 객체의 `프로퍼티`를 즉시 삭제 할 수 있음. `객체`는 삭제 불가

## 3.3 참조 타입의 특성
