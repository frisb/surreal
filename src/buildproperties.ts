import { IModel } from './model';

/*
 * Define source name properties on the Model prototype
 * @method
 * @param {object} prototype Model implementation prototype.
 * @param {string} src Source name.
 */
function _defineProperty(prototype: any, src: string) {
	if (!prototype.hasOwnProperty(src)) {
		Object.defineProperty(prototype, src, {
			get() {
				return this.getValue(src);
			},
			set(val) {
				this.setValue(src, val);
			}
		});
	}
}

export function buildProperties(Pseudo: IModel) {
	let { fieldMap } = Pseudo;
	let { keys } = fieldMap.src;


	for (let i = 0, { length } = keys; i < length; i++)
		_defineProperty(Pseudo.prototype, keys[i]);
}
