import { FieldMap, IFieldList } from './fieldmap';
export interface IModel extends Function {
    readonly fieldMap: FieldMap;
    extend: Function;
}
export declare function create(fields: IFieldList | Array<string> | string, superConstructor?: {
    new (...args: Array<any>): any;
}): IModel;
