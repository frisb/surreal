export interface IFieldList {
  [src: string]: string;
}

export interface ILookup {
  keys: Array<string>;
  index: {
    [key: string]: number;
  };
}

export class FieldMap {
  public src: ILookup = {
    keys: [],
    index: {}
  };
  public dest: ILookup = {
    keys: [],
    index: {}
  };

  private count = 0;
  public fields: IFieldList = {};

  /*
   * Get an FieldMap class
   * @class
   * @param {array|object} initializer Array or object of alias mappings.
   * @property {string[]|object} initializer Array or object of alias mappings.
   * @property {string[]} srcKeys Source key names.
   * @property {string[]} destKeys Destination key names.
   * @property {object} srcIndex Dictionary mapping source key names to srcKeys array indexes.
   * @property {object} destIndex Dictionary mapping destination key names to destKeys array indexes.
   * @return {FieldMap} FieldMap.
   */
  constructor(fields: IFieldList | Array<string> | string) {
    this.merge(fields);
  }

  /*
   * Get source key name for destination key name
   * @method
   * @param {string} dest Destination key name.
   * @return {string} Source key name.
   */
  public getSrcKey(dest: string): string {
    return this.src.keys[this.dest.index[dest]];
  }

  /*
   * Get destination key name for source key name
   * @method
   * @param {string} src Source key name.
   * @return {string} Destination key name.
   */
  public getDestKey(src: string): string {
    return this.dest.keys[this.src.index[src]];
  }

  private add(s: string, d = s) {
    console.log('add', arguments);

    let {count, fields, src, dest} = this;

    if (!src.index[s]) {
      fields[s] = d;

      src.keys.push(s);
      dest.keys.push(d);

      src.index[s] = count;
      dest.index[d] = count;

      this.count++;
    }
  }

  /*
   * Initialize instance properties
   * @method
   * @param {string[]|object} fields Array or object of alias mappings.
   */
  public merge(fields: IFieldList | Array<string> | string) {
    if (fields) {
      if (typeof(fields) === 'string')
        fields = [fields];

      if (fields instanceof Array) {
        for (let i = 0, {length} = fields; i < length; i++) {
          this.add(fields[i]);
        }
      }
      else {
        for (let src in fields) {
          if (fields.hasOwnProperty(src)) {
            let dest = fields[src];
            this.add(src, dest);
          }
        }
      }
    }
  }
}
