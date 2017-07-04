import { FieldMap, IFieldList } from './fieldmap';
import { create, IModel } from './model';
import { Surreal } from './surreal';

export function Surrealizable(fields: IFieldList | Array<string> | string): Function {
	return function(target: { new(...args: Array<any>): any }): { new(...args: Array<any>): any } {
    let Model = Surreal(fields);
		
    return Model.extend(target);
		
		// return <any> Model;
    
		// // save a reference to the original constructor
		// const original = target;

		// // a utility function to generate instances of a class
		// function construct(constructor: Function, args: any) {
    //   let c: any = function () {
    //     return constructor.apply(this, args);
    //   }
    //   c.prototype = constructor.prototype;
    //   return new c();
    // }

		// // the new constructor behaviour
		// let f: any = function (...args: Array<any>) {
    //   console.log("New: " + original.name);
    //   // return _super !== null && _super.apply(this, arguments) || this;
    //   return construct(original.constructor, args);
    // }

		// // copy prototype so intanceof operator still works
		// f.prototype = original.prototype;

		// // return new constructor (will override original)
		// return f;
	};
}
