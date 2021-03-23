## 4.4 함수 호출과 this
### 4.4.1 arguments 객체
함수 형식에 맞춰 인자를 넘기지 않더라도 에러가 발생하지 않음   
argumnets 객체는 함수를 호출할 때 넘긴 인자들이 배열 형태로 저장된 객체를 의미한다. 하지만 **유사 배열 객체**임
```javascript
function func(arg1, arg2) {
  console.log(arg1, arg2);
}

func(); // undefined undefined
func(1); // 1 undefined
func(1, 2); // 1 2
func(1, 2, 3); // 1 2
```

매개변수의 개수가 정확하지 않은 함수를 구현하거나, 전달된 인재의 개수에 따라 서로 다른 처리를 해줘야 하는 함수를 개발하는 데 유용하게 사용됨
```javascript
function sum() {
  var result = 0;

  for (var i=0; i < arguments.length; i++) {
    result += arguments[i];
  }

  return result;
}

console.log(sum(1,2,3)); // 6
console.log(sum(1,2,3,4,5,6,7,8,9)); // 45
```
### 4.4.2 호출 패턴과 this 바인딩
#### 4.4.2.1 객체의 메서드 호출할 때 this 바인딩
객체의 프로퍼티가 함수일 경우, 이 함수를 메서드라고 부른다. 메서드 내부 코드에서 사용된 this는 해당 메서드를 호출한 객체로 바인딩된다.
```javascript
var myObject = {
  name: 'foo',
  sayName: function() {
    console.log(this.name);
  }
};

var otherObject = {
  name: 'bar'
};

otherObject.sayName = myObject.sayName;

myObject.sayName(); // foo
otherObject.sayName(); // bar
// sayName() 메서드에서 사용된 this는 자신을 호출한 객체에 바인딩되므로
```
#### 4.4.2.2 함수를 호출할 때 this 바인딩
해당 함수 내부 코드에서 사용된 this는 전역 객체에 바인딩된다. 브라우저에서 자바스크립트를 실행하는 경우 전역 객체는 window 객체가 된다.   
Node.js에서는 전역 객체는 global 객체가 된다.   
함수 호출에서의 this 바인딩 특성은 **내부 함수(inner function)**를 호출했을 경우에도 그대로 적용됨.
```javascript
var value = 100;

var myObject = {
  value: 1,
  func1: function() {
    this.value += 1;
    console.log('func1() called. this.value: ' + this.value);

    func2 = function() {
      this.value += 1;
      console.log('func2() called. this.value: ' + this.value);

      func3 = function() {
        this.value += 1;
        console.log('func3() called. this.value: ' + this.value);
      }

      func3(); // 내부 함수 호출
    }
    func2(); // 내부 함수 호출
  }
};
myObject.func1(); // func1 메서드 호출
```
순서로 치면 myObject.func1()이 제일 먼저, 함수내부로 들어가서 func2() 내부함수와 func3() 내부함수가 차례대로 호출됨
```
// 결과
func1() called. this.value: 2
func2() called. this.value: 101
func3() called. this.value: 102
```
**내부 함수 호출 패턴을 정의해 놓지 않기 때문**이다.
this.value로 접근하기 때문에 의도한대로 되지 않음
`that`이라는 변수로 this를 저장하여 사용 가능
```javascript
var value = 100;

var myObject = {
  value: 1,
  func1: function() {
    var that = this;
    this.value += 1;
    console.log('func1() called. this.value: ' + this.value);

    func2 = function() {
      that.value += 1;
      console.log('func2() called. this.value: ' + that.value);

      func3 = function() {
        that.value += 1;
        console.log('func3() called. this.value: ' + that.value);
      }

      func3(); // 내부 함수 호출
    }
    func2(); // 내부 함수 호출
  }
};
myObject.func1(); // func1 메서드 호출
```
이러한 this 바인딩의 한계를 극복하려고, call과 apply 메서드를 제공함

#### 4.4.2.3 생성자 함수를 호출할 때 this 바인딩
**기존 함수에 new 연산자를 붙여서 호출하면 해당 함수는 생성자 함수로 동작한다.**   
**함수 이름의 첫 문자를 대문자로 쓰기**를 권하고 있다.

> 생성자 함수가 동작하는 방식
1. 빈 객체 생성 및 this 바인딩
2. this를 통한 프로퍼티 생성
3. 생성된 객체 리턴
  - 리턴문이 없을 경우 this로 바인딩된 새로 생성한 객체가 리턴된다.
```javascript
var Person = function (name) {
  // 함수 코드 실행 전
  this.name = name;
  // 함수 리턴
};

var foo = new Person('foo');
console.log(foo.name); // foo
```

> 객체 리터럴 방식과 생성자 함수를 통한 객체 생성 방식의 차이

가장 쉽게 생각할 수 있는 차이는 foo 객체와 같이 객체 리터럴 방식으로 생성된 객체는 같은 형태의 객체를 재생성할 수 없다는 점.
```javascript
var foo = {
  name: 'foo',
  age: 35,
  gender: 'man'
};
console.dir(foo); // __proto__가 object

function Person(name, age, gender, position) {
  this.name = name;
  this.age = age;
  this.gender = gender;
}

var bar = new Person('bar', 33, 'woman');
console.dir(bar); // __proto__가 Person

var baz = new Person('baz', 25, 'woman');
console.dir(baz); // __proto__가 Person
```

> 생성자 함수를 new를 붙이지 않고 호출할 경우

일반 함수 호출의 경우 this가 window 전역 객체에 바인딩, 생성자 함수 호출의 경우 this는 새로 생성되는 빈 객체에 바인딩 되기 때문에 오류가 발생될 수 있다.
```javascript
// 위 코드에 이어서
var qux = Person('qux', 20, 'man'); // new가 없어서 window 객체에 동적으로 name, age, gender 프로퍼티가 생성됨
console.log(qux); // undefined

console.log(window.name); // qux
console.log(window.age); // 20
console.log(window.gender); // man
```

**강제로 인스턴스 생성하기**
위의 오류를 막기 위해 instanceof 를 사용함   
if (!(this instanceof arguments.callee)) 로 사용 가능
```javascript
function A(arg) {
  if (!(this instanceof A))
    return new A(arg);
  this.value = arg ? arg : 0;
}
```

#### 4.4.2.4 call과 apply 메서드를 이용한 명시적인 this 바인딩
apply()와 call()메서드는 부모 객체인 Function.prototype 객체의 메서드이므로 호출 가능   
apply()의 본질적인 기능은 함수 호출   
```javascript
function.apply(thisArg, argArray)
```
첫번째 인자: 함수 내에서 this로 쓸 것   
두번째 인자: 함수를 호출할 때 넘길 인자들의 배열

call() 메서드의 경우는 apply()와 기능은 같지만, apply()의 두번째 인자에서 배열 형태로 넘긴 것을 하나의 인자로 넘긴다.
apply()와 call() 메서드는 this를 원하는 값으로 명시적으로 매핑해서 특정 함수나 메서드를 호출 할 수 있다.
```javascript
// apply()메서드를 활용한 arguments 객체의 배열 표준 메서드 slice()활용 코드
function myFunction() {
  console.dir(arguments);
  
  // arguments.shift(); 에러 발생 - 유사배열이므로

  // arguments 객체를 배열로 변환
  var args = Array.prototype.slice.apply(arguments); // this객체를 arguments로
  console.dir(args);
}

myFunction(1,2,3);
```
결과값
```
Arguments(3)
  0: 1
  1: 2
  2: 3
  callee: ƒ myFunction()
  length: 3
  Symbol(Symbol.iterator): ƒ values()
  __proto__: Object
-----------------
Array(3)
  0: 1
  1: 2
  2: 3
  length: 3
  __proto__: Array(0)
```

### 4.4.3 함수 리턴
**자바스크립트 함수는 항상 리턴값을 반환한다.**
#### 4.4.3.1 규칙1) 일반 함수나 메서드는 리턴값을 지정하지 않을 경우, undefined 값이 리턴된다.
#### 4.4.3.2 규칙2) 생성자 함수에서 리턴값을 지정하지 않을 경우 생성된 객체가 리턴된다.
- 생성자 함수 내에서 명시적으로 리턴값을 준 경우
- 생성자 함수의 리턴값으로 넘긴 값이 객체가 아닌 불린, 숫자, 문자열의 경우는 이러한 리턴값을 무시하고 this로 바인딩 된 객체가 리턴된다.