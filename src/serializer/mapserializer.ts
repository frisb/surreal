import { ISerializer } from './ISerializer';

export type FieldMap = {
	[key: string]: string;
}

export class MapSerializer implements ISerializer<any, any> {
	constructor(private map: FieldMap, private useMappedPropertyName = true) { }

	public serialize(instance: any): any {
		if (!instance)
			throw new Error('No serialization instance provided');

		let { map, useMappedPropertyName } = this;
		let json: any = {};

		for (let srcKey in map) {
			// if (!instance.hasOwnProperty(srcKey))
			// 	throw new Error(`Invalid instance property name "${ srcKey }"`);

			let prop = srcKey;

			if (useMappedPropertyName) {
				prop = map[srcKey];

				if (!(prop && typeof(prop) === 'string'))
					throw new Error(`Invalid map destination property name "${ prop }"`);
			}

			let val = instance[srcKey];

			if (typeof(val) !== 'undefined')
				json[prop] = val;
		}

		return json;
	}

	public deserialize(source: any, instance: any) {
		if (!source)
			throw new Error('No source object provided');

		if (!instance)
			throw new Error('No serialization instance provided');

		let { map, useMappedPropertyName } = this;

		for (let srcKey in map) {
			let prop = srcKey;

			if (useMappedPropertyName) {
				prop = map[srcKey];

				if (!(prop && typeof(prop) === 'string'))
					throw new Error('Invalid map destination property name');
			}

			let val = source[prop];

			if (typeof(val) !== 'undefined')
				instance[srcKey] = val;
		}
	}
}