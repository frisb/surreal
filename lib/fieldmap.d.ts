export interface IFieldList {
    [src: string]: string;
}
export interface ILookup {
    keys: Array<string>;
    index: {
        [key: string]: number;
    };
}
export declare class FieldMap {
    src: ILookup;
    dest: ILookup;
    private count;
    fields: IFieldList;
    constructor(fields: IFieldList | Array<string> | string);
    getSrcKey(dest: string): string;
    getDestKey(src: string): string;
    private add(s, d?);
    merge(fields: IFieldList | Array<string> | string): void;
}
