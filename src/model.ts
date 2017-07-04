import { FieldMap, IFieldList } from './fieldmap';
import { buildProperties } from './buildproperties';
import { Class, inherit } from './inherit';

interface IDocument {
  [key: string]: any;
}

export interface IModel extends Function {
  readonly fieldMap: FieldMap;
  extend: Function;
}

export function create(fields: IFieldList | Array<string> | string, superConstructor?: { new(...args: Array<any>): any }): IModel {
  const fieldMap = new FieldMap(fields);

  /*
   * Get a Model class
   * @class
   * @property {object} fieldMap FieldMap instance.
   * @property {array} __d Current internal data values.
   * @property {array} __p Previous internal data values.
   * @return {Model} Model
   */
  return class Model {
    [src: string]: any;

    private __d: Array<any>;
    private __p: Array<any>;

    constructor(initializer: IFieldList, aliased?: boolean) {
      this.deserialize(initializer, aliased);
    }

    public static extend(child: Class, moreFields: IFieldList | Array<string> | string) {
      if (!child) {
        // clone

        child = create(fieldMap.fields);
      }
      else if (!child.prototype) {
        // fields only

        moreFields = child;
        fieldMap.merge(moreFields);
        child = create(fieldMap.fields);
      }
      else {
        // child is new Class

        fieldMap.merge(moreFields);
        child.fieldMap = fieldMap;
      }

      inherit(child, this);

      child.fieldMap = fieldMap;
      buildProperties(<IModel> child);

      return child;
    }

    public static get fieldMap(): FieldMap {
      return fieldMap;
    }

    public toString(): string {
      return this.serialize();
    }

    public serialize() {
      return JSON.stringify(this);
    }

    public deserialize(obj: IFieldList, aliased?: boolean) {
      if (typeof(obj) === 'string')
        obj = JSON.parse(obj);

      for (let dest in obj) {
        if (obj.hasOwnProperty(dest)) {
          let key = aliased ? fieldMap.getSrcKey(dest) : dest;
          this[key] = obj[dest];
        }
      }

      return this;
    }

    /*
     * Function to implement when JSON.stringify called on instance.
     * @method
     * @return {object} Object to stringify.
     */
    public toJSON() {
      return this.toDocument();
    }

    /*
     * Returns a simple document with aliased property names.
     * @method
     * @param {boolean} aliased Boolean switch to specify whether property name fields should be returned with document.
     * @return {object} Value if val undefined.
     */
    public toDocument(aliased?: boolean) {
      let doc: IDocument = {};

      if (this.__d) {
        for (let i = 0, { length } = this.__d; i < length; i++) {
          let val = this.__d[i];

          if (typeof(val) !== 'undefined') {
            let src = fieldMap.src.keys[i];

            let key = aliased ? fieldMap.getDestKey(src) : src;
            doc[key] = this[src];
          }
        }
      }

      return doc;
    }

    private init() {
      if (!this.__d) {
        this.__d = new Array(fieldMap.dest.keys.length);
        this.__p = new Array(fieldMap.dest.keys.length);
      }
    }

    /*
     * Get / Set internal value for property alias.
     * @virtual
     * @param {string} dest Destination property alias.
     * @param {object} val Optional value to set.
     * @return {object} Value if val undefined.
     */
    private data(dest: string, val?: any): any {
      this.init();

      let i = fieldMap.dest.index[dest];

      if (typeof(val) !== 'undefined') {
        this.__d[i] = val;
        return;
      }
      else if (typeof(dest) !== 'undefined') {
        return this.__d[i];
      }
      else {
        return this.__d;
      }
    }

    /*
     * Return previous internal value for property alias
     * @method
     * @param {string} dest Destination property alias.
     * @return {object} Value.
     */
    private prev(dest: string) {
      let i = fieldMap.dest.index[dest];
      return this.__p[i];
    }

    /*
     * Get value for property name.
     * @virtual
     * @param {string} src Source property name.
     * @return {object} Value.
     */
    private getValue(src: string): any {
      

      let dest = fieldMap.getDestKey(src);

      console.log('getValue src', src, dest, this.data(dest));

      let val = this.data(dest);

      if (typeof(dest) === 'undefined')
        throw new Error(`No value for key "${ src }"`);

      return this.data(dest);
    }

    /*
     * Set value for property name.
     * @virtual
     * @param {string} src Source property name.
     * @param {object} val Value to set.
     * @return {string} Property alias.
     */
    private setValue(src: string, val: any): any {
      let dest = fieldMap.getDestKey(src);
      let previousVal = this.data(dest);

      if (typeof(previousVal) !== 'undefined') {
        let i = fieldMap.dest.index[dest];
        this.__p[i] = previousVal;
      }

      if (val !== previousVal)
        this.data(dest, val);

      return dest;
    }
  }
}
