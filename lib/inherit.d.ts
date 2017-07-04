export interface Class extends Function {
    [key: string]: any;
}
export declare function inherit(child: Class, parent: Class): Class;
