import { FieldMap, ISerializer, MapSerializer, ArraySerializer } from './serializer';
export { ISerializer }

export function Surreal<TInstance, TRecord>(transformer: { new(...args: Array<any>): ISerializer<TInstance, TRecord> } | FieldMap | Array<string>, ...args: Array<any>) {
	let serializer: ISerializer<TInstance, TRecord>;

	if (typeof(transformer) === 'function') {
		serializer = <ISerializer<TInstance, TRecord>> new transformer(...args);
	}
	else if (transformer instanceof Array) {
		let props = <Array<string>> transformer;
		serializer = new ArraySerializer(props);
	}
	else {
		let map = <FieldMap> transformer;
		let [ useMappedPropertyName ] = args;
		serializer = new MapSerializer(map, useMappedPropertyName);
	}

	return {
		serializer,
		serializable: function (target?: { new(...args: Array<any>): TInstance }): any {
			if (!target)
				target = <any> function fresh() { return; };

			// // save a reference to the original constructor or fabricate a new one
			// const original = target;
			//
			// // a utility function to generate instances of a class
			// function construct(record: TRecord, a: any) {
			// 	const c: any = function () {
			// 		if (record !== null && typeof(record) === 'object')
			// 			serializer.deserialize(record, this);
			//
			// 		return original.apply(this, a);
			// 	};
			//
			// 	c.prototype = original.prototype;
			//
			// 	return new c();
			// }
			//
			// // the new constructor behaviour
			// let f: any = function (record: TRecord, ...a: Array<any>) {
			// 	return construct(record, a);
			// };
			//
			// // copy prototype so intanceof operator still works
			// f.prototype = original.prototype;
			//
			// f.prototype.toJSON = function () {
			// 	return serializer.serialize(this);
			// };
			//
			// f.prototype.fromJSON = function (record: TRecord) {
			// 	serializer.deserialize(record, this);
			// };
			//
			// // return new constructor (will override original)
			// return f;

			target.prototype.toJSON = function () {
				return serializer.serialize(this);
			};

			target.prototype.fromJSON = function (record: TRecord) {
				serializer.deserialize(record, this);

				return this;
			};

			return target;
		}
	};
}
