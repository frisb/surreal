export interface ISerializer<TClass, TRecord> {
	serialize: (instance: TClass) => TRecord;
	deserialize: (source: TRecord, instance: TClass) => void;
}
