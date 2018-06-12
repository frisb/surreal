import { ISerializer } from './ISerializer';
export declare class ArraySerializer implements ISerializer<any, any> {
    private props;
    constructor(props: Array<string>);
    serialize(instance: any): any;
    deserialize(source: any, instance: any): void;
}
