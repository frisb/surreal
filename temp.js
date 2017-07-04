// const { Surreal } = require('./lib/index');

// class X extends Surreal({
// 	alpha: 'a',
// 	beta: 'b'
// }) {

// }

// let x = new X();

// x.alpha = 'alph';
// x.beta = 'bet';


// console.log(X);

// console.log(x);

// // console.log(x.toDocument(true));

function _inherits(child, parent) {
  for (var key in parent) {
    if (parent.hasOwnProperty(key))
      child[key] = parent[key];
  }

  function ctor() {
    this.constructor = child;
  }

  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  child.__super__ = parent.prototype;

  return child;
}

function _extendClassAndPrototype(child, parent) {
  let originalChildPrototype = {};

  let propNames = Object.getOwnPropertyNames(child.prototype);

  for (let j = 0, len = propNames.length; j < len; j++) {
    let name = propNames[j];
    originalChildPrototype[name] = child.prototype[name];
  }

  _inherits(child, parent);

  // put back child's original prototype properties
  for (let key in originalChildPrototype) {
    child.prototype[key] = originalChildPrototype[key];
  }
}

function X() {

}

X.myStatic = function () {
	return 'yay static';
}

X.prototype.A = function () {
	return 'A';
}

function Y() {

}



Y.myStatic2 = function () {
	return 'yay static 2';
}

Y.prototype.B = function () {
	return 'B';
}

_extendClassAndPrototype(Y, X);






let y = new Y();

console.log(Y.myStatic2(), Y.myStatic());
console.log(y.A(), y.B());



