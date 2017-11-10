import './index.js';
import { atom, derive } from "derivable";

const a = atom(10);
a.__devtools_label__ = "a";

const b = atom(20);
b.__devtools_label__ = "b";

const c = atom(30);
c.__devtools_label__ = 'c';

const tuple = derive(() => Array.from({ length: 20 }).map(() => [a.get(), b.get()]));
tuple.__devtools_label__ = "tuple";

const sum = derive(() => tuple.get()[0] + tuple.get()[1]);
sum.__devtools_label__ = "sum";

sum.react(() => {});
tuple.react(() => {});

a.or(b).react(() => {});
derive(() => ({ a: a.get(), b: b.get() })).react(() => {});

c.derive(d => d * 2).derive(d => [d, d]).react(() => {});
