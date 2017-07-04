import { FieldMap, IFieldList } from './fieldmap';
import { create, IModel } from './model';

/*
 * Exposed function to implement Pseudonym module.
 * @method
 * @param {object} [superConstructor] Class to inherit Pseudonym Model.
 * @param {string[]|object} fields FieldMap initializer.
 */
export function Surreal(fields: IFieldList | Array<string> | string): IModel {
  return create(fields);
}
