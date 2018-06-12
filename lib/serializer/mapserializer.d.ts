import { ISerializer } from './ISerializer';
export declare type FieldMap = {
    [key: string]: string;
};
export declare class MapSerializer implements ISerializer<any, any> {
    private map;
    private useMappedPropertyName;
    constructor(map: FieldMap, useMappedPropertyName?: boolean);
    serialize(instance: any): any;
    deserialize(source: any, instance: any): void;
}
