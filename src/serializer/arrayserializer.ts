import { ISerializer } from './ISerializer';

export class ArraySerializer implements ISerializer<any, any> {
	constructor(private props: Array<string>) { }

	public serialize(instance: any): any {
		if (!instance)
			throw new Error('No serialization instance provided');

		let { props } = this;
		let json: any = {};

		for (let i = 0, { length } = props; i < length; i++) {
			let key = props[i];

			if (!instance.hasOwnProperty(key))
				throw new Error('Invalid instance property name');

			let val = instance[key];

			if (typeof(val) !== 'undefined')
				json[key] = val;
		}

		return json;
	}

	public deserialize(source: any, instance: any) {
		if (!source)
			throw new Error('No source object provided');

		if (!instance)
			throw new Error('No serialization instance provided');

		let { props } = this;
		for (let i = 0, { length } = props; i < length; i++) {
			let key = props[i];

			let val = source[key];

			if (typeof(val) !== 'undefined')
				instance[key] = val;
		}
	}
}