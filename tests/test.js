'use strict';
const assert = require('assert');
const { Surreal } = require('../');

const { serializable, serializer } = Surreal({
	firstName: 'f',
	lastName: 'l'
});

class Anonymous {
	constructor(age) {
		this.age = age;
	}
}

const Person = serializable(Anonymous);

describe('Base class', function () {
	it('should serialize Person instance to aliased JSON', function (done) {
		let person = new Person(20);
		person.firstName = 'John';
		person.lastName = 'Smith';

		let { f, l } = person.toJSON();

		assert.equal(f, person.firstName);
		assert.equal(l, person.lastName);
		// assert.equal(person.age, 20);

		done();
	});

	it('should deserialize Person instance from aliased JSON', function (done) {
		var person = new Person(20).fromJSON({
			f: 'John',
			l: 'Smith'
		});

		assert.equal('John', person.firstName);
		assert.equal('Smith', person.lastName);
		// assert.equal(person.age, 20);

		done();
	});

	// it('should create an employee instance', function (done) {
	// 	var employee = new Employee();
	// 	employee.firstName = 'John';
	// 	employee.lastName = 'Smith';
	// 	employee.company = 'Acme';
	//
	// 	console.log(employee);
	//
	// 	done();
	// });
	//
	// it('should create an employee instance 2', function (done) {
	// 	var employee = new Employee({
	// 		f: 'John',
	// 		l: 'Smith',
	// 		c: 'Acme'
	// 	}, true);
	//
	// 	console.log(employee.serialize());
	//
	// 	done();
	// });

});