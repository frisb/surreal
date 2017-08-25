import { FieldMap, ISerializer, MapSerializer, ArraySerializer } from './serializer';

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
		serializable: function (target?: { new(...args: Array<any>): TInstance }): { new(...args: Array<any>): TInstance } {
			// save a reference to the original constructor or fabricate a new one
			const original = target || <any> function fresh() { return; };

			// a utility function to generate instances of a class
			function construct(constructor: Function, record: TRecord, a: any) {
				const c: any = function () {
					if (record !== null && typeof(record) === 'object')
						serializer.deserialize(record, this);

					return constructor.apply(this, a);
				};
				c.prototype = constructor.prototype;
				return new c();
			}

			// the new constructor behaviour
			let f: any = function (record: TRecord, ...a: Array<any>) {
				return construct(original, record, a);
			};

			// copy prototype so intanceof operator still works
			f.prototype = original.prototype;

			f.prototype.toJSON = function () {
				return serializer.serialize(this);
			};

			// return new constructor (will override original)
			return f;
		}
	};
}
