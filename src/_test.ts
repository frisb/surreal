import { Surrealizable } from './surrealizable';

class X {
	public static get staticA(): string {
		return 'staticA';
	}

	public A(): string {
		return 'A';
	}
}

@Surrealizable({ see: 'C', dee: 'd' })
class Y extends X {
	public static get staticB(): string {
		return 'staticB';
	}

	public B(): string {
		return 'B';
	}
}

// class Z extends Y {
// 	public static get staticC(): string {
// 		return 'staticC';
// 	}

// 	public C(): string {
// 		return 'C';
// 	}
// }

let z: any = new Y();
console.log(z.staticA);
console.log(z.staticB);
console.log(z.staticC);

console.log(z.A());
console.log(z.B());
console.log(z.C());

console.log(z.see);
console.log(z.dee)

