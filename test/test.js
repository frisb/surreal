'use strict';

var util = require('util');

var { Surreal } = require('../lib/index');


console.log('pseudonym', util.inspect(Surreal, { showHidden: true, depth: null }));

var Person = Surreal({
	firstName: 'f',
	lastName: 'l'
});

function Employee() {
	Person.apply(this, arguments);
}

Person.extend(Employee);

Employee.fieldMap.add('company', 'c');

console.log(Employee.fieldMap);

Employee.prototype.serialize = function () {
	var str = 'Hi, my name is ' + this.firstName + ' ' + this.lastName + '.\n';
	str += 'I work at ' + this.getValue('company') + '.';

	return str;
};

describe('Base class', function () {
	it('should create a person instance', function (done) {
		var person = new Person();
		person.firstName = 'John';
		person.lastName = 'Smith';

		console.log(person.serialize());

		done();
	});

	it('should create a person instance 2', function (done) {
		var person = new Person({
			f: 'John',
			l: 'Smith'
		}, true);

		console.log(person.serialize());

		done();
	});

	it('should create an employee instance', function (done) {
		var employee = new Employee();
		employee.firstName = 'John';
		employee.lastName = 'Smith';
		employee.company = 'Acme';

		console.log(employee.serialize());

		done();
	});

	it('should create an employee instance 2', function (done) {
		var employee = new Employee({
			f: 'John',
			l: 'Smith',
			c: 'Acme'
		}, true);

		console.log(employee.serialize());

		done();
	});

});