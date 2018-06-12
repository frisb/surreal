import { FieldMap, ISerializer } from './serializer';
export { ISerializer };
export declare function Surreal<TInstance, TRecord>(transformer: {
    new (...args: Array<any>): ISerializer<TInstance, TRecord>;
} | FieldMap | Array<string>, ...args: Array<any>): {
    serializer: ISerializer<TInstance, TRecord>;
    serializable: (target?: new (...args: any[]) => TInstance) => any;
};
