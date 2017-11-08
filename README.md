# [derivable](https://github.com/ds300/derivablejs) devtools

## Usage

```js
import 'derivable-devtools'; // Should be placed before first derivable import
import { atom } from 'derivable';

const name = atom('David');

name.react(d => {
  console.log(d);
});
```

## TODO

- babel-plugin-derivable for extracting atoms and derivations names
- new layouts
- better value editor
- chrome extension with devtools integration
- better design
- tests
- Something more?
- Wrap long string values in graph
- Convert to scientific notation big numbers graph
- Prevent visualizing governor (internal) derivations

## License

MIT &copy; Bogdan Chadkin
