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
기본 타입인 숫자, 문자열, 불린값, null, undefined 5가지 제외 모든 값은 객체.

### **3.3.1 객체비교**
동등 연산자(==)를 사용하면 객체의 프로퍼티 값이 아닌 참조값을 비교함
```javascript
var a = 100;
var b = 100;

var objA = { value: 100 };
var objB = { value: 100 };
var objC = objA

console.log(a == b) // 기본 타입 변수는 '값' 비교라 true
console.log(objA == objB) // 다른 객체, 같은 형태의 '프로퍼티값'일뿐. false
console.log(objA == objC) // 참조값이 같으므로 true
```

### **3.3.2 참조에 의한 함수 호출 방식**
기본 타입은 `값에 의한 호출 Call by value`로 동작하며, 함수 호출 시 인자로 기본 타입 값을 넘기면 매개변수로 복사된 값이 전달됨. 따라서 호출된 변수의 값이 변경되지 않음.      
객체와 같은 참조 타입은 `참조에 의한 호출 Call by Reference`으로 동작하며, 함수 호출 시 인자로 참조 타입 객체 참조 값이 그대로 전달됨
```javascript
var a = 100;
var obj = { value: 100 };

function changeArg(num, obj) {
  num = 200;
  obj.value = 200;

  console.log(num); // 200
  console.log(obj); // { value: 200 }
}

changeArg(a, objA);
console.log(a); // 100
console.log(objA); // { value: 200 }
```

### **추가로 찾아본 자바스크립트 객체 복제 방법**
https://www.daleseo.com/js-objects-clone/
```javascript
const original = {
  num: 1000,
  bool: true,
  str: "test",
  func: function () {
    console.log("func")
  },
  obj: {
    x: 1,
    y: 2,
  },
  arr: ["A", "B", "C"],
}
```
> 참조 할당

객체를 복제할 때 초보자들이 가장 많이 하는 실수는 다음과 같이 = 연산자를 통해 새로운 변수에 복사할 객체를 할당하는 것입니다.
```javascript
const clone1 = original

original.num = 2000
console.log(clone1.num) // 2000

clone1.bool = false
console.log(original.bool) // false

console.log(original === clone1) // true
```
위 코드는 동일한 객체를 가리키는 변수를 하나 더 만드는 것 뿐 입니다.   
즉, original이 가리키던 객체를 clone1도 가리키게 된 것 이죠. 따라서 어느 변수를 통해 값을 바꾸던 나머지 변수에 영향을 주게 됩니다.

이렇게 하나의 객체를 가리키는 변수가 2개가 생기면 어디서 어떻게 해당 객체의 속성이 변경될지 예측이 어려워지고 자연스럽게 버그가 생기기 쉬워집니다. 또한 Immutable한 코드를 선호하는 최근 경향과도 거리가 멀어지게 됩니다.

 > 얕은 복제(Shallow Clone)

`Object.assign(obj)`
```javascript
const clone2 = Object.assign({}, original)

original.num = 3000
console.log(clone2.num) // 2000

clone2.bool = true
console.log(original.bool) // false

console.log(original === clone2) // false
```
`Object.assign(target, ...sources)` 메서드를 사용하면 첫번쩨 인자로 두번째 인자의 속성들을 복사할 수 있습니다. 따라서 위와 같이 언뜻 보면 원본과 복사본이 서로 영향을 주지 않고 변경이 가능한 것 처럼 보입니다.

하지만 `단순 속성`이 아닌 `객체`나 `배열 속성`을 변경해보면 아래와 같이 여전히 서로 영향을 준다는 것을 알 수 있습니다.
```javascript
original.obj.x = 3
console.log(clone2.obj.x) // 3

clone2.arr.push("D")
console.log(original.arr) // ["A", "B", "C", "D"]

console.log(original.obj === clone2.obj) // true
console.log(original.arr === clone2.arr) // true
```
이런 현상이 발생하는 이유는 객체를 하나의 트리 구조로 봤을 때 최상위 레벨의 속성만 복사를 하는 Object.assign(target, ...sources) 메서드의 동작 방식에 있습니다. 객체 트리의 최말단 노드까지 복사되지 않기 때문에 이러한 복제 방식을 얕은 복제(Shallow Clone)라고 일컽습니다.

> 깊은 복제 (Deep Clone)

`JSON.parse(JSON.stringify(obj))`   
널리 사용되는 방법은 JSON 내장 객체를 사용하는 것 입니다. 아래와 같이 JSON의 `parse()` 메서드와 `stringify()` 메서드를 연달아 호출하면 동일한 객체 트리를 가지는 새로운 객체가 복제됩니다.

```javascript
const clone4 = JSON.parse(JSON.stringify(original))

original.obj.x = 4
console.log(clone4.obj.x) // 3

clone4.arr.push("F")
console.log(original.arr) // ["A", "B", "C", "D", "E"]

console.log(original.obj === clone4.obj) // false
console.log(original.arr === clone4.arr) // false
```
엄밀히 말하면 이 방법에도 약간의 주의해야될 부분이 있는데요. 첫 번째는 json에는 함수 데이터 타입이 없기 때문에 함수 속성들은 누락된다는 점입니다.
```javascript
console.log(original.func) // function func()
console.log(clone4.func) // undefined
```
이 밖에도 객체 트리 내에 순환 참조가 있는 경우, stringify() 메서드에서 TypeError: Converting circular structure to JSON이라는 오류가 발생한다는 문제도 있습니다.

`lodash library의 _.cloneDeep(obj) 활용`

## 3.4 프로토타입
자바스크립트의 모든 객체는 자신의 부모 역할을 하는 객체(=프로토타입 객체, 프로톹타입)와 연결되어 있다.
```javascript
var foo = {
  name: 'foo',
  age: 30
};

console.log(foo.toString()); // foo객체의 프로토타입에 toString()이 있으므로 에러가 나지 않고 [object Object] 출력
console.dir(foo); // Object age:30 name:"foo" __proto__: Object
```
ECMAScript 명세서에 보면 자바스크립트의 모든 객체는 자신의 프로토타입을 가지는 [[Prototype]]라는 숨겨진 프로퍼티를 가지고 있는데 크롬 브라우저에서는 __proto__가 이 것을 의미한다.   
객체 리터럴 방식으로 생성된 객체의 경우 Object.prototype객체가 프로토타입 객체가 된다.   

## 3.5 배열
C나 자바의 배열과 같은 기능을 하지만 크기 지정을 안해도 되고, 어떤 위치에 어느 타입의 데이터를 저장하더라도 에러가 발생하지 않는다.

### **3.5.1 배열 리터럴**
객체 리터럴이 `중괄호({})`를 이용하고, 배열 리터럴은 `대괄호([])`를 이용한다.

### **3.5.2 배열의 요소 생성**
순차적으로 넣을 필요 없고, 아무 인덱스 위치에나 값을 동적으로 추가할 수 있다.

### **3.5.3 배열의 length 프로퍼티**
배열 내에 가장 큰 인덱스에 1을 더한 값이며, length를 늘리게 되면 빈 곳은 undefined로 출력됨   
`push()`메서드는 맨 마지막에 넣어줌

### **3.5.4 배열과 객체**
배열 역시 객체이나 차이가 있음
1. object[0]이라고 해도 자바스크립트 엔진이 []연산자 내 숫자가 사용될 경우, 해당 숫자를 자동으로 문자열 형태로 바꿔주기 때문에 사용 가능
2. typeof로 하면 둘다 object
3. length 프로퍼티는 배열에만 가능
4. push()메서드는 배열에만 가능. 배열은 Array.prototype 객체가 부모 객체인 프로토타입이고 객체는 Object.prototype 객체가 프로토타입이기 때문

### **3.5.5 배열의 프로퍼티 동적 생성**
배열에도 동적으로 `key: value`형태로 프로퍼티를 넣을 수 있음

### **3.5.6 배열의 프로퍼티 열거**
객체는 for in으로 프로퍼티 열거 가능하나 배열을 for in으로 하면 불필요한 프로퍼티가 출력될 수 있으므로(3.5.5처럼 배열 인덱스로 들어가는 것이 아닌 동적으로 프로퍼티 생성한 부분 등) `for문`을 사용한다.

### **3.5.7 배열 요소 삭제**
`delete`연산자를 사용해 해당 요소의 값을 undefined로 설정할 수 있으나 length가 바뀌지는 않음.   
완전 삭제를 원하는 경우 `splice()`배열 베서드를 사용함

> splice(), slice(), split()
- splice
  - 기존 배열 변하며, 잘려진 배열을 반환함
  - splice(start, deleteCount, item...)
```javascript
const array = [1, 2, 3, 4, 5, 6];
array.splice(0, 4); // [1, 2, 3, 4]
array // [5, 6]
```
- slice
  - 기존 배열은 변하지 않고, 잘려진 배열을 반환함
  - slice(begin, end)
```javascript
const array = [1, 2, 3, 4, 5, 6];
array.slice(0, 4); // [1, 2, 3, 4]
array // [1, 2, 3, 4, 5, 6]
```
- split
  - String의 메서드이며 delimeter를 기준으로 잘라서 배열을 만든 후에 배열을 반환함
  - split(delimeter)
  - delimeter는 regex로도 사용할 수 있음
```javascript
const a = '1,2,3,4,5';
a.split(','); // ["1","2","3","4","5"]

const b = '1,2,3,4,5';
b.split(/\,/g); // ["1","2","3","4","5"]
```

## 3.6 기본 타입과 표준 메서드
기본 타입의 값들에 대해 객체 형태로 메서드를 호출한 다음 각 타입별 표준 메서드를 호출하고 끝나면 기본값으로 복귀함

## 3.7 연산자
### **3.7.1 + 연산자**
더하기 연산과 문자열 연결 연산 수행
### **3.7.2 typeof 연산자**
typeof 연산자는 피연산자의 타입을 문자열 형태로 리턴함

|타입별|피연산자|typeof 결과값|
|----------------------------|---|---|
|기본타입|숫자|'number'|
|기본타입|문자열|'string'|
|기본타입|불린값|'boolean'|
|기본타입|null|'object'|
|기본타입|undefined|'undefined'|
|참조타입|객체|'object'|
|참조타입|배열|'object'|
|참조타입|함수|'function'|

### **3.7.3 동등(==) 연산자와 일치(===) 연산자**
== 연산자는 타입이 다른 경우 타입변환을 거치고 비교하고 === 연산자는 타입이 다를 경우 변경하지 않고 비교한다   
**==** 비교는 권하지 않음

### **3.7.4 !! 연산자**
!!는 피연산자를 불린값으로 변환하는 것
```javascript
console.log(!!0); // false
console.log(!!1); // true
console.log(!!''); // false
console.log(!!'string'); // true
console.log(!!false); // false
console.log(!!true); // true
console.log(!!null); // false
console.log(!!undefined); // false
console.log(!!{}); // true
console.log(!![1,2,3]); // true
```
