## 4.5 프로토타입 체이닝
### 4.5.1 프로토타입의 두 가지 의미
자바스크립트의 모든 객체는 자신의 부모인 프로토타입 객체를 가리키는 참조 링크 형태의 숨겨진 프로퍼티가 있다. 이러한 **링크를 암묵적 프로토타입 링크(implicit prototype link)**라고 부르며 [[Prototype]] 프로퍼티에 저장된다.

자바스크립트에서 모든 객체는 자신을 생성한 생성자 함수의 `prototype 프로퍼티`가 가리키는 `프로토타`입 객체를 자신의 부모 객체로 설정하는 `[[Prototype]]` 링크로 연결한다.

크롬이나 파이어폭스 같은 브라우저에서는 __proto__프로퍼티로 명시적으로 제공한다. __proto__프로퍼티와 [[Property]]를 같다고 간주하면 안됨

### 4.5.2 객체 리터럴 방식으로 생성된 객체의 프로토타입의 체이닝
객체 리터럴로 생성한 객체는 Object()라는 내장 생성자 함수로 생성된 것.

### 4.5.3 생성자 함수로 생성된 객체의 프로토타입 체이닝
자바스크립트에서 모든 `객체`는 자신을 생성한 `생성자 함수`의 `prototype  프로퍼티가 가리키는 객체`를 자신의 `프로토타입 객체(부모 객체)`로 취급한다.

### 4.5.4 프로토타입 체이닝의 종점
Object.prototype 객체가 프로토타입 체이닝의 종점   
때문에 Object.prototype에는 hasOwnProperty()나 isPrototypeOf()등과 같이 모든 객체가 호출 가능한 표준 메서드들이 정의되어 있음

### 4.5.5 기본 데이터 타입 확장
Number, String, Array 등의 prototype이 존재하며 이 것 모두 Object.prototype을 자신의 프로토타입을 가지고 있음

### 4.5.6 프로토타입도 자바스크립트 객체다

### 4.5.7 프로토타입 메서드와 this 바인딩

### 4.5.8 디폴트 프로토타입은 다른 객체로 변경이 가능하다
```javascript
function Person(name) {
  this.name = name;
}
console.log(Person.prototype.constructor);
/*
ƒ Person(name) {
  this.name = name;
}
*/

var foo = new Person('foo');
console.log(foo.country); // undefined

Person.prototype = {
  country: 'Korea',
};
console.log(Person.prototype.constructor); // ƒ Object() { [native code] }

var bar = new Person('bar');
console.log(foo.country); // undefined
console.log(bar.country); // Korea
console.log(foo.constructor);
/*
ƒ Person(name) {
  this.name = name;
}
*/
console.log(bar.counstructor); // undefined
```

### 4.5.9 객체의 프로퍼티 읽기나 메서드를 실행할 때만 프로토타입 체이닝이 동작한다
