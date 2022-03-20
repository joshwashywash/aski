// typescript will copy shebangs from source files but then github thinks its
// a javascript file

import prependFile from 'prepend-file';

await prependFile('dist/index.js', '#!/usr/bin/env node\n');
