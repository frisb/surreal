export interface Class extends Function {
  [key: string]: any;
}

function statics(child: Class, parent: Class) {
  for (let key in parent) {
    if (parent.hasOwnProperty(key))
      child[key] = parent[key];
  }
}

function constructor(child: Class, parent: Class) {
  let ctor: any = function () {
    this.constructor = child;
  }

  ctor.prototype = parent.prototype;
  child.prototype = new ctor();
  child.__super__ = parent.prototype;
}

function retrieveOriginalPrototype(child: Class) {
	let proto: Class = Object.create(null);

  let propNames = Object.getOwnPropertyNames(child.prototype);

  for (let i = 0, { length } = propNames; i < length; i++) {
    let name = propNames[i];
    proto[name] = child.prototype[name];
  }

	return proto;
}

function prototype(child: Class, proto: Class) {
	// put back child's original prototype properties
  for (let key in proto) {
    child.prototype[key] = proto[key];
  }
}

export function inherit(child: Class, parent: Class) {
  let original = retrieveOriginalPrototype(child);

  statics(child, parent);
	constructor(child, parent);
	prototype(child, original);

	return child;
}